const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newCardsHTML = `
 <div class="service-cards">
 <!-- Mỹ - Việt Nam -->
 <div class="service-card">
   <div class="card-img-top">
     <img src="assets/images/anh1.png.png" alt="Mỹ - Việt Nam" style="width:100%; display:block; border-bottom: 1px solid var(--gray-border);">
   </div>
   <div class="service-card-top" style="padding: 24px 28px;">
     <h3 data-vi="Mỹ - Việt Nam">Mỹ - Việt Nam</h3>
     <p class="sub" data-vi="Gửi hàng từ bất kỳ tiểu bang nào về 63 tỉnh thành Việt Nam. Tạo đơn online, nhân viên lấy tận nơi." style="font-size:14px; color:#64748B; margin-bottom: 16px;">Gửi hàng từ bất kỳ tiểu bang nào về 63 tỉnh thành Việt Nam. Tạo đơn online, nhân viên lấy tận nơi.</p>
     <div class="svc-price" style="display:inline-block; background:#FFF4ED; color:#EA580C; padding:6px 16px; border-radius:20px; font-weight:700; font-size:14px;"><span data-vi="Từ $3.49 /lbs">Từ $3.49 /lbs</span></div>
   </div>
 </div>

 <!-- Label Nội địa Mỹ -->
 <div class="service-card">
   <div class="card-img-top">
     <img src="assets/images/anh2.png" alt="Label Nội địa Mỹ" style="width:100%; display:block; border-bottom: 1px solid var(--gray-border);">
   </div>
   <div class="service-card-top" style="padding: 24px 28px;">
     <h3 data-vi="Label Nội địa Mỹ">Label Nội địa Mỹ</h3>
     <p class="sub" data-vi="UPS, FedEx, USPS — ship hàng trong 50 tiểu bang. Tiết kiệm 3-4 lần so với giá lẻ." style="font-size:14px; color:#64748B; margin-bottom: 16px;">UPS, FedEx, USPS — ship hàng trong 50 tiểu bang. Tiết kiệm 3-4 lần so với giá lẻ.</p>
     <div class="svc-price" style="display:inline-block; background:#FFF4ED; color:#EA580C; padding:6px 16px; border-radius:20px; font-weight:700; font-size:14px;"><span data-vi="Từ $1.49 /lbs">Từ $1.49 /lbs</span></div>
   </div>
 </div>

 <!-- Mua hộ hàng Mỹ -->
 <div class="service-card">
   <div class="card-img-top">
     <img src="assets/images/anh3.png" alt="Mua hộ hàng Mỹ" style="width:100%; display:block; border-bottom: 1px solid var(--gray-border);">
   </div>
   <div class="service-card-top" style="padding: 24px 28px;">
     <h3 data-vi="Mua hộ hàng Mỹ">Mua hộ hàng Mỹ</h3>
     <p class="sub" data-vi="Không có thẻ Mỹ? Gửi link — Cuckoo Cargo mua và ship về Việt Nam. Nhận báo giá trong 24h." style="font-size:14px; color:#64748B; margin-bottom: 16px;">Không có thẻ Mỹ? Gửi link — Cuckoo Cargo mua và ship về Việt Nam. Nhận báo giá trong 24h.</p>
     <div class="svc-price" style="display:inline-block; background:#FFF4ED; color:#EA580C; padding:6px 16px; border-radius:20px; font-weight:700; font-size:14px;"><span data-vi="Phí Liên hệ">Phí Liên hệ</span></div>
   </div>
 </div>
 </div>
`;

// Replace the entire service-cards container
const startIndex = html.indexOf('<div class="service-cards">');
const endIndex = html.indexOf('</section>', startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  // We need to keep the </section> closing tag
  const originalSectionBody = html.substring(startIndex, endIndex);
  
  // Actually, wait, there might be </div> that we need to keep if they close something else?
  // No, the service-cards is the last thing in the .services-inner wrapper.
  // Wait, the structure is:
  // <section class="services-section" ...>
  //  <div class="services-inner">
  //   <div class="section-title">...</div>
  //   <div class="service-cards">...</div>
  //  </div>
  // </section>
  // So replacing from `<div class="service-cards">` to `</section>` with `newCardsHTML + '\n </div>\n</section>'` should work.
  
  // Let's use string manipulation carefully.
  // We find the closing tag of <div class="service-cards">
  // Since we know the exact structure, let's just replace the chunk.
}

let topHtml = html.substring(0, startIndex);
let bottomHtml = html.substring(endIndex);

// Add the closing div for .services-inner
let finalHtml = topHtml + newCardsHTML + ' </div>\n' + bottomHtml;

fs.writeFileSync('index.html', finalHtml);
console.log('Replaced service cards completely!');
