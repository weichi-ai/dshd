// Patch the DSH web-frontend dist bundle: recolor the in-app whale logos with a colorful gradient.
// Shape is NOT changed — only the fill of the whale paths + injected gradient defs.
const fs = require('fs');

const dist = 'D:/Users/Administrator/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-web-frontend/dist';
const jsPath = dist + '/assets/index-Dqw48FrP.js';
const favPath = dist + '/favicon.svg';
const ws = 'D:/DSHProjects/whale-logo';

// ---- backup ----
for (const p of [jsPath, favPath]) {
  const bak = p + '.bak-colorful';
  if (!fs.existsSync(bak)) fs.copyFileSync(p, bak);
  console.log('backup:', bak);
}

// ---- 1) replace favicon.svg with the colorful whale (transparent bg) ----
fs.copyFileSync(ws + '/deepseek-whale-colorful.svg', favPath);
console.log('favicon.svg replaced with colorful whale');

// ---- 2) patch bundle ----
let js = fs.readFileSync(jsPath, 'utf8');
const origLen = js.length;

function replaceOnce(hay, needle, replacement, label) {
  const count = hay.split(needle).length - 1;
  if (count !== 1) throw new Error(`${label}: expected exactly 1 occurrence, found ${count}`);
  return hay.replace(needle, replacement);
}

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
console.log('written', jsPath);

// ---- 3) self-check: patched content present, no leftover uncolored whale fills ----
const patched = fs.readFileSync(jsPath, 'utf8');
const checks = [
  ['dshWhaleGrad defined', patched.includes('id:"dshWhaleGrad"')],
  ['dshWhaleGrad2 defined', patched.includes('id:"dshWhaleGrad2"')],
  ['gf whale uses gradient', patched.includes('M22.9168') && patched.includes('fill:"url(#dshWhaleGrad)"')],
  ['vf whale uses gradient', patched.includes('M23.0584') && patched.includes('fill:"url(#dshWhaleGrad2)"')],
  ['stops present', patched.split('stopColor:"#8B5CF6"').length - 1 >= 2],
];
let ok = true;
for (const [label, pass] of checks) { console.log((pass ? 'PASS' : 'FAIL') + ' ' + label); if (!pass) ok = false; }
process.exit(ok ? 0 : 1);
