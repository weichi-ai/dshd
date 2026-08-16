// 鲸彩世界DSHD — 自动化验收模式（仅当设置了 DSDH_CAPTURE 时启用）
// 收集页面 console 消息、检查插件注入状态、轮询欢迎页出现，截图并写 state JSON。
const fs = require('fs');
const path = require('path');

module.exports = function runCapture(win, port) {
  const outDir = process.env.DSDH_CAPTURE;
  if (!outDir) return;
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  fs.mkdirSync(outDir, { recursive: true });
  const consoleLog = [];
  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
    consoleLog.push(`[${level}] ${message} (${sourceId}:${line})`);
    fs.writeFileSync(path.join(outDir, 'console.log'), consoleLog.join('\n'));
  });
  win.webContents.on('render-process-gone', (event, details) => {
    fs.writeFileSync(path.join(outDir, 'renderer-gone.json'), JSON.stringify(details));
  });

  const shot = async (name) => {
    try {
      const img = await win.webContents.capturePage();
      fs.writeFileSync(path.join(outDir, name), img.toPNG());
    } catch (e) {
      fs.writeFileSync(path.join(outDir, name + '.err'), String(e));
    }
  };
  const dump = async (name, value) => {
    fs.writeFileSync(path.join(outDir, name), JSON.stringify(value, null, 2));
  };

  (async () => {
    // 轮询欢迎页（最多 30s）；同时记录插件 CSS 是否注入
    let state1 = null;
    for (let i = 0; i < 60; i++) {
      await delay(500);
      try {
        state1 = await win.webContents.executeJavaScript(`(() => ({
          title: document.title,
          url: location.href,
          ready: document.readyState,
          hasWelcome: !!document.querySelector('[data-dsw-welcome]'),
          welcomeText: document.querySelector('.dsw-wc-copy') ? document.querySelector('.dsw-wc-copy').textContent : null,
          ctaText: document.querySelector('.dsw-wc-btn') ? document.querySelector('.dsw-wc-btn').textContent : null,
          welcomeCssInjected: !!document.querySelector('style[data-plugin-css="dsh-welcome/welcome.css"]'),
          skinCssInjected: !!document.querySelector('style[data-plugin-css="dsh-skin-pack/skins.css"]'),
          dswDebug: window.__dswDebug || null
        }))()`);
        if (state1.hasWelcome) break;
      } catch (e) {
        await dump('probe-error.json', String(e));
      }
    }
    await dump('state1.json', state1);
    await shot('shot1.png');

    if (process.env.DSDH_TEST_CLICK === '1' && state1 && state1.hasWelcome) {
      await win.webContents.executeJavaScript(`document.querySelector('[data-dsw-welcome-cta]').click()`);
      await delay(1500);
      const state2 = await win.webContents.executeJavaScript(`(() => ({
        hasWelcome: !!document.querySelector('[data-dsw-welcome]'),
        welcomeGone: document.querySelector('[data-dsw-welcome]') === null
      }))()`);
      await dump('state2.json', state2);
      await shot('shot2.png');
    }

    if (process.env.DSDH_TEST_SETTINGS === '1') {
      // 尝试打开设置页（侧边栏「设置」入口），然后检查欢迎页行与皮肤包行
      const nav = await win.webContents.executeJavaScript(`(() => {
        const els = [...document.querySelectorAll('button, [role="button"], a, [tabindex]')];
        const hit = els.find((el) => el.offsetParent !== null && el.textContent.trim() === '设置');
        if (hit) { hit.click(); return 'clicked'; }
        return 'not-found';
      })()`);
      await dump('settings-nav.json', { nav });
      await delay(3000);
      const state3 = await win.webContents.executeJavaScript(`(() => ({
        nav: location.hash,
        welcomeRow: !!document.querySelector('.dsw-row'),
        welcomeRowTitle: document.querySelector('.dsw-row-title') ? document.querySelector('.dsw-row-title').textContent : null,
        welcomeRowBtn: document.querySelector('.dsw-row-btn') ? document.querySelector('.dsw-row-btn').textContent : null,
        skinRow: !!document.querySelector('.spk-group'),
        skinCubes: document.querySelectorAll('.spk-cube').length
      }))()`);
      await dump('state3-settings.json', state3);
      await shot('shot3-settings.png');
    }
    fs.writeFileSync(path.join(outDir, 'console.log'), consoleLog.join('\n'));
    console.log('[capture] done');
    setTimeout(() => {
      const { app } = require('electron');
      app.exit(0);
    }, 500);
  })();
};
