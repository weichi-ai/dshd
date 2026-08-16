// anim-verify.js — 验证欢迎页动画真实运行（读取计算样式 + 多次采样）
const fs = require('fs');
const path = require('path');

module.exports = function runVerify(win, port) {
  const outDir = process.env.DSDH_VERIFY;
  if (!outDir) return;
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  const dump = async (name, value) => {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, name), JSON.stringify(value, null, 2));
  };
  const SAMPLE_JS = `(() => {
    const cs = (sel) => { const el = document.querySelector(sel); if (!el) return null; const s = getComputedStyle(el); return { animationName: s.animationName, animationDuration: s.animationDuration, opacity: s.opacity, transform: s.transform.slice(0, 80) }; };
    const blue = document.querySelector('.dsw-phase-blue');
    const black = document.querySelector('.dsw-phase-black');
    const colorful = document.querySelector('.dsw-phase-colorful');
    return {
      stage: cs('.dsw-wc-stage'),
      whale: cs('.dsw-wc-whale'),
      svg: cs('.dsw-wc-whale svg'),
      blueOpacity: blue ? getComputedStyle(blue).opacity : null,
      blackOpacity: black ? getComputedStyle(black).opacity : null,
      colorfulOpacity: colorful ? getComputedStyle(colorful).opacity : null,
      animCount: document.getAnimations().length,
      hasWelcome: !!document.querySelector('[data-dsw-welcome]')
    };
  })()`;
  (async () => {
    for (let i = 0; i < 60; i++) {
      await delay(500);
      try {
        const has = await win.webContents.executeJavaScript(`!!document.querySelector('[data-dsw-welcome]')`);
        if (has) break;
      } catch (e) { /* page not ready */ }
    }
    const samples = [];
    for (const t of [0, 2500, 5000, 8000, 10500]) {
      if (t > 0) await delay(t - (samples.length ? 0 : 0));
      if (samples.length) await delay(samples.length === 1 ? 2500 : samples.length === 2 ? 2500 : samples.length === 3 ? 3000 : 2500);
      else await delay(0);
      samples.push({ t, ...(await win.webContents.executeJavaScript(SAMPLE_JS)) });
    }
    await dump('verify.json', samples);
    const img = await win.webContents.capturePage();
    fs.writeFileSync(path.join(outDir, 'shot.png'), img.toPNG());
    console.log('[verify] done');
    setTimeout(() => { require('electron').app.exit(0); }, 500);
  })();
};
