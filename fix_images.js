const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix object-fit: cover -> object-fit: contain
html = html.replace(/object-fit: cover;/g, 'object-fit: contain;');

// 2. Remove dark mode from Card 2
html = html.replace(/<div class="service-card" style="border-color:var\(--ups-purple\);">/g, '<div class="service-card">');
html = html.replace(/<div class="service-card-top" style="background:linear-gradient\(160deg,#0d0520,#1a0a40\);">/g, '<div class="service-card-top">');
html = html.replace(/border-bottom: 1px solid rgba\(255,255,255,0\.1\);/g, 'border-bottom: 1px solid var(--gray-border);');
html = html.replace(/<h3 style="color:#fff;"/g, '<h3');
html = html.replace(/<p class="sub" style="color:rgba\(255,255,255,\.6\);"/g, '<p class="sub"');
html = html.replace(/<div class="svc-price" style="background:rgba\(255,255,255,\.1\);border-color:rgba\(255,255,255,\.2\);">/g, '<div class="svc-price">');
html = html.replace(/<span class="from" style="color:rgba\(255,255,255,\.5\);"/g, '<span class="from"');
html = html.replace(/<span class="amount" style="color:#fff;"/g, '<span class="amount"');
html = html.replace(/<span class="unit" style="color:rgba\(255,255,255,\.5\);"/g, '<span class="unit"');

// 3. Synchronize SVG icons
// Replace the clock SVG inner content with the checkmark inner content
html = html.replace(/<circle cx="12" cy="12" r="10" \/>\s*<polyline points="12 6 12 12 16 14" \/>/g, '<polyline points="20 6 9 17 4 12" />');

// Replace the green color with orange color for the 5th feature in Card 2
html = html.replace(/style="color:#22C55E;/g, 'style="color:var(--orange);');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Success');
