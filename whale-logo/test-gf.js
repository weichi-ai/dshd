// Visual test: replicate the harness gf component (whale + gradient) to validate gradient coords
const fs = require('fs');
const { Resvg } = require('./renderer/node_modules/@resvg/resvg-js');

const js = fs.readFileSync('D:/Users/Administrator/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-web-frontend/dist/assets/index-Dqw48FrP-colorful.js', 'utf8');
// extract the gf whale path d (between M22.9168 and the fill)
const p = js.indexOf('M22.9168');
const dStart = js.lastIndexOf('d:"', p) + 3;
const dEnd = js.indexOf('"', dStart);
const whaleD = js.slice(dStart, dEnd);
console.log('whale path len:', whaleD.length);

const testSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="464" height="341" viewBox="0 0 23.16 17.04">
  <defs>
    <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="1" y1="17" x2="22" y2="2">
      <stop offset="0%" stop-color="#22D3EE"/>
      <stop offset="28%" stop-color="#3B82F6"/>
      <stop offset="52%" stop-color="#8B5CF6"/>
      <stop offset="74%" stop-color="#EC4899"/>
      <stop offset="100%" stop-color="#FB7185"/>
    </linearGradient>
  </defs>
  <path d="${whaleD}" fill="url(#g)"/>
</svg>`;
fs.writeFileSync('test-gf.svg', testSvg);

const r = new Resvg(testSvg, { fitTo: { mode: 'width', value: 464 } }).render();
fs.writeFileSync('test-gf.png', r.asPng());
const w = r.width, h = r.height, px = r.pixels;
function at(x, y) { const i = (y * w + x) * 4; return [px[i], px[i + 1], px[i + 2], px[i + 3]]; }
console.log('size:', w, 'x', h);
// whale bbox of opaque pixels
let minX = 1e9, minY = 1e9, maxX = -1, maxY = -1;
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  if (px[(y * w + x) * 4 + 3] >= 128) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
}
console.log('bbox:', minX, minY, '-', maxX, maxY);
console.log('head sample (bbox bottom-left):', at(minX + (maxX - minX) * 0.08, maxY - 8));
console.log('body sample:', at(minX + (maxX - minX) * 0.45, minY + (maxY - minY) * 0.55));
console.log('tail sample (bbox top-right):', at(maxX - 4, minY + 6));
