// patch-exe-icon.js — 用 .ico 替换 PE 可执行文件的图标资源（纯 JS，无依赖）
// 用法: node patch-exe-icon.js <exe路径> <ico路径>
// 策略：保留原有资源树（版本信息等），把新图标数据追加到 .rsrc 末尾，
// 重定向首个 RT_GROUP_ICON 的叶子数据项与对应 RT_ICON 叶子数据项。
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
      width: buf[offset],
      height: buf[offset + 1],
      colors: buf[offset + 2],
      planes: buf.readUInt16LE(offset + 4),
      bitCount: buf.readUInt16LE(offset + 6),
      size: buf.readUInt32LE(offset + 8),
      dataOffset: buf.readUInt32LE(offset + 12)
    };
    if (e.width === 0) e.width = 256;
    if (e.height === 0) e.height = 256;
    entries.push(e);
    offset += 16;
  }
  for (const e of entries) {
    e.data = buf.subarray(e.dataOffset, e.dataOffset + e.size);
    if (e.data.length !== e.size) throw new Error('ico data truncated at entry');
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
      rawPtr: buf.readUInt32LE(s + 20)
    });
  }
  const rsrc = sections.find((s) => s.name === '.rsrc');
  if (!rsrc) throw new Error('.rsrc section not found');
  return { peOff, coff, opt, is64, ddOff, resDir, sections, rsrc };
}

function patch(exePath, icoPath) {
  const exe = fs.readFileSync(exePath);
  const pe = parsePE(exe);
  const rsrc = pe.rsrc;
  const entries = readICO(icoPath);

  const rawOf = (rva) => {
    for (const s of pe.sections) {
      if (rva >= s.vaddr && rva < s.vaddr + Math.max(s.vsize, s.rawSize)) return s.rawPtr + (rva - s.vaddr);
    }
    return -1;
  };

  // ---- walk helpers ----
  const readDir = (rva) => {
    const r = rawOf(rva);
    if (r < 0) throw new Error('dir rva not mapped: ' + rva);
    const n = exe.readUInt16LE(r + 12) + exe.readUInt16LE(r + 14);
    const out = [];
    for (let i = 0; i < n; i++) {
      const p = r + 16 + i * 8;
      const name = exe.readUInt32LE(p);
      const offRaw = exe.readUInt32LE(p + 4);
      const isDir = !!(offRaw & 0x80000000);
      const target = isDir ? pe.resDir.rva + (offRaw & 0x7fffffff) : offRaw & 0x7fffffff;
      out.push({ name: name & 0x7fffffff, isDir, target, entryOff: p });
    }
    return out;
  };
  // 找到 type 的叶子数据项（type -> name -> leaf -> data entry 的 raw 偏移）
  const findDataEntry = (type) => {
    const root = readDir(pe.resDir.rva);
    const typeEntry = root.find((e) => e.name === type);
    if (!typeEntry || !typeEntry.isDir) return null;
    const names = readDir(typeEntry.target);
    if (names.length === 0) return null;
    const first = names[0];
    const leaf = readDir(first.target);
    if (leaf.length === 0 || leaf[0].isDir) return null;
    const dataOff = rawOf(leaf[0].target);
    if (dataOff < 0) return null;
    return { names, first, dataEntryRaw: dataOff, leaf: leaf[0] };
  };
  const collectIconIds = () => {
    const root = readDir(pe.resDir.rva);
    const ico = root.find((e) => e.name === RT_ICON);
    if (!ico || !ico.isDir) return [];
    const names = readDir(ico.target);
    const ids = [];
    for (const n of names) {
      const leaf = readDir(n.target);
      if (leaf.length > 0 && !leaf[0].isDir) ids.push(n.name);
    }
    return ids.sort((a, b) => a - b);
  };

  console.log('[dbg] resDir.rva=', pe.resDir.rva, 'size=', pe.resDir.size);
try { const r0 = readDir(pe.resDir.rva); console.log('[dbg] root:', r0.map((e) => e.name + ':' + (e.isDir ? 'd' : 'x')).join(',')); } catch (e) { console.log('[dbg] readDir root threw:', e.message); }
const groupEntry = findDataEntry(RT_GROUP_ICON);
  if (!groupEntry) { console.log('[dbg] groupEntry null'); try { const ids = collectIconIds(); console.log('[dbg] icon ids:', ids); } catch (e) { console.log('[dbg] collectIconIds threw:', e.message); } throw new Error('no existing group icon to repoint'); }
  const existingIds = collectIconIds();
  if (existingIds.length === 0) throw new Error('no existing RT_ICON entries');

  // 取 .ico 前 min(现有图标数) 个尺寸，绑定到现有 id
  const n = Math.min(entries.length, existingIds.length);
  const chosen = entries.slice(0, n).map((e, i) => ({ ...e, id: existingIds[i] }));

  // 构造新的组图标数据（GRPICONDIR + 条目，id 用现有 id）
  const grp = Buffer.alloc(6 + 14 * chosen.length);
  grp.writeUInt16LE(0, 0);
  grp.writeUInt16LE(1, 2);
  grp.writeUInt16LE(chosen.length, 4);
  for (let i = 0; i < chosen.length; i++) {
    const o = 6 + i * 14;
    const e = chosen[i];
    grp[o] = e.width;
    grp[o + 1] = e.height;
    grp[o + 2] = e.colors;
    grp.writeUInt16LE(e.planes, o + 4);
    grp.writeUInt16LE(e.bitCount, o + 6);
    grp.writeUInt32LE(e.data.length, o + 8);
    grp.writeUInt16LE(e.id, o + 12);
  }

  // 新数据追加位置（在 .rsrc 现有内容之后）
  const base = pe.resDir.size;
  let cursor = (base + 3) & ~3;
  const newRva = (off) => pe.resDir.rva + off;

  const grpOff = cursor; cursor += grp.length;
  const icoOffs = [];
  for (const e of chosen) { icoOffs.push(cursor); cursor += e.data.length; cursor = (cursor + 3) & ~3; }

  const sectionEndRaw = rsrc.rawPtr + rsrc.rawSize;
  const sectionEndRva = rsrc.vaddr + Math.max(rsrc.vsize, rsrc.rawSize);
  if (rsrc.rawPtr + cursor > sectionEndRaw) throw new Error(`no space in .rsrc: need ${cursor} raw bytes`);
  if (newRva(cursor) > sectionEndRva) throw new Error('appended data exceeds mapped section');

  // ---- 写回 ----
  const out = Buffer.from(exe);
  grp.copy(out, rsrc.rawPtr + grpOff);
  for (let i = 0; i < chosen.length; i++) chosen[i].data.copy(out, rsrc.rawPtr + icoOffs[i]);

  // 重定向组图标数据项
  const setDataEntry = (dataRaw, rva, size) => {
    out.writeUInt32LE(rva >>> 0, dataRaw);
    out.writeUInt32LE(size, dataRaw + 4);
  };
  setDataEntry(groupEntry.dataEntryRaw, newRva(grpOff), grp.length);
  // 重定向每个现有 id 的图标数据项
  for (const e of chosen) {
    const root = readDir(pe.resDir.rva);
    const ico = root.find((x) => x.name === RT_ICON);
    const names = readDir(ico.target);
    const hit = names.find((x) => x.name === e.id);
    if (!hit) throw new Error('id ' + e.id + ' not found');
    const leaf = readDir(hit.target);
    const dataRaw = rawOf(leaf[0].target);
    setDataEntry(dataRaw, newRva(icoOffs[chosen.indexOf(e)]), e.data.length);
  }
  // 更新资源数据目录 Size（追加了数据）
  out.writeUInt32LE(cursor, pe.ddOff + 20);

  fs.writeFileSync(exePath, out);
  return { chosen: chosen.length, appended: cursor - base, rawSize: rsrc.rawSize };
}

