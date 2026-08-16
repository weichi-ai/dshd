(async () => {
  const html = await (await fetch('http://127.0.0.1:3080/')).text();
  const jsRef = (html.match(/assets\/index-[^"']+\.js/) || [])[0];
  console.log('index.html references:', jsRef);

  const js = await (await fetch('http://127.0.0.1:3080/' + jsRef)).text();
  console.log('bundle served len:', js.length);
  console.log('has dshWhaleGrad2:', js.includes('dshWhaleGrad2'));
  console.log('has colorful stops:', js.includes('stopColor:"#FB7185"'));
  console.log('old bundle name gone from html:', !html.includes('index-Dqw48FrP.js'));
  const oldJs = await fetch('http://127.0.0.1:3080/assets/index-Dqw48FrP.js');
  console.log('old bundle URL status (should be 404):', oldJs.status);

  const fav = await (await fetch('http://127.0.0.1:3080/favicon.svg')).text();
  console.log('favicon is colorful:', fav.includes('#22D3EE'));
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
