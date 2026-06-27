const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Section 1: Dịch Vụ Cuckoo Cargo
// Card 1
html = html.replace(/<div class="service-card-title"[^>]*>.*?<\/div>/, '<div class="service-card-title" data-vi="Mỹ - Việt Nam" data-en="US - Vietnam">Mỹ - Việt Nam</div>');
html = html.replace(/<span data-vi="Gửi link Amazon, Walmart, Target\.\.\.".*?<\/span>/, '<span data-vi="Giao hàng tận nhà tại Việt Nam" data-en="Home delivery in Vietnam">Giao hàng tận nhà tại Việt Nam</span>');
html = html.replace(/<span data-vi="Nhận báo giá trong vòng 24h".*?<\/span>/, '<span data-vi="Tracking thời gian thực" data-en="Real-time tracking">Tracking thời gian thực</span>');
html = html.replace(/<span data-vi="Gom nhiều đơn, ship về cùng lúc".*?<\/span>/, '<span data-vi="Nhận label trong 30-60 phút" data-en="Receive label in 30-60 mins">Nhận label trong 30-60 phút</span>');

// Card 2
html = html.replace(/<div class="service-card-title"[^>]*>.*?<\/div>/, '<div class="service-card-title" data-vi="Label Nội địa Mỹ" data-en="US Domestic Label">Label Nội địa Mỹ</div>');
html = html.replace(/<span data-vi="Cuckoo Cargo xử lý và gửi file".*?<\/span>/, '<span data-vi="FedEx & USPS free pickup" data-en="FedEx & USPS free pickup">FedEx & USPS free pickup</span>');
html = html.replace(/<span data-vi="Nhận label PDF sẵn sàng in".*?<\/span>/, '<span data-vi="Tiết kiệm 3-4 lần so với giá lẻ." data-en="Save 3-4 times compared to retail.">Tiết kiệm 3-4 lần so với giá lẻ.</span>');
html = html.replace(/<span data-vi="Thanh toán linh hoạt".*?<\/span>/, '<span data-vi="Từ $3.49 /lbs" data-en="From $3.49 /lbs">Từ $3.49 /lbs</span>');

// Card 3
html = html.replace(/<div class="service-card-title"[^>]*>.*?<\/div>/, '<div class="service-card-title" data-vi="Mua hộ hàng Mỹ" data-en="Shop For Me US">Mua hộ hàng Mỹ</div>');
html = html.replace(/<span data-vi="Cuckoo Cargo kiểm tra và báo giá".*?<\/span>/, '<span data-vi="Gửi link Amazon, Walmart, Target..." data-en="Send link Amazon, Walmart, Target...">Gửi link Amazon, Walmart, Target...</span>');
html = html.replace(/<span data-vi="Thanh toán đơn giản".*?<\/span>/, '<span data-vi="Gom nhiều đơn, ship về cùng lúc" data-en="Consolidate orders, ship together">Gom nhiều đơn, ship về cùng lúc</span>');
html = html.replace(/<span data-vi="Nhận hàng nhanh chóng".*?<\/span>/, '<span data-vi="Thanh toán sau khi có báo giá" data-en="Pay after getting quote">Thanh toán sau khi có báo giá</span>');
html = html.replace(/<span data-vi="Tư vấn 24\/7".*?<\/span>/, '<span data-vi="7-10 ngày giao hàng" data-en="7-10 days delivery">7-10 ngày giao hàng</span>');


// Section 2: Quy Trình Đặt Hàng
html = html.replace(/Cách <span>Thức Hoạt Động<\/span>/g, 'Quy Trình <span>Đặt Hàng</span>');
html = html.replace(/How <span>It Works<\/span>/g, 'Order <span>Process</span>');
html = html.replace(/Quy trình đơn giản — chỉ 3 bước là xong/g, 'Đơn giản — chỉ 3 bước là xong');
html = html.replace(/A simple process — just 3 steps/g, 'Simple — just 3 steps');


// Section 3: Tại Sao Chọn
html = html.replace(/Tại sao chọn Cuckoo Cargo\?/g, 'Tại Sao Chọn Cuckoo Cargo?');

// Card 1
html = html.replace(/Uy tín và Trách nhiệm/g, 'Giao hàng 7-10 ngày');
html = html.replace(/Cuckoo Cargo xây dựng uy tín từ chất lượng dịch vụ thực tế, không phải khẩu hiệu\./g, 'Cam kết thời gian giao hàng chuẩn xác.');

// Card 2
html = html.replace(/Hỗ trợ 24\/7/g, 'Bảo hiểm đầy đủ');
html = html.replace(/Không tìm thấy câu trả lời\? Đội ngũ Cuckoo Cargo hỗ trợ 7 ngày\/tuần\./g, 'Hoàn tiền 100% nếu thất lạc hàng hóa.');

// Card 3
html = html.replace(/Giá Cước Cạnh Tranh/g, '50 Tiểu bang phủ sóng');
html = html.replace(/Phí vận chuyển minh bạch, tiết kiệm tối đa, không phát sinh chi phí ẩn\./g, 'Nhận hàng từ mọi nơi trên toàn nước Mỹ.');

// Card 4
html = html.replace(/Giao Hàng Nhanh Chóng/g, 'Hỗ trợ tiếng Việt');
html = html.replace(/Chỉ từ 7-10 ngày kể từ khi nhập kho Cuckoo Cargo tại Mỹ\. Thời gian được đảm bảo\./g, 'Đội ngũ CSKH người Việt sẵn sàng hỗ trợ 24/7.');

// Card 5
html = html.replace(/Bảo Hiểm An Toàn/g, 'Hỗ trợ đóng gói');
html = html.replace(/Cung cấp 4 gói bảo hiểm linh hoạt, bồi thường lên đến 100% giá trị hàng hóa\./g, 'Miễn phí tư vấn và hỗ trợ đóng gói chuẩn quốc tế.');

// Card 6
html = html.replace(/Cập Nhật Tự Động/g, 'Tracking minh bạch');
html = html.replace(/Cuckoo Cargo cập nhật trạng thái đơn hàng qua Zalo\/Email liên tục suốt hành trình\./g, 'Theo dõi lộ trình hàng hóa 24/7.');

// Section 4: Sản Phẩm Chính Hãng Mỹ
html = html.replace(/Sản Phẩm <span>Nổi Bật<\/span>/g, 'Sản Phẩm <span>Chính Hãng Mỹ</span>');
html = html.replace(/Featured <span>Products<\/span>/g, 'US <span>Authentic Products</span>');

// Section 5: Blog
html = html.replace(/Bài Viết <span>Mới Nhất<\/span>/g, 'Blog & <span>Hướng Dẫn</span>');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html!');

// ALSO APPLY TO THE 5 SUBPAGES
const subpages = ['my-ve-viet.html', 'noi-dia-my.html', 'mua-ho.html', 'tracking.html', 'san-pham.html'];
subpages.forEach(p => {
  let phtml = fs.readFileSync(p, 'utf8');
  // Copy the <main> part from index to subpage to ensure they are identical and have no ? marks
  const mainStart = html.indexOf('<main>');
  const mainEnd = html.indexOf('</main>') + 7;
  const newMain = html.substring(mainStart, mainEnd);
  
  const pMainStart = phtml.indexOf('<main>');
  const pMainEnd = phtml.indexOf('</main>') + 7;
  
  if (pMainStart > -1 && pMainEnd > -1) {
     phtml = phtml.substring(0, pMainStart) + newMain + phtml.substring(pMainEnd);
     fs.writeFileSync(p, phtml);
  }
});

console.log('Done fixing subpages!');
