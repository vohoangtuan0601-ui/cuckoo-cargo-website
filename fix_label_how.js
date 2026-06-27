const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newCardsHTML = `<div class="how-panel" id="how-label">
        <div class="how-step-card" style="padding: 0 0 28px 0; overflow: hidden; border: 1px solid var(--gray-border); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 100%; height: 180px; position: relative; margin-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.05);">
            <img src="assets/images/step1.png" alt="Step 1" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="step-n" style="top: auto; bottom: -16px; box-shadow: 0 4px 10px rgba(245,67,10,0.3); border: 3px solid #fff; width: 32px; height: 32px; font-size: 14px;">1</div>
          </div>
          <h4 data-vi="Chọn hãng & điền form" data-en="Choose carrier & fill the form" style="padding: 0 22px;">Chọn hãng & điền form</h4>
          <p data-vi="Chọn UPS / FedEx / USPS, nhập cân nặng, địa chỉ người gửi và người nhận."
            data-en="Choose UPS / FedEx / USPS, enter the weight and the sender and recipient addresses." style="padding: 0 22px;">Chọn UPS /
            FedEx / USPS, nhập cân nặng, địa chỉ người gửi và người nhận.</p>
        </div>
        <div class="how-step-card" style="padding: 0 0 28px 0; overflow: hidden; border: 1px solid var(--gray-border); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 100%; height: 180px; position: relative; margin-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.05);">
            <img src="assets/images/step2.png" alt="Step 2" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="step-n" style="top: auto; bottom: -16px; box-shadow: 0 4px 10px rgba(245,67,10,0.3); border: 3px solid #fff; width: 32px; height: 32px; font-size: 14px;">2</div>
          </div>
          <h4 data-vi="Nhận label qua email" data-en="Get the label by email" style="padding: 0 22px;">Nhận label qua email</h4>
          <p data-vi="Cuckoo Cargo xử lý và gửi file label PDF về email trong 30–60 phút làm việc."
            data-en="Cuckoo Cargo processes it and emails you the PDF label within 30–60 business minutes." style="padding: 0 22px;">Cuckoo Cargo
            xử lý và gửi file label PDF về email trong 30–60 phút làm việc.</p>
        </div>
        <div class="how-step-card" style="padding: 0 0 28px 0; overflow: hidden; border: 1px solid var(--gray-border); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="width: 100%; height: 180px; position: relative; margin-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.05);">
            <img src="assets/images/step3.png" alt="Step 3" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="step-n" style="top: auto; bottom: -16px; box-shadow: 0 4px 10px rgba(245,67,10,0.3); border: 3px solid #fff; width: 32px; height: 32px; font-size: 14px;">3</div>
          </div>
          <h4 data-vi="In & gửi hàng" data-en="Print & ship" style="padding: 0 22px;">In & gửi hàng</h4>
          <p data-vi="In label, dán lên kiện hàng rồi drop-off tại bưu điện gần nhất hoặc đặt pickup."
            data-en="Print the label, stick it on the package, then drop it off at the nearest post office or book a pickup." style="padding: 0 22px;">
            In label, dán lên kiện hàng rồi drop-off tại bưu điện gần nhất hoặc đặt pickup.</p>
        </div>
      </div>`;

// Replace ignoring strict whitespaces
let replaced = false;

// Custom replacement using a more flexible method
const startIndex = html.indexOf('<div class="how-panel" id="how-label">');
if (startIndex !== -1) {
    const endStr = '      <div class="how-panel" id="how-mh">';
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
