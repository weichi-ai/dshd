const { Resvg } = require('./renderer/node_modules/@resvg/resvg-js');
const { PNG } = require('./renderer/node_modules/pngjs');
const fs = require('fs');

function renderPng(svgFile, width) {
  const svg = fs.readFileSync(svgFile, 'utf8');
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render();
  return PNG.sync.read(r.asPng());
}

// individual renders
for (const [svgFile, pngFile, width] of [
  ['deepseek-whale-colorful.svg', 'deepseek-whale-colorful.png', 1200],
  ['deepseek-whale-icon.svg', 'deepseek-whale-icon.png', 1024],
  ['deepseek-whale-icon-white.svg', 'deepseek-whale-icon-white.png', 1024],
]) {
  const png = renderPng(svgFile, width);
  fs.writeFileSync(pngFile, PNG.sync.write(png));
  console.log('OK', pngFile, png.width, 'x', png.height);
}

// side-by-side comparison: official(blue) | colorful | icon
const official = renderPng('reference/favicon-api-docs.svg', 560);   // 560x412
const colorful = renderPng('deepseek-whale-colorful.svg', 560); // 560x412
const icon = renderPng('deepseek-whale-icon.svg', 412);    // 412x412
const pad = 36, capH = 54, cellH = 412 + capH + pad * 2;
const W = pad * 4 + 560 * 2 + 412;
const H = cellH + pad;
const out = new PNG({ width: W, height: H });
const bg = [246, 248, 252];
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = (y * W + x) * 4;
  out.data[i] = bg[0]; out.data[i + 1] = bg[1]; out.data[i + 2] = bg[2]; out.data[i + 3] = 255;
}
function place(src, dx, dy) {
  for (let y = 0; y < src.height; y++) for (let x = 0; x < src.width; x++) {
    const si = (y * src.width + x) * 4;
    const sa = src.data[si + 3];
    if (sa === 0) continue;
    const di = ((dy + y) * W + (dx + x)) * 4;
    const da = out.data[di + 3];
    const a = sa / 255, ia = 1 - a;
    for (let c = 0; c < 3; c++) out.data[di + c] = src.data[si + c] * a + out.data[di + c] * ia;
    out.data[di + 3] = 255;
  }
}
place(official, pad, pad + capH);
place(colorful, pad * 2 + 560, pad + capH);
place(icon, pad * 3 + 1120, pad + capH + (412 - 412) * 0);
fs.writeFileSync('comparison.png', PNG.sync.write(out));
console.log('OK comparison.png', W, 'x', H);
