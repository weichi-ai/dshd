// Generate Windows .ico + macOS .icns from the white-bg colorful whale icon
const { Resvg } = require('./renderer/node_modules/@resvg/resvg-js');
const { PNG } = require('./renderer/node_modules/pngjs');
const fs = require('fs');

const svg = fs.readFileSync('deepseek-whale-icon-white.svg', 'utf8');

function renderPng(size) {
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render();
  return PNG.sync.read(r.asPng());
}

// ---------- ICO ----------
// sizes: 16, 24, 32, 48, 64, 128, 256
const icoSizes = [16, 24, 32, 48, 64, 128, 256];
const icoImages = icoSizes.map(s => ({ size: s, png: renderPng(s) }));

function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);      // reserved
  header.writeUInt16LE(1, 2);      // type: icon
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  const payloads = [];
  let offset = 6 + images.length * 16;
  for (const { size, png } of images) {
    const buf = PNG.sync.write(png);
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    payloads.push(buf);
    offset += buf.length;
  }
  return Buffer.concat([header, ...entries, ...payloads]);
}

const ico = buildIco(icoImages);
fs.writeFileSync('deepseek-whale-icon-white.ico', ico);
console.log('OK deepseek-whale-icon-white.ico', ico.length, 'bytes, sizes:', icoSizes.join(','));

// ---------- ICNS ----------
// modern macOS icon types (PNG-encoded)
const icnsTypes = [
  ['icp4', 16], ['icp5', 32], ['icp6', 64],
  ['ic07', 128], ['ic08', 256], ['ic09', 512], ['ic10', 1024],
];
const icnsImages = icnsTypes.map(([type, size]) => {
  const png = renderPng(size);
  return { type, size, buf: PNG.sync.write(png) };
});

function buildIcns(images) {
  const header = Buffer.alloc(8);
  header.write('icns', 0, 4, 'ascii');
  const entries = [];
  let dataLen = 8;
  for (const { type, buf } of images) {
    const entry = Buffer.alloc(8);
    entry.write(type, 0, 4, 'ascii');
    entry.writeUInt32BE(8 + buf.length, 4);
    entries.push(entry, buf);
    dataLen += 8 + buf.length;
  }
  header.writeUInt32BE(dataLen, 4);
  return Buffer.concat([header, ...entries]);
}

const icns = buildIcns(icnsImages);
fs.writeFileSync('deepseek-whale-icon-white.icns', icns);
console.log('OK deepseek-whale-icon-white.icns', icns.length, 'bytes, types:', icnsTypes.map(t => t[0]).join(','));

// ---------- in-app logo (transparent colorful whale), common sizes ----------
const logoSizes = [128, 256, 512, 1024];
for (const s of logoSizes) {
  const r = new Resvg(fs.readFileSync('deepseek-whale-colorful.svg', 'utf8'), { fitTo: { mode: 'width', value: s } }).render();
  fs.writeFileSync(`deepseek-whale-colorful-${s}.png`, r.asPng());
  console.log('OK deepseek-whale-colorful-' + s + '.png');
}
