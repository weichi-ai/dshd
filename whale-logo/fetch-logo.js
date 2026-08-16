import fs from 'node:fs';

// 1. Download known icon assets
const assets = {
  'favicon.ico': 'https://www.deepseek.com/favicon.ico',
  'favicon-api-docs.svg': 'https://api-docs.deepseek.com/img/favicon.svg',
  'favicon-platform.png': 'https://cdn.deepseek.com/platform/favicon.png',
};
for (const [name, url] of Object.entries(assets)) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' }, redirect: 'follow' });
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(name, buf);
    console.log(`OK ${name}  ${res.status}  ${buf.length} bytes  type=${res.headers.get('content-type')}`);
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
  }
}

// 2. Fetch homepage and extract inline SVGs
const res = await fetch('https://www.deepseek.com/', { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
const html = await res.text();
fs.writeFileSync('deepseek-home.html', html);
const svgRe = /<svg[\s\S]*?<\/svg>/g;
const svgs = html.match(svgRe) || [];
console.log(`\nhomepage inline <svg> blocks: ${svgs.length}`);
svgs.forEach((s, i) => {
  fs.writeFileSync(`inline-${i}.svg`, s);
  const size = /viewBox="([^"]+)"/.exec(s);
  const fill = /fill="([^"]+)"/.exec(s);
  console.log(`inline-${i}.svg  len=${s.length}  viewBox=${size ? size[1] : '?'}  firstFill=${fill ? fill[1] : '?'}`);
});
