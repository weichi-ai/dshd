// patch-exe-icon.js — 用 .ico 替换 PE 可执行文件的图标资源（纯 JS，无依赖）
// 用法: node patch-exe-icon.js <exe路径> <ico路径>
// 策略（兼容 .rsrc 满且后贴 .reloc 的 Electron 二进制）：
//   1) 原地覆盖：选 .ico 中能塞进现有 RT_ICON 数据块的前 2 个尺寸（24px/48px）
//   2) 文件末尾追加新 section（.dshic），存放 128px 与 256px，重定向对应数据项
//   3) 原地重写 RT_GROUP_ICON（4 项，大小不变）
// 保留版本信息等其他资源；任何一步失败都不写盘。
const fs = require('fs');

const RT_ICON = 3;
const RT_GROUP_ICON = 14;

function readICO(icoPath) {
  const buf = fs.readFileSync(icoPath);
  if (buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1) throw new Error('not an .ico file: ' + icoPath);
  const count = buf.readUInt16LE(4);
  const entries = [];
  let offset = 6;
  for (let i = 0; i < count; i++) {
    const e = {
      width: buf[offset] || 256,
      height: buf[offset + 1] || 256,
      colors: buf[offset + 2],
      planes: buf.readUInt16LE(offset + 4),
      bitCount: buf.readUInt16LE(offset + 6),
      size: buf.readUInt32LE(offset + 8),
      dataOffset: buf.readUInt32LE(offset + 12)
    };
    entries.push(e);
    offset += 16;
  }
  for (const e of entries) {
    e.data = buf.subarray(e.dataOffset, e.dataOffset + e.size);
    if (e.data.length !== e.size) throw new Error('ico data truncated');
  }
  return entries;
}

function parsePE(buf) {
  const peOff = buf.readUInt32LE(0x3c);
  if (buf.toString('ascii', peOff, peOff + 4) !== 'PE\0\0') throw new Error('not a PE file');
  const coff = peOff + 4;
  const numSections = buf.readUInt16LE(coff + 2);
  const optSize = buf.readUInt16LE(coff + 16);
  const opt = coff + 20;
  const magic = buf.readUInt16LE(opt);
  if (magic !== 0x10b && magic !== 0x20b) throw new Error('unknown PE magic');
  const is64 = magic === 0x20b;
  const ddOff = opt + (is64 ? 112 : 96);
  const resDir = { rva: buf.readUInt32LE(ddOff + 16), size: buf.readUInt32LE(ddOff + 20) };
  const secOff = opt + optSize;
  const sections = [];
  for (let i = 0; i < numSections; i++) {
    const s = secOff + i * 40;
    sections.push({
      name: buf.toString('latin1', s, s + 8).replace(/\0/g, ''),
      vsize: buf.readUInt32LE(s + 8),
      vaddr: buf.readUInt32LE(s + 12),
      rawSize: buf.readUInt32LE(s + 16),
      rawPtr: buf.readUInt32LE(s + 20),
      chars: buf.readUInt32LE(s + 36)
    });
  }
  const rsrc = sections.find((s) => s.name === '.rsrc');
  if (!rsrc) throw new Error('.rsrc section not found');
  const last = sections[sections.length - 1];
  return { peOff, coff, opt, is64, ddOff, resDir, sections, rsrc, last, numSections, secOff };
}

