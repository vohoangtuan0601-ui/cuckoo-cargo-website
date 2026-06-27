const fs = require('fs');

const files = [
  'my-ve-viet.html',
  'noi-dia-my.html',
  'mua-ho.html',
  'tracking.html',
  'san-pham.html',
  'blog.html' // Just in case
];

const faviconTag = '<link rel="icon" type="image/png" href="assets/images/favicon.png" />';

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');

  // 1. Fix typos
  html = html.replace(/nội sịa/gi, 'nội địa');
  html = html.replace(/Nội Sịa/gi, 'Nội Địa');
  html = html.replace(/Nội sịa/g, 'Nội địa');
  
  html = html.replace(/muq hộ/gi, 'mua hộ');
  html = html.replace(/Muq Hộ/gi, 'Mua Hộ');
  html = html.replace(/Muq hộ/g, 'Mua hộ');

  html = html.replace(/trackingg/gi, 'tracking');
  html = html.replace(/Trackingg/g, 'Tracking');

  html = html.replace(/sảng phẩm/gi, 'sản phẩm');
  html = html.replace(/Sảng Phẩm/gi, 'Sản Phẩm');
  html = html.replace(/Sảng phẩm/g, 'Sản phẩm');

  // 2. Add favicon if missing
  if (!html.includes('href="assets/images/favicon.png"')) {
    // Inject it right before </head> or after <title>
    if (html.includes('</head>')) {
      html = html.replace('</head>', `  ${faviconTag}\n</head>`);
    }
  } else {
    // If it has it but maybe it's broken, let's make sure it's correct
    // Just replace any existing favicon link with the correct one
    html = html.replace(/<link[^>]*rel=["']icon["'][^>]*>/g, faviconTag);
  }

  // Also make sure <title> doesn't have typos (should be covered by global replace, but just in case)
  fs.writeFileSync(file, html);
  console.log('Fixed ' + file);
}
