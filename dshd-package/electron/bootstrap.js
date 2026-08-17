// 鲸彩世界DSHD — 首启插件预置（幂等、崩溃安全）
// 1) 全新用户：profiles\node_modules 为空时，从应用内置的完整依赖树（vendor\app\node_modules）
//    整体播种，保证 host 插件能解析 @deepseek-ai/* 等依赖。
// 2) 插件（皮肤包/欢迎页）按版本同步：先复制到临时目录再原子替换，任何一步失败都不破坏现有安装。
const fs = require('fs');
const path = require('path');

const PATCH = `# 鲸彩世界DSHD 插件层（应用首启自动维护，勿手改）
- insert:
    - id: skin-pack
      name: dsh-skin-pack
    - id: dsh-welcome
      name: dsh-welcome
`;

const PROFILE_PKG = {
  name: 'dsh-profile-web',
  private: true,
  dependencies: {},
  dsh: {
    profile: {
      bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app']
    }
  }
};

const PLUGINS = ['dsh-skin-pack', 'dsh-welcome'];

function packagePaths(nodeModules) {
  const paths = [];
  if (!fs.existsSync(nodeModules)) return paths;
  for (const entry of fs.readdirSync(nodeModules, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    if (entry.name.startsWith('@') && entry.isDirectory()) {
      const scope = path.join(nodeModules, entry.name);
      for (const child of fs.readdirSync(scope, { withFileTypes: true })) {
        if (child.isDirectory() || child.isSymbolicLink()) paths.push(path.join(entry.name, child.name));
      }
    } else if (entry.isDirectory() || entry.isSymbolicLink()) {
      paths.push(entry.name);
    }
  }
  return paths;
}

function samePath(a, b) {
  const left = path.resolve(a);
  const right = path.resolve(b);
  return process.platform === 'win32' ? left.toLowerCase() === right.toLowerCase() : left === right;
}

// Old desktop builds left profile fallback links pointing into a previous
// installation directory, and occasionally left a real package directory.
// Repair every application-owned top-level package before dsh starts. Real
// directories are moved to a recoverable backup; user-only plugins are not in
// the bundled dependency list and are therefore left untouched.
function repairFallbackLinks(dshHome, appPath) {
  const sourceRoot = path.join(appPath, 'vendor', 'app', 'node_modules');
  const profileRoot = path.join(dshHome, 'profiles', 'node_modules');
  let backupRoot = null;
  let repaired = 0;
  let backedUp = 0;

  for (const relative of packagePaths(sourceRoot)) {
    const source = path.join(sourceRoot, relative);
    const destination = path.join(profileRoot, relative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });

    let stat = null;
    try { stat = fs.lstatSync(destination); } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    if (stat && stat.isSymbolicLink()) {
      let currentTarget = null;
      try { currentTarget = fs.readlinkSync(destination); } catch (err) { /* recreate below */ }
      if (currentTarget && samePath(path.resolve(path.dirname(destination), currentTarget), source)) continue;
      fs.unlinkSync(destination);
    } else if (stat) {
      if (!backupRoot) {
        const stamp = new Date().toISOString().replace(/[:.]/g, '-');
        backupRoot = path.join(dshHome, 'profiles', `node_modules-legacy-${stamp}`);
      }
      let backup = path.join(backupRoot, relative);
      let suffix = 1;
      while (fs.existsSync(backup)) backup = path.join(backupRoot, relative + '.' + suffix++);
      fs.mkdirSync(path.dirname(backup), { recursive: true });
      fs.renameSync(destination, backup);
      backedUp++;
    }

    fs.symlinkSync(source, destination, process.platform === 'win32' ? 'junction' : 'dir');
    repaired++;
  }
  if (repaired || backedUp) {
    console.log(`[bootstrap] fallback repaired: ${repaired} links, ${backedUp} legacy entries backed up`);
    if (backupRoot) console.log('[bootstrap] legacy backup: ' + backupRoot);
  }
}

function ensure(dshHome, appPath) {
  const profiles = path.join(dshHome, 'profiles');
  fs.mkdirSync(path.join(profiles, 'web'), { recursive: true });
  fs.mkdirSync(path.join(profiles, 'node_modules'), { recursive: true });

  const pkgPath = path.join(profiles, 'web', 'package.json');
  fs.writeFileSync(pkgPath, JSON.stringify(PROFILE_PKG, null, 2) + '\n');
  fs.writeFileSync(path.join(profiles, 'web', 'cordis.patch.yml'), PATCH);

  repairFallbackLinks(dshHome, appPath);

  // 插件同步（版本不同才替换；临时目录 + 原子 rename）
  const profileNodeModules = path.join(profiles, 'node_modules');
  for (const name of PLUGINS) {
    const src = path.join(appPath, 'vendor', 'plugins', name);
    const dst = path.join(profileNodeModules, name);
    if (!fs.existsSync(src)) continue;
    let seedVer = null;
    let dstVer = null;
    try {
      seedVer = JSON.parse(fs.readFileSync(path.join(src, 'package.json'), 'utf8')).version;
    } catch (e) { /* fallthrough */ }
    try {
      dstVer = JSON.parse(fs.readFileSync(path.join(dst, 'package.json'), 'utf8')).version;
    } catch (e) { /* fallthrough */ }
    if (seedVer === dstVer && fs.existsSync(path.join(dst, 'lib'))) {
      continue; // 已就位
    }
    const tmp = dst + '.tmp-' + process.pid;
    fs.rmSync(tmp, { recursive: true, force: true });
    fs.cpSync(src, tmp, { recursive: true });
    fs.rmSync(dst, { recursive: true, force: true });
    fs.renameSync(tmp, dst);
    console.log('[bootstrap] plugin synced: ' + name + '@' + seedVer);
  }
  console.log('[bootstrap] plugins ensured in ' + dshHome);
}

module.exports = { ensure };
