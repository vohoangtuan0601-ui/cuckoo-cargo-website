const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The Why Us section
html = html.replace(/Tại sao chọn <span>Cuckoo Cargo\?<\/span>/g, 'Tại Sao Chọn <span>Cuckoo Cargo?</span>');

html = html.replace(/<h4 data-vi="Uy tín và Trách nhiệm"[^>]*>.*?<\/h4>/, '<h4 data-vi="Giao hàng 7-10 ngày">Giao hàng 7-10 ngày</h4>');
html = html.replace(/<p data-vi="Cuckoo Cargo xây dựng uy tín từ chất lượng dịch vụ thực tế, không phải khẩu hiệu\."[^>]*>.*?<\/p>/, '<p data-vi="Cam kết thời gian giao hàng chuẩn xác.">Cam kết thời gian giao hàng chuẩn xác.</p>');

html = html.replace(/<h4 data-vi="Hỗ trợ 24\/7"[^>]*>.*?<\/h4>/, '<h4 data-vi="Bảo hiểm đầy đủ">Bảo hiểm đầy đủ</h4>');
html = html.replace(/<p data-vi="Không tìm thấy câu trả lời\? Đội ngũ Cuckoo Cargo hỗ trợ 7 ngày\/tuần\."[^>]*>.*?<\/p>/, '<p data-vi="Hoàn tiền 100% nếu thất lạc hàng hóa.">Hoàn tiền 100% nếu thất lạc hàng hóa.</p>');

html = html.replace(/<h4 data-vi="Giá Cước Cạnh Tranh"[^>]*>.*?<\/h4>/, '<h4 data-vi="50 Tiểu bang phủ sóng">50 Tiểu bang phủ sóng</h4>');
html = html.replace(/<p data-vi="Phí vận chuyển minh bạch, tiết kiệm tối đa, không phát sinh chi phí ẩn\."[^>]*>.*?<\/p>/, '<p data-vi="Nhận hàng từ mọi nơi trên toàn nước Mỹ.">Nhận hàng từ mọi nơi trên toàn nước Mỹ.</p>');

html = html.replace(/<h4 data-vi="Giao Hàng Nhanh Chóng"[^>]*>.*?<\/h4>/, '<h4 data-vi="Hỗ trợ tiếng Việt">Hỗ trợ tiếng Việt</h4>');
html = html.replace(/<p data-vi="Chỉ từ 7-10 ngày kể từ khi nhập kho Cuckoo Cargo tại Mỹ\. Thời gian được đảm bảo\."[^>]*>.*?<\/p>/, '<p data-vi="Đội ngũ CSKH người Việt sẵn sàng hỗ trợ 24/7.">Đội ngũ CSKH người Việt sẵn sàng hỗ trợ 24/7.</p>');

html = html.replace(/<h4 data-vi="Bảo Hiểm An Toàn"[^>]*>.*?<\/h4>/, '<h4 data-vi="Hỗ trợ đóng gói">Hỗ trợ đóng gói</h4>');
html = html.replace(/<p data-vi="Cung cấp 4 gói bảo hiểm linh hoạt, bồi thường lên đến 100% giá trị hàng hóa\."[^>]*>.*?<\/p>/, '<p data-vi="Miễn phí tư vấn và hỗ trợ đóng gói chuẩn quốc tế.">Miễn phí tư vấn và hỗ trợ đóng gói chuẩn quốc tế.</p>');

html = html.replace(/<h4 data-vi="Cập Nhật Tự Động"[^>]*>.*?<\/h4>/, '<h4 data-vi="Tracking minh bạch">Tracking minh bạch</h4>');
html = html.replace(/<p data-vi="Cuckoo Cargo cập nhật trạng thái đơn hàng qua Zalo\/Email liên tục suốt hành trình\."[^>]*>.*?<\/p>/, '<p data-vi="Theo dõi lộ trình hàng hóa 24/7.">Theo dõi lộ trình hàng hóa 24/7.</p>');

fs.writeFileSync('index.html', html);
console.log('Fixed Why Us section properly!');