const [exePath, icoPath] = process.argv.slice(2);
if (!exePath || !icoPath) { console.error('usage: node patch-exe-icon.js <exe> <ico>'); process.exit(1); }
const info = patch(exePath, icoPath);
console.log(`patched ${exePath}: ${info.chosen} icon sizes, appended ${info.appended} bytes (section rawSize ${info.rawSize})`);

// 自检：重读并确认组图标指向新数据
{
  const exe = fs.readFileSync(exePath);
  const pe = parsePE(exe);
  const rawOf = (rva) => {
    for (const s of pe.sections) {
      if (rva >= s.vaddr && rva < s.vaddr + Math.max(s.vsize, s.rawSize)) return s.rawPtr + (rva - s.vaddr);
    }
    return -1;
  };
  const readDir = (rva) => {
    const r = rawOf(rva);
    const n = exe.readUInt16LE(r + 12) + exe.readUInt16LE(r + 14);
    const out = [];
    for (let i = 0; i < n; i++) {
      const p = r + 16 + i * 8;
      const name = exe.readUInt32LE(p);
      const offRaw = exe.readUInt32LE(p + 4);
      out.push({ name: name & 0x7fffffff, isDir: !!(offRaw & 0x80000000), target: (offRaw & 0x7fffffff) + (offRaw & 0x80000000 ? pe.resDir.rva : 0) });
    }
    return out;
  };
  const root = readDir(pe.resDir.rva);
  const grp = root.find((e) => e.name === RT_GROUP_ICON);
  const names = readDir(grp.target);
  const leaf = readDir(names[0].target);
  const dataRva = leaf[0].target;
  const dataSize = exe.readUInt32LE(rawOf(dataRva) + 4);
  const raw = rawOf(dataRva);
  if (exe.readUInt16LE(raw + 2) !== 1) throw new Error('verify: not a group icon');
  const iconCount = exe.readUInt16LE(raw + 4);
  if (iconCount < 1) throw new Error('verify: group has no icons');
  console.log(`verify OK: group icon (${iconCount} sizes) -> ${dataSize} bytes at rva ${dataRva}`);
}
