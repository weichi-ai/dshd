// patch-frontend.js — 鲸彩世界DSHD 前端品牌补丁（可复用）
// 对 dsh-web-frontend 的 dist 执行：
//   1) favicon.svg -> 彩色鲸鱼（透明底）
//   2) index.html <title> -> 鲸彩世界DSHD
//   3) manifest.webmanifest name/short_name -> 鲸彩世界DSHD / DSHD
//   4) 主 bundle 内鲸鱼 path 填充 -> 彩色渐变（shape 不变）
// 幂等：先备份 *.bak-dsdh（仅一次），重复执行直接覆盖。
// 用法: node patch-frontend.js [dist路径]   （默认开发机 dist）
const fs = require('fs');
const path = require('path');

const DEFAULT_DIST = 'D:/Users/Administrator/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-web-frontend/dist';
const dist = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_DIST;
const ws = __dirname;

if (!fs.existsSync(dist)) { console.error('dist not found: ' + dist); process.exit(1); }

function backup(p) {
  const bak = p + '.bak-dsdh';
  if (!fs.existsSync(bak)) { fs.copyFileSync(p, bak); console.log('backup:', bak); }
}
/** Restore the pristine copy so re-runs always patch from the original. */
function restore(p) {
  const bak = p + '.bak-dsdh';
  if (fs.existsSync(bak)) { fs.copyFileSync(bak, p); }
}
function replaceOnce(hay, needle, replacement, label) {
  const count = hay.split(needle).length - 1;
  if (count !== 1) throw new Error(`${label}: expected exactly 1 occurrence, found ${count}`);
  return hay.replace(needle, replacement);
}

// ---- 1) favicon ----
const favPath = path.join(dist, 'favicon.svg');
if (fs.existsSync(favPath)) {
  backup(favPath);
  restore(favPath);
  fs.copyFileSync(path.join(ws, 'deepseek-whale-colorful.svg'), favPath);
  console.log('favicon.svg -> colorful whale');
}

// ---- 2) index.html title ----
const htmlPath = path.join(dist, 'index.html');
if (fs.existsSync(htmlPath)) {
  backup(htmlPath);
  restore(htmlPath);
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace(/<title>.*?<\/title>/, '<title>鲸彩世界DSHD</title>');
  fs.writeFileSync(htmlPath, html);
  console.log('index.html title -> 鲸彩世界DSHD');
}

// ---- 3) manifest ----
const mfPath = path.join(dist, 'manifest.webmanifest');
if (fs.existsSync(mfPath)) {
  backup(mfPath);
  restore(mfPath);
  const mf = JSON.parse(fs.readFileSync(mfPath, 'utf8'));
  mf.name = '鲸彩世界DSHD';
  mf.short_name = 'DSHD';
  fs.writeFileSync(mfPath, JSON.stringify(mf, null, 2));
  console.log('manifest -> 鲸彩世界DSHD / DSHD');
}

// ---- 4) bundle whale gradient ----
const assets = fs.readdirSync(path.join(dist, 'assets')).filter(f => /^index-.*\.js$/.test(f));
if (assets.length === 0) { console.error('no index-*.js bundle found'); process.exit(1); }
const jsPath = path.join(dist, 'assets', assets[0]);
backup(jsPath);
restore(jsPath);
let js = fs.readFileSync(jsPath, 'utf8');
const origLen = js.length;

const stops = [
  ['0%', '#22D3EE'], ['28%', '#3B82F6'], ['52%', '#8B5CF6'], ['74%', '#EC4899'], ['100%', '#FB7185'],
].map(([o, c]) => `f.jsx("stop",{offset:"${o}",stopColor:"${c}"})`).join(',');
const grad = (id, x1, y1, x2, y2) =>
  `f.jsx("linearGradient",{id:"${id}",gradientUnits:"userSpaceOnUse",x1:"${x1}",y1:"${y1}",x2:"${x2}",y2:"${y2}",children:[${stops}]})`;

