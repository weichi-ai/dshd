const fs = require('fs');
async function main() {
  const res = await fetch('http://127.0.0.1:3080/favicon.svg');
  const t = await res.text();
  console.log('served favicon.svg len:', t.length);
  console.log('head:', t.slice(0, 100));

  const html = await (await fetch('http://127.0.0.1:3080/')).text();
  const m = html.match(/assets\/index-[^"']+\.js/);
  console.log('served bundle:', m ? m[0] : 'NOT FOUND');

  // compare served favicon with dist file
  const dist = fs.readFileSync('D:/Users/Administrator/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-web-frontend/dist/favicon.svg', 'utf8');
  console.log('served === dist file:', t === dist);

  const jsRes = await fetch('http://127.0.0.1:3080/' + m[0]);
  const js = await jsRes.text();
  console.log('bundle served len:', js.length, ' has M23.0584:', js.includes('M23.0584'));
}
main().catch(e => { console.error('FAIL', e); process.exit(1); });