function patch(exePath, icoPath) {
  const exe = fs.readFileSync(exePath);
  const pe = parsePE(exe);
  const entries = readICO(icoPath);

  const rawOf = (rva) => {
    for (const s of pe.sections) {
      if (rva >= s.vaddr && rva < s.vaddr + Math.max(s.vsize, s.rawSize)) return s.rawPtr + (rva - s.vaddr);
    }
    return -1;
  };
  const readDir = (rva) => {
    const r = rawOf(rva);
    if (r < 0) throw new Error('dir rva not mapped: ' + rva);
    const n = exe.readUInt16LE(r + 12) + exe.readUInt16LE(r + 14);
    const out = [];
    for (let i = 0; i < n; i++) {
      const p = r + 16 + i * 8;
      const name = exe.readUInt32LE(p);
      const offRaw = exe.readUInt32LE(p + 4);
      out.push({ name: name & 0x7fffffff, isDir: !!(offRaw & 0x80000000), target: pe.resDir.rva + (offRaw & 0x7fffffff) });
    }
    return out;
  };
  // 取某个 type 下的叶子数据项结构 raw 偏移（type -> 首个 name -> 首个 leaf -> data entry）
  const dataEntryRawOf = (type) => {
    const root = readDir(pe.resDir.rva);
    const te = root.find((e) => e.name === type);
    if (!te || !te.isDir) return null;
    const names = readDir(te.target);
    if (names.length === 0) return null;
    const leaf = readDir(names[0].target);
    if (leaf.length === 0 || leaf[0].isDir) return null;
    return rawOf(leaf[0].target);
  };
  const iconIds = () => {
    const root = readDir(pe.resDir.rva);
    const ico = root.find((e) => e.name === RT_ICON);
    if (!ico || !ico.isDir) return [];
    const names = readDir(ico.target);
    return names.map((n) => n.name).sort((a, b) => a - b);
  };
  const iconDataEntryRaw = (id) => {
    const root = readDir(pe.resDir.rva);
    const ico = root.find((e) => e.name === RT_ICON);
    const names = readDir(ico.target);
    const hit = names.find((n) => n.name === id);
    if (!hit) return null;
    const leaf = readDir(hit.target);
    if (leaf.length === 0 || leaf[0].isDir) return null;
    return rawOf(leaf[0].target);
  };

  const groupEntryRaw = dataEntryRawOf(RT_GROUP_ICON);
  if (groupEntryRaw === null) throw new Error('no existing group icon');
  const ids = iconIds();
  if (ids.length < 4) throw new Error('need at least 4 existing RT_ICON entries');

  // 现有数据块容量（按 id）
  const capacity = ids.map((id) => {
    const raw = iconDataEntryRaw(id);
    return { id, cap: exe.readUInt32LE(raw + 4) };
  });

  // 确定性分配（每个 .ico 条目只用一次）：
  //   两个最小槽 <- 24px、48px（原地覆盖，容量校验）
  //   两个最大槽 <- 128px、256px（追加新 section 并重定向）
  const byCap = [...capacity].sort((a, b) => a.cap - b.cap);
  const byId = new Map(capacity.map((c) => [c.id, c]));
  const entryOf = (w) => entries.find((e) => e.width === w);
  const smallPlan = [
    { id: byCap[0].id, entry: entryOf(24) },
    { id: byCap[1].id, entry: entryOf(48) }
  ];
  const bigPlan = [
    { id: byCap[2].id, entry: entryOf(128) },
    { id: byCap[3].id, entry: entryOf(256) }
  ];
  for (const p of smallPlan) {
    if (p.entry === void 0 || p.entry.size > byId.get(p.id).cap) {
      throw new Error(`in-place slot for id ${p.id} cannot hold ${p.entry ? p.entry.width + 'px' : 'missing'}`);
    }
  }
  const plan = [...smallPlan, ...bigPlan];

  // 构造 4 项组图标（6 + 14*4 = 62 字节，与现有组数据大小一致，可原地覆盖）
  const grp = Buffer.alloc(62);
  grp.writeUInt16LE(0, 0);
  grp.writeUInt16LE(1, 2);
  grp.writeUInt16LE(plan.length, 4);
  for (let i = 0; i < plan.length; i++) {
    const o = 6 + i * 14;
    const e = plan[i].entry;
    grp[o] = e.width;
    grp[o + 1] = e.height;
    grp[o + 2] = e.colors;
    grp.writeUInt16LE(e.planes, o + 4);
    grp.writeUInt16LE(e.bitCount, o + 6);
    grp.writeUInt32LE(e.data.length, o + 8);
    grp.writeUInt16LE(e.id, o + 12);
  }

  const out = Buffer.from(exe);

  // 1) 原地写组图标数据（62 字节，位置不变）
  const grpDataRaw = rawOf(exe.readUInt32LE(groupEntryRaw));
  grp.copy(out, grpDataRaw);

  // 2) 原地写两个小图标 + 更新数据项 size
  for (const p of smallPlan) {
    const raw = iconDataEntryRaw(p.id);
    const blobRva = exe.readUInt32LE(raw);
    const blobRaw = rawOf(blobRva);
    p.entry.data.copy(out, blobRaw);
    out.writeUInt32LE(p.entry.data.length, raw + 4);
  }
  console.log('in-place icons:', smallPlan.map((p) => `${p.id}(${p.entry.width}x${p.entry.height},${p.entry.data.length}B)`).join(' '));

  // 3) 追加新 section（.dshic）存放 128px 与 256px，重定向对应 id
  const rawPtr = (pe.last.rawPtr + pe.last.rawSize + 511) & ~511;
  const vaddr = (pe.last.vaddr + Math.max(pe.last.vsize, pe.last.rawSize) + 4095) & ~4095;
  const total = bigPlan.reduce((s, b) => s + b.entry.data.length, 0);
  const rawSize = (total + 511) & ~511;
  // 追加 section 头
  const secHeader = Buffer.alloc(40);
  secHeader.write('VDSHICON', 0, 'latin1');
  secHeader.writeUInt32LE(total, 8);            // vsize
  secHeader.writeUInt32LE(vaddr, 12);
  secHeader.writeUInt32LE(rawSize, 16);
  secHeader.writeUInt32LE(rawPtr, 20);
  secHeader.writeUInt32LE(0x40000040, 36);      // READ | INITIALIZED_DATA
  const newSecOff = pe.secOff + pe.numSections * 40;
  secHeader.copy(out, newSecOff);
  out.writeUInt16LE(pe.numSections + 1, pe.peOff + 6);
  // 文件末尾追加数据
  const extended = Buffer.alloc(rawPtr + rawSize);
  out.copy(extended, 0, 0, Math.min(out.length, rawPtr + rawSize));
  let off = 0;
  for (const b of bigPlan) {
    b.entry.data.copy(extended, rawPtr + off);
    off += b.entry.data.length;
  }
  off = 0;
  for (const b of bigPlan) {
    const raw = iconDataEntryRaw(b.id);
    extended.writeUInt32LE(vaddr + off, raw);
    extended.writeUInt32LE(b.entry.data.length, raw + 4);
    off += b.entry.data.length;
  }
  // 修正 SizeOfImage（覆盖新 section 的映射范围）并清零校验和（非驱动不校验）
  const opt = pe.opt;
  const imageEnd = vaddr + total;
  const sectionAlign = extended.readUInt32LE(opt + 32);
  const newSizeOfImage = (Math.ceil(imageEnd / sectionAlign) * sectionAlign) >>> 0;
  extended.writeUInt32LE(newSizeOfImage, opt + 56);
  extended.writeUInt32LE(0, opt + 64);
  fs.writeFileSync(exePath, extended);
  console.log('appended section: rva', vaddr, 'raw', rawPtr, 'blobs:', bigPlan.map((b) => `${b.entry.width}x${b.entry.height}`).join(' '), '-> ids', bigPlan.map((b) => b.id).join(','));
  return { chosen: plan.length, extra: bigPlan.length };
}

const [exePath, icoPath] = process.argv.slice(2);
if (!exePath || !icoPath) { console.error('usage: node patch-exe-icon.js <exe> <ico>'); process.exit(1); }
const info = patch(exePath, icoPath);
console.log(`patched ${exePath}: ${info.chosen} in-place icons${info.extra > 0 ? ` + ${info.extra} in appended section` : ''}`);
