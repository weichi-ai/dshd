// fix-pe-size.js — 修正 PE 的 SizeOfImage（覆盖新加的 section）并清零校验和
const fs = require('fs');
const exePath = process.argv[2];
if (!exePath) { console.error('usage: node fix-pe-size.js <exe>'); process.exit(1); }
const exe = fs.readFileSync(exePath);
const peOff = exe.readUInt32LE(0x3c);
const magic = exe.readUInt16LE(peOff + 24);
const is64 = magic === 0x20b;
const opt = peOff + 24;
// SizeOfImage 位置：PE32+ 在 opt+56；PE32 在 opt+56
const sizeOfImageOff = opt + 56;
const sizeOfHeadersOff = opt + 60;
const checksumOff = opt + 64;
const numSections = exe.readUInt16LE(peOff + 6);
const optSize = exe.readUInt16LE(peOff + 20);
const secOff = peOff + 24 + optSize;
const sections = [];
for (let i = 0; i < numSections; i++) {
  const s = secOff + i * 40;
  sections.push({ vaddr: exe.readUInt32LE(s + 12), vsize: exe.readUInt32LE(s + 8), rawSize: exe.readUInt32LE(s + 16) });
}
const last = sections[sections.length - 1];
const imageEnd = last.vaddr + Math.max(last.vsize, last.rawSize);
const align = exe.readUInt32LE(opt + 32); // SectionAlignment
const newSizeOfImage = (Math.ceil(imageEnd / align) * align) >>> 0;
const oldSizeOfImage = exe.readUInt32LE(sizeOfImageOff);
console.log('old SizeOfImage', oldSizeOfImage, '-> new', newSizeOfImage);
exe.writeUInt32LE(newSizeOfImage, sizeOfImageOff);
const oldChecksum = exe.readUInt32LE(checksumOff);
if (oldChecksum !== 0) { exe.writeUInt32LE(0, checksumOff); console.log('checksum', oldChecksum, '-> 0'); }
fs.writeFileSync(exePath, exe);
console.log('written', exePath);
