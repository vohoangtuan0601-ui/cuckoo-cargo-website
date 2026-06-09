/* ═══════════════════════════════════════════════════════════
   CUCKOO CARGO — Language Module (lang.js)
   Nguồn duy nhất cho setLang — load TRƯỚC global.js
   ═══════════════════════════════════════════════════════════ */

(function () {
  // ── State ────────────────────────────────────────────────────
  window.currentLang = localStorage.getItem('cc-lang') || 'vi';

  // ── Helper: apply single translation ────────────────────────
  function applyTrans(el, val) {
    if (!el || val === null || val === undefined) return;
    if (val.includes('<') || val.includes('&')) el.innerHTML = val;
    else el.textContent = val;
  }

  // ── Per-page translation dictionary ─────────────────────────
  // key = CSS selector, value = { vi, en }
  const PAGES = {

    /* ══════════════════════════════════════════════════
       TRANG CHỦ (index.html)
    ══════════════════════════════════════════════════ */
    'index': {
      // Quick calc
      '.calc-label':                   { vi:'⚡ Tính giá nhanh', en:'⚡ Quick Estimate' },

      // Services section
      '.services-section .section-title h2': { vi:'Dịch Vụ <span>Cuckoo Cargo</span>', en:'Cuckoo Cargo <span>Services</span>' },
      '.services-section .section-title p':  { vi:'Giải pháp vận chuyển toàn diện từ Mỹ — uy tín, nhanh chóng, minh bạch', en:'Comprehensive US shipping solutions — trusted, fast, transparent' },

      // How it works
      '.how-section .section-title h2':  { vi:'Quy Trình <span>Đặt Hàng</span>', en:'How It <span>Works</span>' },
      '.how-section .section-title p':   { vi:'Đơn giản — chỉ 3 bước là xong', en:'Simple — just 3 steps' },
      '.how-tabs .how-tab:nth-child(1)': { vi:'📦 Mỹ - Việt',    en:'📦 US - Vietnam' },
      '.how-tabs .how-tab:nth-child(2)': { vi:'🏷️ Label Nội địa', en:'🏷️ Domestic Label' },
      '.how-tabs .how-tab:nth-child(3)': { vi:'🛍️ Mua hộ',       en:'🛍️ Shop For Me' },

      // Why us
      '.why-section .section-title h2': { vi:'Tại Sao Chọn <span>Cuckoo Cargo?</span>', en:'Why Choose <span>Cuckoo Cargo?</span>' },
      '.why-section .section-title p':  { vi:'Chúng tôi không chỉ giao hàng — chúng tôi đồng hành cùng bạn', en:'We don\'t just ship — we partner with you' },

      // Cam kết
      '.camket-badge':         { vi:'🤝 Cam kết của Cuckoo Cargo', en:'🤝 Our Commitments' },
      '.camket-left h2':       { vi:'Chúng tôi<br><span>KHÔNG BAO GIỜ</span><br>làm điều này', en:'We will<br><span>NEVER</span><br>do this' },
      '.camket-left p':        { vi:'Cuckoo Cargo xây dựng uy tín từ sự trung thực. Những cam kết dưới đây là nền tảng mà chúng tôi hoạt động — không phải khẩu hiệu.', en:'Cuckoo Cargo builds trust through honesty. These commitments are our foundation — not just words.' },

      // Tracking preview
      '.tp-left h2':           { vi:'Theo dõi <span>đơn hàng</span><br>24/7', en:'Track your <span>order</span><br>24/7' },
      '.tp-left p':            { vi:'Nhập mã đơn hàng để xem hành trình kiện hàng theo thời gian thực — từ kho Mỹ đến tận tay bạn.', en:'Enter your order code to track your shipment in real time — from the US warehouse to your door.' },
      '.tp-btn':               { vi:'Tra cứu ngay →', en:'Track Now →' },

      // Products section
      '.products-section .section-title h2': { vi:'Sản Phẩm <span>Chính Hãng Mỹ</span>', en:'Authentic <span>US Products</span>' },

      // Blog
      '.blog-section .section-title h2': { vi:'Blog & <span>Hướng Dẫn</span>', en:'Blog & <span>Guides</span>' },
      '.blog-section .section-title p':  { vi:'Kiến thức về gửi hàng, mua hộ, và kinh nghiệm mua sắm tại Mỹ', en:'Shipping tips, personal shopping guides, and US shopping experience' },

      // Newsletter
      '.nl-inner h2': { vi:'Nhận <span>Ưu Đãi</span> Mới Nhất', en:'Get the Latest <span>Deals</span>' },
      '.nl-inner p':  { vi:'Đăng ký nhận thông báo khuyến mãi, mã giảm giá và tin tức dịch vụ mỗi tuần.', en:'Subscribe to receive promotions, discount codes, and weekly service news.' },
      '.nl-inner button': { vi:'Đăng ký →', en:'Subscribe →' },
      '.nl-note':     { vi:'🔒 Không spam. Hủy đăng ký bất kỳ lúc nào.', en:'🔒 No spam. Unsubscribe anytime.' },

      // FAQ
      '.faq-section .section-title h2': { vi:'Câu hỏi <span>Thường Gặp</span>', en:'Frequently Asked <span>Questions</span>' },
      '.faq-section .section-title p':  { vi:'Giải đáp những thắc mắc phổ biến nhất về dịch vụ Cuckoo Cargo', en:'Answers to the most common questions about Cuckoo Cargo services' },
    },

    /* ══════════════════════════════════════════════════
       MỸ - VIỆT (my-ve-viet.html)
    ══════════════════════════════════════════════════ */
    'my-ve-viet': {
      // Pricing section
      '.pricing-section h2':       { vi:'💰 Bảng Giá Gửi Hàng Mỹ - Việt Nam', en:'💰 US to Vietnam Shipping Rates' },
      '.pricing-tables .price-card:first-child .price-card-title': { vi:'📦 Cước vận chuyển (USD/lbs)', en:'📦 Shipping Rate (USD/lbs)' },
      '.pricing-tables .price-card:last-child .price-card-title':  { vi:'🛃 Phụ thu thuế hải quan (nếu có)', en:'🛃 Customs Surcharge (if any)' },

      // Steps bar
      '#ov-1 .snum ~ *': null,

      // Step 1
      '#step-1 .step-badge':      { vi:'👤 Bước 1 / 7', en:'👤 Step 1 / 7' },
      '#step-1 h2':               { vi:'Thông tin người gửi', en:'Sender Information' },
      '#step-1 p':                { vi:'Điền đầy đủ để Cuckoo Cargo liên hệ xác nhận và gửi thông tin vận đơn.', en:'Fill in your details so Cuckoo Cargo can confirm and send shipment info.' },
      'label[for="s1-fb"]':       { vi:'Tên Facebook <span class="req">*</span>', en:'Facebook Name <span class="req">*</span>' },
      'label[for="s1-code"]':     { vi:'Mã khách hàng <span class="hint">(CAC + 4 số)</span>', en:'Customer Code <span class="hint">(CAC + 4 digits)</span>' },
      'label[for="s1-name"]':     { vi:'Họ và tên <span class="req">*</span>', en:'Full Name <span class="req">*</span>' },
      'label[for="s1-phone"]':    { vi:'SĐT tại Mỹ <span class="req">*</span>', en:'US Phone <span class="req">*</span>' },
      'label[for="s1-email"]':    { vi:'Email <span class="req">*</span> <span class="hint">— Nhận xác nhận đơn hàng tại đây</span>', en:'Email <span class="req">*</span> <span class="hint">— Receive order confirmation here</span>' },
      'label[for="s1-addr"]':     { vi:'Địa chỉ tại Mỹ <span class="hint">(địa chỉ kho hoặc nhà)</span>', en:'US Address <span class="hint">(warehouse or home address)</span>' },
      '#step-1 .btn-next':        { vi:'Tiếp theo — Thông tin người nhận →', en:'Next — Receiver Information →' },

      // Step 2
      '#step-2 .step-badge':      { vi:'📍 Bước 2 / 7', en:'📍 Step 2 / 7' },
      '#step-2 h2':               { vi:'Thông tin người nhận tại Việt Nam', en:'Receiver Information in Vietnam' },
      '#step-2 p':                { vi:'Địa chỉ người nhận phải chính xác. Cuckoo Cargo sẽ liên hệ người nhận trước khi giao hàng.', en:'Receiver address must be accurate. Cuckoo Cargo will contact the receiver before delivery.' },
      'label[for="s2-name"]':     { vi:'Họ và tên người nhận <span class="req">*</span>', en:'Receiver Full Name <span class="req">*</span>' },
      'label[for="s2-phone"]':    { vi:'SĐT tại Việt Nam <span class="req">*</span>', en:'Vietnam Phone <span class="req">*</span>' },
      'label[for="s2-province"]': { vi:'Tỉnh / Thành phố <span class="req">*</span>', en:'Province / City <span class="req">*</span>' },
      'label[for="s2-ward"]':     { vi:'Phường / Xã <span class="req">*</span>', en:'Ward / Commune <span class="req">*</span>' },
      'label[for="s2-street"]':   { vi:'Số nhà, tên đường <span class="req">*</span>', en:'House number, street name <span class="req">*</span>' },
      '#step-2 .btn-next':        { vi:'Tiếp theo — Thông tin hàng hóa →', en:'Next — Package Information →' },

      // Step 3
      '#step-3 .step-badge':      { vi:'📦 Bước 3 / 7', en:'📦 Step 3 / 7' },
      '#step-3 h2':               { vi:'Thông tin hàng hóa', en:'Package Information' },
      '#step-3 p':                { vi:'Khai báo trung thực để tránh vấn đề thông quan. Không cần chính xác tuyệt đối.', en:'Declare honestly to avoid customs issues. No need to be exact.' },
      'label[for="s3-items"]':    { vi:'Mặt hàng bên trong <span class="hint">— Mô tả sơ lược (không bắt buộc liệt kê đầy đủ)</span>', en:'Items inside <span class="hint">— Brief description (no need to list everything)</span>' },
      'label[for="s3-weight"]':   { vi:'Cân nặng ước tính (lbs) <span class="hint">— Không bắt buộc</span>', en:'Estimated weight (lbs) <span class="hint">— Optional</span>' },
      'label[for="s3-note"]':     { vi:'Ghi chú đặc biệt', en:'Special notes' },
      '#step-3 .btn-next':        { vi:'Tiếp theo — Chính sách →', en:'Next — Policies →' },

      // Step 4
      '#step-4 .step-badge':      { vi:'⚖️ Bước 4 / 7', en:'⚖️ Step 4 / 7' },
      '#step-4 h2':               { vi:'Xác nhận chính sách', en:'Confirm Policies' },
      '#step-4 p':                { vi:'Vui lòng đọc kỹ và tick vào tất cả các mục bên dưới để tiếp tục.', en:'Please read carefully and check all boxes below to continue.' },
      '.policy-title':            { vi:'📋 Điều khoản gửi hàng Cuckoo Cargo', en:'📋 Cuckoo Cargo Shipping Terms' },
      '#btn-next-4':              { vi:'Đồng ý & Tiếp theo →', en:'Agree & Continue →' },

      // Step 5
      '#step-5 .step-badge':      { vi:'🛡️ Bước 5 / 7', en:'🛡️ Step 5 / 7' },
      '#step-5 h2':               { vi:'Chọn gói bảo hiểm', en:'Choose Insurance Plan' },
      '#step-5 p':                { vi:'Bảo hiểm bảo vệ hàng hóa trong trường hợp mất, hư hỏng do lỗi vận chuyển.', en:'Insurance protects your goods in case of loss or shipping damage.' },
      '#step-5 .btn-next':        { vi:'Tiếp theo — Chọn đóng gói →', en:'Next — Choose Packaging →' },

      // Step 6
      '#step-6 .step-badge':      { vi:'📦 Bước 6 / 7', en:'📦 Step 6 / 7' },
      '#step-6 h2':               { vi:'Chọn cách đóng gói', en:'Choose Packaging' },
      '#step-6 p':                { vi:'Đóng gói kỹ giúp bảo vệ hàng trong suốt hành trình dài từ Mỹ về Việt Nam.', en:'Proper packaging protects your goods during the long journey from the US to Vietnam.' },
      '#step-6 .btn-next':        { vi:'Tiếp theo — Xem tóm tắt →', en:'Next — View Summary →' },

      // Step 7
      '#step-7 .step-badge':      { vi:'✅ Bước 7 / 7', en:'✅ Step 7 / 7' },
      '#step-7 h2':               { vi:'Xác nhận & Gửi đơn', en:'Confirm & Submit' },
      '#step-7 p':                { vi:'Kiểm tra lại thông tin và nhấn xác nhận. Cuckoo Cargo sẽ liên hệ &amp; gửi QR thanh toán qua Zelle.', en:'Review your information and click confirm. Cuckoo Cargo will contact you and send a Zelle payment QR.' },
      '.summary-title':           { vi:'📋 Tóm tắt đơn hàng', en:'📋 Order Summary' },
      '.pay-notice-title':        { vi:'💳 Thanh toán', en:'💳 Payment' },
      '.pay-method-title':        { vi:'🔄 Chọn phương thức thanh toán', en:'🔄 Choose Payment Method' },
      '#step-7 .btn-next':        { vi:'Xem tóm tắt & Xác nhận →', en:'Review & Confirm →' },
      '#step-7 .btn-back':        { vi:'← Chỉnh sửa', en:'← Edit' },

      // Sidebar
      '.sidebar-card .sc-title':  { vi:'⭐ Tại sao chọn Cuckoo Cargo?', en:'⭐ Why Choose Cuckoo Cargo?' },

      // Label popup
      '.popup-header h2':         { vi:'Bạn đã sẵn sàng gửi hàng về Việt Nam?', en:'Ready to ship to Vietnam?' },
      '.popup-question':          { vi:'Bạn đã có <span>label nội địa Mỹ</span> và gửi hàng lên kho Cuckoo Cargo chưa?', en:'Do you already have a <span>US domestic label</span> and shipped to Cuckoo Cargo warehouse?' },
      '.popup-btn-book':          { vi:'🏷️ Chưa có — Đặt label nội địa ngay', en:'🏷️ Not yet — Book a Domestic Label' },
      '.popup-btn-skip':          { vi:'✅ Rồi — Tiếp tục tạo đơn Mỹ - Việt Nam', en:'✅ Yes — Continue to create order' },
    },

    /* ══════════════════════════════════════════════════
       LABEL NỘI ĐỊA (noi-dia-my.html)
    ══════════════════════════════════════════════════ */
    'noi-dia-my': {
      // Mode selector
      '.mode-label':               { vi:'CHỌN LOẠI DỊCH VỤ', en:'SELECT SERVICE TYPE' },
      '#mode-xuyen .mode-info strong': { vi:'Xuyên bang Mỹ', en:'Cross-State Shipping' },
      '#mode-xuyen .mode-info span':   { vi:'Gửi hàng từ địa điểm của bạn đến bất kỳ tiểu bang nào tại Mỹ', en:'Ship from your location to any US state' },
      '#mode-kho .mode-info strong':   { vi:'Gửi hàng lên kho Cuckoo Cargo', en:'Ship to Cuckoo Cargo Warehouse' },
      '#mode-kho .mode-info span':     { vi:'Gửi kiện hàng đến kho Cuckoo Cargo tại Garden Grove, CA trước khi ship về Việt Nam', en:'Ship packages to Cuckoo Cargo warehouse in Garden Grove, CA before shipping to Vietnam' },

      // Pricing section
      '.pricing-section .section-title h2': { vi:'📊 Bảng Giá <span>Chi Tiết</span>', en:'📊 <span>Detailed</span> Pricing' },
      '.pricing-section .section-title p':  { vi:'Giá đã bao gồm phí dịch vụ Cuckoo Cargo · Phí cố định cho ≤10 lbs · Tính theo $/lbs cho đơn nặng hơn', en:'Price includes Cuckoo Cargo service fee · Flat fee for ≤10 lbs · Per $/lbs for heavier orders' },

      // Form section
      '.form-section-inner > .form-card:first-child .form-card-header h3': { vi:'Thông tin người gửi', en:'Sender Information' },
      '#recv-card-title':          { vi:'Thông tin người nhận', en:'Receiver Information' },
      '.form-card-header h3':      null, // skip generic

      // Sender form labels
      'label[for="f-fbname"]':     { vi:'Tên Facebook <span class="req">*</span>', en:'Facebook Name <span class="req">*</span>' },
      'label[for="f-code"]':       { vi:'Mã khách hàng <span class="hint">(CAC + 4 số)</span>', en:'Customer Code <span class="hint">(CAC + 4 digits)</span>' },
      'label[for="f-name"]':       { vi:'Họ tên <span class="req">*</span>', en:'Full Name <span class="req">*</span>' },
      'label[for="f-phone"]':      { vi:'SĐT Mỹ <span class="req">*</span>', en:'US Phone <span class="req">*</span>' },
      'label[for="f-email"]':      { vi:'Email <span class="req">*</span> <span class="hint">— Label gửi về đây</span>', en:'Email <span class="req">*</span> <span class="hint">— Label sent here</span>' },
      'label[for="f-addr"]':       { vi:'Địa chỉ người gửi <span class="req">*</span>', en:'Sender Address <span class="req">*</span>' },

      // Pickup
      '#opt-dropoff .opt-name':    { vi:'Drop-off', en:'Drop-off' },
      '#opt-dropoff .opt-sub':     { vi:'Tự mang đến bưu điện — Miễn phí', en:'Bring to post office — Free' },
      '#opt-pickup .opt-name':     { vi:'Pick-up', en:'Pick-up' },
      '.ts-label':                 { vi:'⏰ Chọn khung giờ pick-up (giờ Mỹ)', en:'⏰ Choose pick-up time (US time)' },

      // Package
      '.pkg-table th:nth-child(1)': { vi:'Package', en:'Package' },
      '.pkg-table th:nth-child(2)': { vi:'Cân nặng (lbs) *', en:'Weight (lbs) *' },
      '.pkg-table th:nth-child(3)': { vi:'Giá trị ($)', en:'Value ($)' },
      '.add-pkg-btn':              { vi:'+ Thêm kiện hàng', en:'+ Add Package' },
      '.pe-title':                 { vi:'DỰ TÍNH GIÁ LABEL', en:'ESTIMATED LABEL PRICE' },
      '.pe-note':                  { vi:'✅ Cuckoo Cargo cam kết label chính hãng. Chi phí sẽ được thông báo qua Messenger / Zalo.', en:'✅ Cuckoo Cargo guarantees authentic labels. Cost will be confirmed via Messenger / Zalo.' },

      // Insurance
      '#ins-toggle .opt-label strong': { vi:'Mua bảo hiểm hàng hóa', en:'Purchase Cargo Insurance' },
      '#ins-toggle .opt-label span':   { vi:'Bảo vệ kiện hàng trong trường hợp mất mát hoặc hư hỏng', en:'Protect your package against loss or damage' },
      '#sig-toggle .opt-label strong': { vi:'Yêu cầu chữ ký khi giao hàng', en:'Signature Required on Delivery' },
      '#sig-toggle .opt-label span':   { vi:'Signature Required — Người nhận phải ký xác nhận khi nhận kiện', en:'Signature Required — Recipient must sign upon delivery' },

      // Submit
      '#btn-review': { vi:'Xem tóm tắt & Xác nhận label', en:'Review & Confirm Label' },

      // Review sheet
      '.review-title':             { vi:'📋 Xác nhận thông tin label', en:'📋 Confirm Label Information' },
      '.review-note':              { vi:'✅ Cuckoo Cargo cam kết label chính hãng. Chúng tôi sẽ thông báo chi phí trực tiếp qua Messenger và Zalo — thanh toán chuyển khoản trực tiếp trên đó.', en:'✅ Cuckoo Cargo guarantees authentic labels. We will notify the cost via Messenger and Zalo — payment directly there.' },
      '.btn-edit':                 { vi:'✏️ Sửa thông tin', en:'✏️ Edit Information' },
      '#btn-confirm':              { vi:'✅ Xác nhận & Gửi đơn', en:'✅ Confirm & Submit' },
    },

    /* ══════════════════════════════════════════════════
       MUA HỘ (mua-ho.html)
    ══════════════════════════════════════════════════ */
    'mua-ho': {
      // How it works
      '.section-title h2':         null, // skip generic
      '.steps-grid .step-card:nth-child(1) h4': { vi:'Gửi link / yêu cầu', en:'Send link / request' },
      '.steps-grid .step-card:nth-child(1) p':  { vi:'Điền form hoặc nhắn link sản phẩm qua Zalo / Messenger', en:'Fill the form or send product link via Zalo / Messenger' },
      '.steps-grid .step-card:nth-child(2) h4': { vi:'Xác nhận giá & phí', en:'Confirm price & fee' },
      '.steps-grid .step-card:nth-child(2) p':  { vi:'Cuckoo Cargo báo tổng giá (hàng + phí mua hộ 5% + ship) trong 24h', en:'Cuckoo Cargo will quote total price (item + 5% fee + ship) within 24h' },
      '.steps-grid .step-card:nth-child(3) h4': { vi:'Thanh toán', en:'Payment' },
      '.steps-grid .step-card:nth-child(3) p':  { vi:'Thanh toán qua USD (Zelle) hoặc VND (chuyển khoản) — nhận mã đơn ngay', en:'Pay via USD (Zelle) or VND (bank transfer) — get order code immediately' },
      '.steps-grid .step-card:nth-child(4) h4': { vi:'Mua & kiểm hàng', en:'Purchase & inspect' },
      '.steps-grid .step-card:nth-child(4) p':  { vi:'Cuckoo Cargo mua hàng, chụp ảnh thực tế, đóng gói cẩn thận', en:'Cuckoo Cargo purchases, photos actual items, careful packaging' },
      '.steps-grid .step-card:nth-child(5) h4': { vi:'Giao tận tay', en:'Home delivery' },
      '.steps-grid .step-card:nth-child(5) p':  { vi:'Ship về Việt Nam trong 7–15 ngày. Giao tận nhà toàn quốc.', en:'Ships to Vietnam in 7–15 days. Nationwide home delivery.' },

      // Fee section
      '.fee-calc-title':           { vi:'🧮 Tính phí nhanh', en:'🧮 Quick Fee Calculator' },
      '.fee-result-lbl':           { vi:'Phí mua hộ (5%)', en:'Shopping fee (5%)' },

      // Form section title
      '#dat-hang .section-title h2': { vi:'Đặt hàng <span>mua hộ</span>', en:'Place <span>Shopping Order</span>' },
      '#dat-hang .section-title p':  { vi:'Điền form — Cuckoo Cargo liên hệ xác nhận trong 24h', en:'Fill the form — Cuckoo Cargo confirms within 24h' },

      // Form card headers
      'label[for="fb-name"]':      { vi:'Tên Facebook / Zalo <span class="req">*</span>', en:'Facebook / Zalo Name <span class="req">*</span>' },
      'label[for="full-name"]':    { vi:'Họ và tên <span class="req">*</span>', en:'Full Name <span class="req">*</span>' },
      'label[for="phone"]':        { vi:'Số điện thoại <span class="req">*</span>', en:'Phone Number <span class="req">*</span>' },
      'label[for="email"]':        { vi:'Email <span class="req">*</span>', en:'Email <span class="req">*</span>' },
      'label[for="recv-name"]':    { vi:'Tên người nhận <span class="req">*</span>', en:'Receiver Name <span class="req">*</span>' },
      'label[for="recv-phone"]':   { vi:'SĐT người nhận <span class="req">*</span>', en:'Receiver Phone <span class="req">*</span>' },
      'label[for="recv-street"]':  { vi:'Số nhà, tên đường <span class="req">*</span>', en:'House number, street <span class="req">*</span>' },
      'label[for="notes"]':        { vi:'Ghi chú đặc biệt', en:'Special notes' },
      'label[for="referral"]':     { vi:'Bạn biết đến Cuckoo Cargo qua đâu?', en:'How did you hear about us?' },

      // Item list header
      '#item-list ~ * .add-pkg-btn, .btn-add-item': { vi:'+ Thêm sản phẩm', en:'+ Add Product' },

      // Submit
      '#btn-review':               { vi:'Xem tóm tắt & Xác nhận đặt hàng', en:'Review & Confirm Order' },

      // Review sheet
      '.review-title':             { vi:'📋 Xác nhận đơn hàng mua hộ', en:'📋 Confirm Shopping Order' },
      '.btn-confirm-mh':           { vi:'✅ Xác nhận & Gửi đơn', en:'✅ Confirm & Submit' },

      // Sidebar
      '.sidebar-card h4':          null,
    },

    /* ══════════════════════════════════════════════════
       TRA CỨU (tracking.html)
    ══════════════════════════════════════════════════ */
    'tracking': {
      '#tk-btn': { vi:'🔍 Tra cứu', en:'🔍 Search' },
      '.section-title h2':         { vi:'Câu hỏi thường gặp', en:'Frequently Asked Questions' },
      '.section-title p':          { vi:'Về tra cứu và theo dõi đơn hàng', en:'About tracking and monitoring your orders' },
      '.other-services ~ .section-title h2': null,
    },
  };

  // ── Detect current page ──────────────────────────────────────
  function getPageId() {
    const p = window.location.pathname;
    if (p.includes('my-ve-viet'))  return 'my-ve-viet';
    if (p.includes('noi-dia-my'))  return 'noi-dia-my';
    if (p.includes('mua-ho'))      return 'mua-ho';
    if (p.includes('tracking'))    return 'tracking';
    if (p.includes('index') || p === '/' || p.endsWith('/') || p.endsWith('.io')) return 'index';
    return 'other';
  }

  // ── Core setLang ─────────────────────────────────────────────
  window.setLang = function (lang) {
    window.currentLang = lang;
    localStorage.setItem('cc-lang', lang);

    // 1. Button active states
    document.querySelectorAll('.lang-btn, .cc-lang-btn').forEach(b => {
      const oc = b.getAttribute('onclick') || '';
      b.classList.toggle('active', oc.includes("'" + lang + "'"));
    });

    // 2. All [data-vi] / [data-en] elements
    document.querySelectorAll('[data-vi]').forEach(el => {
      const val = lang === 'vi'
        ? el.getAttribute('data-vi')
        : (el.getAttribute('data-en') || el.getAttribute('data-vi'));
      applyTrans(el, val);
    });

    // 3. Placeholders
    document.querySelectorAll('[data-vi-placeholder]').forEach(el => {
      el.placeholder = lang === 'vi'
        ? el.getAttribute('data-vi-placeholder')
        : (el.getAttribute('data-en-placeholder') || el.getAttribute('data-vi-placeholder'));
    });

    // 4. Per-page dictionary
    const dict = PAGES[getPageId()] || {};
    Object.entries(dict).forEach(([sel, trans]) => {
      if (!trans) return;
      document.querySelectorAll(sel).forEach(el => {
        applyTrans(el, lang === 'vi' ? trans.vi : (trans.en || trans.vi));
      });
    });

    // 5. HTML lang
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
  };

  // ── Mobile nav toggle ────────────────────────────────────────
  window.toggleMobileNav = function () {
    const links = document.getElementById('cc-nav-links') ||
                  document.querySelector('.nav-links');
    if (links) links.classList.toggle('open');
  };

  // ── Auto-apply on DOM ready ──────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    window.setLang(window.currentLang);

    document.addEventListener('click', function (e) {
      const nav    = document.getElementById('cc-nav-links') || document.querySelector('.nav-links');
      const toggle = document.querySelector('.cc-mobile-toggle, .mobile-nav-toggle');
      if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  });

})();
