const { Resvg } = require('./renderer/node_modules/@resvg/resvg-js');
const fs = require('fs');

function render(svgFile, width) {
  const svg = fs.readFileSync(svgFile, 'utf8');
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width } });
  const r = resvg.render();
  return { w: r.width, h: r.height, px: r.pixels };
}

// 1) alpha-mask comparison at threshold 128
const a = render('favicon-api-docs.svg', 600);
const b = render('deepseek-whale-colorful.svg', 600);
let diff = 0, total = 0;
for (let i = 3; i < a.px.length; i += 4) {
  total++;
  if ((a.px[i] >= 128) !== (b.px[i] >= 128)) diff++;
}
console.log(`alpha-mask diff (t=128): ${diff} / ${total}  (${(100 * diff / total).toFixed(4)}%)`);

// 2) gradient samples using actual whale bbox in colorful render (bright pixels)
const bw = 1200;
const br = render('deepseek-whale-colorful.svg', bw);
const px = br.px;
let minX = 1e9, minY = 1e9, maxX = -1, maxY = -1;
for (let y = 0; y < br.h; y++) {
  for (let x = 0; x < bw; x++) {
    const i = (y * bw + x) * 4;
    if (px[i + 3] >= 128 && (px[i] + px[i + 1] + px[i + 2]) > 240) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
}
console.log(`whale bbox in colorful render: x[${minX}..${maxX}] y[${minY}..${maxY}]`);
function sample(x, y) {
  const i = (y * bw + x) * 4;
  return [px[i], px[i + 1], px[i + 2], px[i + 3]];
}
const W = maxX - minX, H = maxY - minY;
console.log('  head (bbox bottom-left):', sample(minX + 0.10 * W, maxY - 0.06 * H));
console.log('  belly (bbox bottom-center):', sample(minX + 0.30 * W, maxY - 0.25 * H));
console.log('  body (bbox mid):', sample(minX + 0.45 * W, minY + 0.45 * H));
console.log('  back (bbox upper-mid):', sample(minX + 0.62 * W, minY + 0.18 * H));
console.log('  tail (bbox top-right):', sample(maxX - 0.05 * W, minY + 0.05 * H));

// 3) icon version with brightness-based whale detection
const ic = render('deepseek-whale-icon.svg', 1024);
minX = 1e9; minY = 1e9; maxX = -1; maxY = -1; let whalePx = 0;
for (let y = 0; y < ic.h; y++) {
  for (let x = 0; x < ic.w; x++) {
    const i = (y * ic.w + x) * 4;
    if (ic.px[i + 3] >= 128 && (ic.px[i] + ic.px[i + 1] + ic.px[i + 2]) > 240) {
      whalePx++;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
}
console.log(`\nicon whale bbox: x[${minX}..${maxX}] y[${minY}..${maxY}]  (${maxX - minX}x${maxY - minY})  whale px=${whalePx}`);
console.log('icon canvas: 1024x1024; expected whale ~ 800x590 centered (x~113..910, y~218..805)');
