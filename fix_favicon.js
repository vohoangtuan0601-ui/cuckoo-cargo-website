const fs = require('fs');
const p = 'd:/Cuckoo Cargo Website/';
const files = fs.readdirSync(p).filter(f => f.endsWith('.html') && f !== 'index.html');
const tag = '\n  <link rel="icon" type="image/png" href="assets/images/favicon.png?v=2" />';

let cnt = 0;
files.forEach(f => {
  let c = fs.readFileSync(p + f, 'utf8');
  if (!c.includes('favicon.png')) {
    if (c.match(/<\/title>/i)) {
      c = c.replace(/(<\/title>)/i, '$1' + tag);
    } else {
      c = c.replace(/(<\/head>)/i, tag + '\n$1');
    }
    fs.writeFileSync(p + f, c, 'utf8');
    console.log('Added to ' + f);
    cnt++;
  } else {
    console.log('Already in ' + f);
  }
});
console.log('Total added:', cnt);