// (a) standalone whale icon (gf): inject defs + gradient before its path
js = replaceOnce(js,
  'viewBox:"0 0 23.16 17.04",fill:"none","aria-hidden":"true",children:f.jsx("path",{d:"M22.9168',
  'viewBox:"0 0 23.16 17.04",fill:"none","aria-hidden":"true",children:[f.jsxs("defs",{children:[' + grad('dshWhaleGrad', '1', '17', '22', '2') + ']}),f.jsx("path",{d:"M22.9168',
  'gf defs injection');

// (b) standalone whale icon path fill
{
  const p1 = js.indexOf('M22.9168');
  if (p1 === -1) throw new Error('M22.9168 not found');
  const f1 = js.indexOf('fill:"currentColor"', p1);
  if (f1 === -1) throw new Error('gf fill not found');
  js = js.slice(0, f1) + 'fill:"url(#dshWhaleGrad)"' + js.slice(f1 + 'fill:"currentColor"'.length);
}

// (b2) close the injected children array for the standalone icon:
// children:[<defs>, f.jsx("path",{...})] needs ")" (path call) then "]" (array) then "})".
js = replaceOnce(js,
  'fill:"url(#dshWhaleGrad)"})})',
  'fill:"url(#dshWhaleGrad)"})]})',
  'gf children array close');

// (c) wordmark (vf) defs: add gradient before the whale clipPath
js = replaceOnce(js,
  'f.jsxs("defs",{children:[f.jsx("clipPath",{id:"dsh-wordmark-whale-clip"',
  'f.jsxs("defs",{children:[' + grad('dshWhaleGrad2', '1', '19', '23', '4') + ',f.jsx("clipPath",{id:"dsh-wordmark-whale-clip"',
  'vf defs injection');

// (d) wordmark whale path fill
{
  const p2 = js.indexOf('M23.0584');
  if (p2 === -1) throw new Error('M23.0584 not found');
  const f2 = js.indexOf('fill:"currentColor"', p2);
  if (f2 === -1) throw new Error('vf fill not found');
  js = js.slice(0, f2) + 'fill:"url(#dshWhaleGrad2)"' + js.slice(f2 + 'fill:"currentColor"'.length);
}

console.log('bundle patched:', origLen, '->', js.length, 'bytes');
fs.writeFileSync(jsPath, js);

// ---- self-check ----
const patched = fs.readFileSync(jsPath, 'utf8');
// syntax check: parse as ESM without executing
{
  const os = require('os');
  const cp = require('child_process');
  const tmp = path.join(os.tmpdir(), 'dshd-bundle-check-' + Date.now() + '.mjs');
  fs.writeFileSync(tmp, patched);
  try {
    cp.execFileSync(process.execPath, ['--check', tmp], { stdio: 'ignore' });
    console.log('PASS bundle syntax (node --check)');
  } catch (e) {
    console.error('FAIL bundle syntax');
    process.exit(1);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}
const checks = [
  ['title patched', fs.readFileSync(htmlPath, 'utf8').includes('鲸彩世界DSHD')],
  ['dshWhaleGrad defined', patched.includes('id:"dshWhaleGrad"')],
  ['dshWhaleGrad2 defined', patched.includes('id:"dshWhaleGrad2"')],
  ['gf whale uses gradient', patched.includes('M22.9168') && patched.includes('fill:"url(#dshWhaleGrad)"')],
  ['vf whale uses gradient', patched.includes('M23.0584') && patched.includes('fill:"url(#dshWhaleGrad2)"')],
  ['stops present', patched.split('stopColor:"#8B5CF6"').length - 1 >= 2],
];
let ok = true;
for (const [label, pass] of checks) { console.log((pass ? 'PASS' : 'FAIL') + ' ' + label); if (!pass) ok = false; }
process.exit(ok ? 0 : 1);
