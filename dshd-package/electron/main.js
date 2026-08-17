// 鲸彩世界DSHD — Electron 主进程
// 启动内置 Node + dsh（DeepSeek Harness），在本地端口拉起服务，
// 用 BrowserWindow 加载 UI；关窗即回收子进程。
const { app, BrowserWindow, dialog } = require('electron');
const { spawn } = require('child_process');
const net = require('net');
const path = require('path');
const os = require('os');

const APP_TITLE = '鲸彩世界DSHD';
const BOOTSTRAP = require('./bootstrap');

// 调试日志（设置 DSDH_DEBUG_FILE 时写入文件，便于在沙箱/无控制台环境下排查）
let debugLog = null;
if (process.env.DSDH_DEBUG_FILE) {
  try {
    const fs = require('fs');
    fs.mkdirSync(path.dirname(process.env.DSDH_DEBUG_FILE), { recursive: true });
    debugLog = fs.createWriteStream(process.env.DSDH_DEBUG_FILE, { flags: 'a' });
  } catch (err) {
    console.error('[main] debug log disabled:', err);
  }
}
const dbg = (msg) => {
  const line = `[main ${new Date().toISOString()}] ${msg}`;
  if (debugLog) debugLog.write(line + '\n');
  else console.log(line);
};

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  main();
}

let mainWindow = null;
let dshProc = null;
let port = 0;

function main() {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  app.on('window-all-closed', () => app.quit());
  app.whenReady().then(async () => {
    const ok = await startDsh();
    if (!ok) return;
    createWindow();
    if (process.env.DSDH_CAPTURE) require('./capture')(mainWindow, port);
    if (process.env.DSDH_VERIFY) require('./anim-verify')(mainWindow, port);
  });
}

function findFreePort(start) {
  return new Promise((resolve) => {
    const tryPort = (p) => {
      if (p > start + 80) return resolve(0);
      const s = net.createConnection({ host: '127.0.0.1', port: p });
      s.on('connect', () => { s.destroy(); tryPort(p + 1); });
      s.on('error', () => { s.destroy(); resolve(p); });
    };
    tryPort(start);
  });
}

function waitPort(p, timeoutMs) {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      const s = net.createConnection({ host: '127.0.0.1', port: p });
      s.on('connect', () => { s.destroy(); resolve(true); });
      s.on('error', () => {
        s.destroy();
        if (Date.now() - start > timeoutMs) return resolve(false);
        setTimeout(tick, 300);
      });
    };
    tick();
  });
}

async function startDsh() {
  const appPath = __dirname;
  const nodeExe = path.join(appPath, 'vendor', 'node', process.platform === 'win32' ? 'node.exe' : path.join('bin', 'node'));
  const binJs = path.join(appPath, 'vendor', 'app', 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js');
  const dshHome = process.env.DSH_HOME || path.join(os.homedir(), '.dsh');
  process.env.DSH_HOME = dshHome;

  if (!require('fs').existsSync(nodeExe) || !require('fs').existsSync(binJs)) {
    dialog.showErrorBox(APP_TITLE, '程序文件不完整，请重新安装。');
    app.exit(1);
    return false;
  }

  // 首启插件预置（幂等）：皮肤包 + 欢迎页装入用户 profile
  try {
    BOOTSTRAP.ensure(dshHome, appPath);
  } catch (err) {
    console.error('[bootstrap] failed:', err);
  }

  port = await findFreePort(3080);
  if (!port) {
    dialog.showErrorBox(APP_TITLE, '端口 3080-3160 均被占用，请关闭占用程序后重试。');
    app.exit(1);
    return false;
  }
  dbg('port ' + port + ' chosen; spawning dsh');

  dshProc = spawn(nodeExe, [binJs, 'web', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: os.homedir(),
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true
  });
  dbg('spawned pid ' + dshProc.pid);
  // dsh 子进程日志：写文件（userData\dsh.log），不依赖管道
  try {
    const fs = require('fs');
    const logPath = path.join(app.getPath('userData'), 'dsh.log');
    const fd = fs.openSync(logPath, 'a');
    dshProc.stdout.on('data', (d) => fs.writeSync(fd, d));
    dshProc.stderr.on('data', (d) => fs.writeSync(fd, d));
    dshProc.on('exit', () => { try { fs.closeSync(fd); } catch (e) {} });
    dbg('dsh log: ' + logPath);
  } catch (e) { dbg('log setup failed: ' + e.message); }
  dshProc.on('error', (err) => dbg('dsh spawn error: ' + err.message));
  dshProc.on('exit', (code, signal) => {
    dbg('dsh exited code=' + code + ' signal=' + signal);
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.destroy();
    app.exit(typeof code === 'number' ? code : 0);
  });

  const up = await waitPort(port, 90000);
  if (!up) {
    dialog.showErrorBox(APP_TITLE, '服务启动超时，请重试。');
    stopDsh();
    app.exit(1);
    return false;
  }
  console.log('[dsh] ready at http://127.0.0.1:' + port);
  return true;
}

function createWindow() {
  const icon = path.join(__dirname, 'assets', process.platform === 'win32' ? 'app.ico' : 'app.icns');
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 600,
    title: APP_TITLE,
    icon,
    backgroundColor: '#0d2350',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  mainWindow.loadURL('http://127.0.0.1:' + port);
  mainWindow.on('close', () => stopDsh());
  mainWindow.on('closed', () => { mainWindow = null; });
}

function stopDsh() {
  if (dshProc && !dshProc.killed) {
    try { dshProc.kill(); } catch (e) { /* already gone */ }
  }
}
