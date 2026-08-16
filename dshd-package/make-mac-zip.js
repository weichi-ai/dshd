// make-mac-zip.js — 在 Windows 上生成带 Unix 权限的 macOS zip（纯 Node，无依赖）
// 用法: node make-mac-zip.js <源目录> <输出zip>
// 规则: 目录 0755；可执行文件（.app/Contents/MacOS 下二进制、*.command、*.sh）0755；其余 0644。
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const [srcDir, outZip] = process.argv.slice(2);
if (!srcDir || !outZip) { console.error('usage: node make-mac-zip.js <srcDir> <out.zip>'); process.exit(1); }

const EXEC_NAMES = new Set(['DSHD', '鲸彩世界DSHD', 'node', 'npm', 'npx', 'corepack']);
// Node Buffer has no 64-bit helpers; values here are safe integers (< 2^53).
function writeUInt64(buf, value, offset) {
  const high = Math.floor(Number(value) / 0x100000000) >>> 0;
  const low = Number(value) >>> 0;
  buf.writeUInt32LE(low, offset);
  buf.writeUInt32LE(high, offset + 4);
}
function modeFor(relPath, isDir) {
  if (isDir) return 0o755;
  const base = path.basename(relPath);
  if (base.endsWith('.command') || base.endsWith('.sh')) return 0o755;
  if (EXEC_NAMES.has(base)) return 0o755;
  return 0o644;
}

const files = [];
function walk(dir, rel) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const r = rel ? rel + '/' + entry.name : entry.name;
    if (entry.isDirectory()) {
      files.push({ path: r, dir: true, mode: modeFor(r, true) });
      walk(full, r);
    } else if (entry.isFile()) {
      const data = fs.readFileSync(full);
      files.push({ path: r, dir: false, mode: modeFor(r, false), data });
    } else if (entry.isSymbolicLink()) {
      // 符号链接：zip 里按 0777 存（macOS 上解压后仍是链接需要 unix 工具；此处跳过，极少见）
      files.push({ path: r, dir: false, mode: 0o777, link: fs.readlinkSync(full) });
    }
  }
}
walk(srcDir, '');

const parts = [];
const central = [];
let offset = 0;

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

for (const f of files) {
  const nameBuf = Buffer.from(f.path, 'utf8');
  const isDir = f.dir;
  const isLink = !!f.link;
  let comp = Buffer.alloc(0);
  let method = 0;
  let crc = 0;
  let size = 0;
  if (!isDir && !isLink) {
    crc = crc32(f.data);
    size = f.data.length;
    const deflated = zlib.deflateRawSync(f.data, { level: 9 });
    if (deflated.length < f.data.length) { comp = deflated; method = 8; }
    else comp = f.data;
  }

  const dosTime = 0; // 1980-01-01 00:00:00
  const dosDate = 0x0021; // 1980-01-01

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);          // version needed
  local.writeUInt16LE(0x0800, 6);      // flags: UTF-8 names
  local.writeUInt16LE(method, 8);
  local.writeUInt16LE(dosTime, 10);
  local.writeUInt16LE(dosDate, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(comp.length, 18);
  local.writeUInt32LE(size, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  local.writeUInt16LE(0, 28);          // extra
  parts.push(local, nameBuf, comp);

  const externalAttr = isDir ? (0o755 << 16) | 0x10 : f.mode << 16;
  const cen = Buffer.alloc(46);
  cen.writeUInt32LE(0x02014b50, 0);
  cen.writeUInt16LE(20, 4);            // version made by (unix)
  cen.writeUInt16LE(20, 6);
  cen.writeUInt16LE(0x0800, 8);
  cen.writeUInt16LE(method, 10);
  cen.writeUInt16LE(dosTime, 12);
  cen.writeUInt16LE(dosDate, 14);
  cen.writeUInt32LE(crc, 16);
  cen.writeUInt32LE(comp.length, 20);
  cen.writeUInt32LE(size, 24);
  cen.writeUInt16LE(nameBuf.length, 28);
  cen.writeUInt16LE(0, 30);            // extra len
  cen.writeUInt16LE(0, 32);            // comment len
  cen.writeUInt16LE(0, 34);            // disk
  cen.writeUInt16LE(0, 36);            // internal attrs
  cen.writeUInt32LE(externalAttr, 38);
  cen.writeUInt32LE(offset, 42);
  central.push(cen, nameBuf);
  offset += local.length + nameBuf.length + comp.length;
}

const cenSize = central.reduce((a, b) => a + b.length, 0);
const needZip64 = files.length > 0xffff || cenSize > 0xffffffff || offset > 0xffffffff;

// ZIP64 EOCD record (needed when entry count exceeds 65535)
let zip64Eocd = Buffer.alloc(0);
let zip64Locator = Buffer.alloc(0);
if (needZip64) {
  zip64Eocd = Buffer.alloc(56);
  zip64Eocd.writeUInt32LE(0x06064b50, 0);
  writeUInt64(zip64Eocd, 44, 4);             // size of remaining record
  zip64Eocd.writeUInt16LE(45, 12);           // version made by
  zip64Eocd.writeUInt16LE(45, 14);           // version needed
  zip64Eocd.writeUInt32LE(0, 16);            // disk number
  zip64Eocd.writeUInt32LE(0, 20);            // cd start disk
  writeUInt64(zip64Eocd, files.length, 24);  // entries this disk
  writeUInt64(zip64Eocd, files.length, 32);  // total entries
  writeUInt64(zip64Eocd, cenSize, 40);       // cd size
  writeUInt64(zip64Eocd, offset, 48);        // cd offset
  zip64Locator = Buffer.alloc(20);
  zip64Locator.writeUInt32LE(0x07064b50, 0);
  zip64Locator.writeUInt32LE(0, 4);          // disk with zip64 eocd
  writeUInt64(zip64Locator, offset + cenSize, 8); // zip64 eocd offset
  zip64Locator.writeUInt32LE(1, 16);         // total disks
}

const eocd = Buffer.alloc(22);
eocd.writeUInt32LE(0x06054b50, 0);
eocd.writeUInt16LE(0, 4);
eocd.writeUInt16LE(0, 6);
eocd.writeUInt16LE(needZip64 ? 0xffff : files.length, 8);
eocd.writeUInt16LE(needZip64 ? 0xffff : files.length, 10);
eocd.writeUInt32LE(needZip64 ? 0xffffffff : cenSize, 12);
eocd.writeUInt32LE(needZip64 ? 0xffffffff : offset, 16);
eocd.writeUInt16LE(0, 20);

fs.mkdirSync(path.dirname(outZip), { recursive: true });
const out = fs.createWriteStream(outZip);
for (const p of parts) out.write(p);
for (const c of central) out.write(c);
if (needZip64) { out.write(zip64Eocd); out.write(zip64Locator); }
out.write(eocd);
out.end(() => {
  const size = fs.statSync(outZip).size;
  console.log(`zip written: ${outZip} (${files.length} entries, ${(size / 1048576).toFixed(1)} MB)`);
});
