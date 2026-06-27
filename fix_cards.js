const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const features1 = [
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Giao hàng tận nhà tại Việt Nam">Giao hàng tận nhà tại Việt Nam</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Tracking thời gian thực">Tracking thời gian thực</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Nhận label trong 30-60 phút">Nhận label trong 30-60 phút</span></div>'
];

const features2 = [
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="FedEx & USPS free pickup">FedEx & USPS free pickup</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Tiết kiệm 3-4 lần so với giá lẻ.">Tiết kiệm 3-4 lần so với giá lẻ.</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Từ $3.49 /lbs">Từ $3.49 /lbs</span></div>'
];

const features3 = [
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Gửi link Amazon, Walmart, Target...">Gửi link Amazon, Walmart, Target...</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Gom nhiều đơn, ship về cùng lúc">Gom nhiều đơn, ship về cùng lúc</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Thanh toán sau khi có báo giá">Thanh toán sau khi có báo giá</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span><span data-vi="7-10 ngày giao hàng">7-10 ngày giao hàng</span></div>'
];

let parts = html.split('<div class="service-card-features">');

if (parts.length === 4) {
  parts[1] = '\n' + features1.join('\n') + '\n</div>' + parts[1].split('</div>').slice(1).join('</div>');
  parts[2] = '\n' + features2.join('\n') + '\n</div>' + parts[2].split('</div>').slice(1).join('</div>');
  parts[3] = '\n' + features3.join('\n') + '\n</div>' + parts[3].split('</div>').slice(1).join('</div>');

  html = parts.join('<div class="service-card-features">');
  fs.writeFileSync('index.html', html);
  console.log('Successfully updated service cards!');
} else {
  console.log('Could not find exactly 3 service-card-features! Found: ' + (parts.length - 1));
}
