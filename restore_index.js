const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const features1 = [
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Pickup tại 50 tiểu bang Mỹ" data-en="Pickup across all 50 US states">Pickup tại 50 tiểu bang Mỹ</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Giao hàng tận nhà tại Việt Nam" data-en="Home delivery in Vietnam">Giao hàng tận nhà tại Việt Nam</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Tracking thời gian thực" data-en="Real-time tracking">Tracking thời gian thực</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Bảo hiểm 4 gói linh hoạt" data-en="4 flexible insurance plans">Bảo hiểm 4 gói linh hoạt</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span><span data-vi="7–10 ngày giao hàng" data-en="7–10 day delivery">7–10 ngày giao hàng</span></div>'
];

const features2 = [
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="UPS $1.99/lbs — Drop-off hoặc Pickup" data-en="UPS $1.99/lbs — Drop-off or Pickup">UPS $1.99/lbs — Drop-off hoặc Pickup</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="FedEx $2.49/lbs — Ổn định, ít delay" data-en="FedEx $2.49/lbs — Reliable, fewer delays">FedEx $2.49/lbs — Ổn định, ít delay</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="USPS từ $1.49/lbs — Phù hợp hàng nhẹ" data-en="USPS from $1.49/lbs — Best for light items">USPS từ $1.49/lbs — Phù hợp hàng nhẹ</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span><span data-vi="Nhận label trong 30–60 phút" data-en="Receive label in 30–60 minutes">Nhận label trong 30–60 phút</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:#22C55E;flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="FedEx & USPS free pickup" data-en="Free FedEx & USPS pickup">FedEx & USPS free pickup</span></div>'
];

const features3 = [
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Mua hộ từ Amazon, Ebay, Sephora..." data-en="Shop from Amazon, Ebay, Sephora...">Mua hộ từ Amazon, Ebay, Sephora...</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span><span data-vi="Tracking thời gian thực" data-en="Real-time tracking">Tracking thời gian thực</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Nhận báo giá trong 24h" data-en="Get quote in 24h">Nhận báo giá trong 24h</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Kiểm tra hàng trước khi gửi" data-en="Inspect items before shipping">Kiểm tra hàng trước khi gửi</span></div>',
  '<div class="svc-feat"><span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);flex-shrink:0;margin-top:1px;"><polyline points="20 6 9 17 4 12"/></svg></span><span data-vi="Thanh toán sau khi có báo giá" data-en="Pay after you receive the quote">Thanh toán sau khi có báo giá</span></div>'
];

let parts = html.split('<div class="service-card-features">');

if (parts.length === 4) {
  parts[1] = '\n' + features1.join('\n') + '\n</div>' + parts[1].split('</div>').slice(1).join('</div>');
  parts[2] = '\n' + features2.join('\n') + '\n</div>' + parts[2].split('</div>').slice(1).join('</div>');
  parts[3] = '\n' + features3.join('\n') + '\n</div>' + parts[3].split('</div>').slice(1).join('</div>');

  html = parts.join('<div class="service-card-features">');
}

// Restore Why Us section
html = html.replace(/<h4 data-vi="Giao hàng 7-10 ngày"[^>]*>.*?<\/h4>/, '<h4 data-vi="Uy tín và Trách nhiệm" data-en="Trust & Responsibility">Uy tín và Trách nhiệm</h4>');
html = html.replace(/<p data-vi="Cam kết thời gian giao hàng chuẩn xác\."[^>]*>.*?<\/p>/, '<p data-vi="Cuckoo Cargo xây dựng uy tín từ chất lượng dịch vụ thực tế, không phải khẩu hiệu." data-en="Cuckoo Cargo builds trust from actual service quality, not just slogans.">Cuckoo Cargo xây dựng uy tín từ chất lượng dịch vụ thực tế, không phải khẩu hiệu.</p>');

