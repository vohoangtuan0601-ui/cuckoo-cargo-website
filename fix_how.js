const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldCardsHTML = `<div class="how-panel active" id="how-mvv">
        <div class="how-step-card">
          <div class="step-n">1</div>
          <div class="step-icon"></div>
          <h4 data-vi="Tạo đơn online" data-en="Create order online">Tạo đơn online</h4>
          <p data-vi="Điền thông tin người gửi, người nhận và chọn gói bảo hiểm trong 5 phút trên website."
            data-en="Fill in sender and recipient details and pick an insurance plan in 5 minutes on the website.">Điền
            thông tin người gửi, người nhận và chọn gói bảo hiểm trong 5 phút trên website.</p>
        </div>
        <div class="how-step-card">
          <div class="step-n">2</div>
          <div class="step-icon"></div>
          <h4 data-vi="Drop-off hoặc Pickup" data-en="Drop-off or Pickup">Drop-off hoặc Pickup</h4>
          <p data-vi="Mang hàng đến kho hoặc đặt pickup — nhân viên đến lấy tận nơi từ Thứ 2 đến Thứ 6."
            data-en="Bring items to our warehouse or book a pickup — our staff collects them at your door, Monday to Friday.">
            Mang hàng đến kho hoặc đặt pickup — nhân viên đến lấy tận nơi từ Thứ 2 đến Thứ 6.</p>
        </div>
        <div class="how-step-card">
          <div class="step-n">3</div>
          <div class="step-icon"></div>
          <h4 data-vi="Nhận hàng tại VN" data-en="Receive in Vietnam">Nhận hàng tại VN</h4>
          <p data-vi="Hàng về đến kho Việt Nam trong 7–10 ngày. Giao tận nhà đến 63 tỉnh thành."
            data-en="Goods arrive at our Vietnam warehouse in 7–10 days. Home delivery to all 63 provinces.">Hàng về đến
            kho Việt Nam trong 7–10 ngày. Giao tận nhà đến 63 tỉnh thành.</p>
        </div>
      </div>`;

const newCardsHTML = `<div class="how-panel active" id="how-mvv">
        <div class="how-step-card" style="padding: 0 0 28px 0; overflow: hidden; border: 1px solid var(--gray-border); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 100%; height: 180px; position: relative; margin-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.05);">
            <img src="assets/images/blog_compare.png" alt="Step 1" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="step-n" style="top: auto; bottom: -16px; box-shadow: 0 4px 10px rgba(245,67,10,0.3); border: 3px solid #fff; width: 32px; height: 32px; font-size: 14px;">1</div>
          </div>
          <h4 data-vi="Tạo đơn online" data-en="Create order online" style="padding: 0 22px;">Tạo đơn online</h4>
          <p data-vi="Điền thông tin người gửi, người nhận và chọn gói bảo hiểm trong 5 phút trên website."
            data-en="Fill in sender and recipient details and pick an insurance plan in 5 minutes on the website." style="padding: 0 22px;">Điền
            thông tin người gửi, người nhận và chọn gói bảo hiểm trong 5 phút trên website.</p>
        </div>
        <div class="how-step-card" style="padding: 0 0 28px 0; overflow: hidden; border: 1px solid var(--gray-border); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 100%; height: 180px; position: relative; margin-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.05);">
            <img src="assets/images/blog_guide.png" alt="Step 2" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="step-n" style="top: auto; bottom: -16px; box-shadow: 0 4px 10px rgba(245,67,10,0.3); border: 3px solid #fff; width: 32px; height: 32px; font-size: 14px;">2</div>
          </div>
          <h4 data-vi="Drop-off hoặc Pickup" data-en="Drop-off or Pickup" style="padding: 0 22px;">Drop-off hoặc Pickup</h4>
          <p data-vi="Mang hàng đến kho hoặc đặt pickup — nhân viên đến lấy tận nơi từ Thứ 2 đến Thứ 6."
            data-en="Bring items to our warehouse or book a pickup — our staff collects them at your door, Monday to Friday." style="padding: 0 22px;">
            Mang hàng đến kho hoặc đặt pickup — nhân viên đến lấy tận nơi từ Thứ 2 đến Thứ 6.</p>
        </div>
        <div class="how-step-card" style="padding: 0 0 28px 0; overflow: hidden; border: 1px solid var(--gray-border); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 100%; height: 180px; position: relative; margin-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.05);">
            <img src="assets/images/blog_products.png" alt="Step 3" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="step-n" style="top: auto; bottom: -16px; box-shadow: 0 4px 10px rgba(245,67,10,0.3); border: 3px solid #fff; width: 32px; height: 32px; font-size: 14px;">3</div>
          </div>
          <h4 data-vi="Nhận hàng tại VN" data-en="Receive in Vietnam" style="padding: 0 22px;">Nhận hàng tại VN</h4>
          <p data-vi="Hàng về đến kho Việt Nam trong 7–10 ngày. Giao tận nhà đến 63 tỉnh thành."
            data-en="Goods arrive at our Vietnam warehouse in 7–10 days. Home delivery to all 63 provinces." style="padding: 0 22px;">Hàng về đến
            kho Việt Nam trong 7–10 ngày. Giao tận nhà đến 63 tỉnh thành.</p>
        </div>
      </div>`;

// Replace ignoring strict whitespaces
const regex = new RegExp('<div class="how-panel active" id="how-mvv">[\\s\\S]*?</div>\\s*</div>\\s*</div>\\s*</div>', 'i');

let replaced = false;

// Custom replacement using a more flexible method
const startIndex = html.indexOf('<div class="how-panel active" id="how-mvv">');
if (startIndex !== -1) {
    const endStr = '      <div class="how-panel" id="how-label">';
    const endIndex = html.indexOf(endStr, startIndex);
    if (endIndex !== -1) {
        html = html.substring(0, startIndex) + newCardsHTML + "\n" + html.substring(endIndex);
        replaced = true;
    }
}

if (replaced) {
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Success');
} else {
    console.log('Failed to find replace block');
}