html = html.replace(/<h4 data-vi="Bảo hiểm đầy đủ"[^>]*>.*?<\/h4>/, '<h4 data-vi="Hỗ trợ 24/7" data-en="24/7 Support">Hỗ trợ 24/7</h4>');
html = html.replace(/<p data-vi="Hoàn tiền 100% nếu thất lạc hàng hóa\."[^>]*>.*?<\/p>/, '<p data-vi="Không tìm thấy câu trả lời? Đội ngũ Cuckoo Cargo hỗ trợ 7 ngày/tuần." data-en="Can\'t find an answer? Cuckoo Cargo team is available 7 days/week.">Không tìm thấy câu trả lời? Đội ngũ Cuckoo Cargo hỗ trợ 7 ngày/tuần.</p>');

html = html.replace(/<h4 data-vi="50 Tiểu bang phủ sóng"[^>]*>.*?<\/h4>/, '<h4 data-vi="Giá Cước Cạnh Tranh" data-en="Competitive Rates">Giá Cước Cạnh Tranh</h4>');
html = html.replace(/<p data-vi="Nhận hàng từ mọi nơi trên toàn nước Mỹ\."[^>]*>.*?<\/p>/, '<p data-vi="Phí vận chuyển minh bạch, tiết kiệm tối đa, không phát sinh chi phí ẩn." data-en="Transparent shipping fees, maximum savings, no hidden costs.">Phí vận chuyển minh bạch, tiết kiệm tối đa, không phát sinh chi phí ẩn.</p>');

html = html.replace(/<h4 data-vi="Hỗ trợ tiếng Việt"[^>]*>.*?<\/h4>/, '<h4 data-vi="Giao Hàng Nhanh Chóng" data-en="Fast Delivery">Giao Hàng Nhanh Chóng</h4>');
html = html.replace(/<p data-vi="Đội ngũ CSKH người Việt sẵn sàng hỗ trợ 24\/7\."[^>]*>.*?<\/p>/, '<p data-vi="Chỉ từ 7-10 ngày kể từ khi nhập kho Cuckoo Cargo tại Mỹ. Thời gian được đảm bảo." data-en="Only 7-10 days from receipt at our US warehouse. Guaranteed timeline.">Chỉ từ 7-10 ngày kể từ khi nhập kho Cuckoo Cargo tại Mỹ. Thời gian được đảm bảo.</p>');

html = html.replace(/<h4 data-vi="Hỗ trợ đóng gói"[^>]*>.*?<\/h4>/, '<h4 data-vi="Bảo Hiểm An Toàn" data-en="Safe Insurance">Bảo Hiểm An Toàn</h4>');
html = html.replace(/<p data-vi="Miễn phí tư vấn và hỗ trợ đóng gói chuẩn quốc tế\."[^>]*>.*?<\/p>/, '<p data-vi="Cung cấp 4 gói bảo hiểm linh hoạt, bồi thường lên đến 100% giá trị hàng hóa." data-en="4 flexible insurance plans, compensating up to 100% of goods value.">Cung cấp 4 gói bảo hiểm linh hoạt, bồi thường lên đến 100% giá trị hàng hóa.</p>');

html = html.replace(/<h4 data-vi="Tracking minh bạch"[^>]*>.*?<\/h4>/, '<h4 data-vi="Cập Nhật Tự Động" data-en="Automatic Updates">Cập Nhật Tự Động</h4>');
html = html.replace(/<p data-vi="Theo dõi lộ trình hàng hóa 24\/7\."[^>]*>.*?<\/p>/, '<p data-vi="Cuckoo Cargo cập nhật trạng thái đơn hàng qua Zalo/Email liên tục suốt hành trình." data-en="Cuckoo Cargo updates order status via Zalo/Email continuously.">Cuckoo Cargo cập nhật trạng thái đơn hàng qua Zalo/Email liên tục suốt hành trình.</p>');

fs.writeFileSync('index.html', html);
console.log('Restored index.html to original state!');
