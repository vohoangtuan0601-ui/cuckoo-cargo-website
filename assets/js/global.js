/* 
 CUCKOO CARGO — Global JavaScript
 Dùng chung cho tất cả trang: Nav, Lang, Toast, Sheets API
 */

// CONFIG 
const CC_CONFIG = {
 // Cập nhật sau khi deploy Google Apps Script
 SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzWC98zadzy6S1bi_C53kdguSGjFrD-ipJRTAlVJlCpq28_3C9ZoH5Mb-RBlKTP1lER/exec",

 // Thông tin liên hệ — cập nhật tại đây, tự động áp dụng toàn site
 PHONE: "+1 (714) 398-4817",
 FACEBOOK: "https://www.facebook.com/61582783740459/",
 ZALO: "https://zalo.me/cuckoocargo",
 TIKTOK: "https://www.tiktok.com/@cuckoo.cargo6",
 EMAIL: "cuckoocargo.us@gmail.com",

 // Thông tin thanh toán QR
 BANK_NAME: "[Tên ngân hàng]", // VD: Vietcombank
 BANK_ACC: "[Số tài khoản]", // VD: 1234567890
 BANK_OWNER: "CUCKOO CARGO",
};

// NAV: Inject chung cho tất cả trang 
function injectNav(activePage = '') {
 const nav = document.getElementById('cc-nav');
 if (!nav) return;

 const links = [
 { href: 'index.html', vi: 'Trang chủ', en: 'Home', id: 'home' },
 { href: 'my-ve-viet.html', vi: 'Mỹ về Việt', en: 'US to Vietnam',id: 'mvv' },
 { href: 'noi-dia-my.html', vi: 'Label Nội địa', en: 'Domestic Label',id: 'ndm' },
 { href: 'mua-ho.html', vi: 'Mua hộ', en: 'Shop For Me', id: 'mh' },
 { href: 'tracking.html', vi: 'Tra cứu', en: 'Track Order', id: 'tracking' },
 { href: 'san-pham.html', vi: 'Sản phẩm', en: 'Products', id: 'sp' },
 { href: 'blog.html', vi: 'Blog', en: 'Blog', id: 'blog' },
 ];

 const linksHTML = links.map(l =>
   `<a href="${l.href}" class="${l.id === activePage ? 'active' : ''}" data-vi="${l.vi}" data-en="${l.en}">${l.vi}</a>`
 ).join('');

 nav.innerHTML = `
 <div class="cc-nav-inner">
 <a href="index.html" class="cc-logo">
 <img src="assets/images/logo.png" alt="Cuckoo Cargo" class="cc-logo-img" style="height:36px;width:auto;display:block;" />
 </a>
 <nav class="cc-nav-links" id="cc-nav-links">
 ${linksHTML}
 </nav>
 <div class="cc-nav-right">

 <!-- SEARCH -->
 <div class="cc-search-wrap" id="cc-search-wrap">
 <button class="cc-search-icon-btn" onclick="toggleNavSearch()" aria-label="Tìm kiếm">
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
 </button>
 <div class="cc-search-box" id="cc-search-box">
 <input type="text" id="cc-search-input" placeholder="Tìm dịch vụ, thông tin..." autocomplete="off"
 oninput="doNavSearch(this.value)" onkeydown="if(event.key==='Escape')closeNavSearch()" />
 <div class="cc-search-results" id="cc-search-results"></div>
 </div>
 </div>

 <!-- LANG -->
 <div class="cc-lang">
 <button class="cc-lang-btn active" onclick="setLang('vi')">VN</button>
 <button class="cc-lang-btn" onclick="setLang('en')">EN</button>
 </div>

 <a href="my-ve-viet.html" class="cc-nav-cta" data-vi="Tạo đơn →" data-en="Create Order →">Tạo đơn →</a>

 <!-- HAMBURGER 3 gạch -->
 <button class="cc-mobile-toggle" id="cc-mobile-toggle-btn" onclick="toggleMobileNav()" aria-label="Menu">
 <svg class="cc-hamburger-svg" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
   <rect width="20" height="2" rx="1" fill="currentColor"/>
   <rect y="6" width="20" height="2" rx="1" fill="currentColor"/>
   <rect y="12" width="20" height="2" rx="1" fill="currentColor"/>
 </svg>
 <svg class="cc-close-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none">
   <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
   <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
 </svg>
 </button>
 </div>
 </div>
 `;

 // Áp dụng ngôn ngữ hiện tại vào nav vừa inject
 window.setLang && window.setLang(currentLang);

}

function toggleMobileNav() {
 const links  = document.getElementById('cc-nav-links');
 const btn    = document.getElementById('cc-mobile-toggle-btn');
 const isOpen = links && links.classList.toggle('open');
 if (btn) {
   const ham = btn.querySelector('.cc-hamburger-svg');
   const cls = btn.querySelector('.cc-close-svg');
   if (ham) ham.style.display = isOpen ? 'none'  : 'block';
   if (cls) cls.style.display = isOpen ? 'block' : 'none';
 }
}

// Đóng menu khi click ra ngoài
document.addEventListener('click', function(e) {
 const nav = document.getElementById('cc-nav-links');
 const btn = document.getElementById('cc-mobile-toggle-btn');
 if (nav && nav.classList.contains('open') &&
     !nav.contains(e.target) && btn && !btn.contains(e.target)) {
   nav.classList.remove('open');
   const ham = btn.querySelector('.cc-hamburger-svg');
   const cls = btn.querySelector('.cc-close-svg');
   if (ham) ham.style.display = 'block';
   if (cls) cls.style.display = 'none';
 }
});

// ── SEARCH ──────────────────────────────────────────────────
const CC_SEARCH_INDEX = [
 { title: 'Gửi hàng Mỹ về Việt Nam', desc: 'Dịch vụ gửi hàng quốc tế Mỹ - Việt', url: 'my-ve-viet.html', icon: '✈️', tags: ['mỹ việt', 'gửi hàng', 'quốc tế', 'ship', 'vận chuyển', 'us vietnam'] },
 { title: 'Label Nội địa Mỹ', desc: 'UPS, FedEx, USPS — 50 tiểu bang', url: 'noi-dia-my.html', icon: '📦', tags: ['label', 'nội địa', 'ups', 'fedex', 'usps', 'domestic'] },
 { title: 'Mua hộ hàng Mỹ', desc: 'Amazon, Walmart, Target... giao về Việt Nam', url: 'mua-ho.html', icon: '🛒', tags: ['mua hộ', 'amazon', 'walmart', 'target', 'shop', 'mua'] },
 { title: 'Tra cứu đơn hàng', desc: 'Kiểm tra trạng thái kiện hàng', url: 'tracking.html', icon: '🔍', tags: ['tracking', 'tra cứu', 'đơn hàng', 'trạng thái', 'theo dõi'] },
 { title: 'Sản phẩm', desc: 'Sữa Ensure, dầu gió và hàng Mỹ chính hãng', url: 'san-pham.html', icon: '🛍️', tags: ['sản phẩm', 'ensure', 'dầu gió', 'sữa', 'hàng mỹ'] },
 { title: 'Blog & Hướng dẫn', desc: 'Kinh nghiệm gửi hàng, mẹo vận chuyển', url: 'blog.html', icon: '📝', tags: ['blog', 'hướng dẫn', 'kinh nghiệm', 'tip', 'guide'] },
 { title: 'Liên hệ', desc: 'Zalo, Facebook, Email hỗ trợ', url: 'lien-he.html', icon: '💬', tags: ['liên hệ', 'contact', 'hỗ trợ', 'zalo', 'facebook'] },
 { title: 'Bảng giá vận chuyển', desc: 'Giá cước từ $3.49/lbs', url: 'my-ve-viet.html#pricing', icon: '💰', tags: ['giá', 'bảng giá', 'cước', 'phí', 'price'] },
 { title: 'Điều khoản dịch vụ', desc: 'Chính sách và điều khoản sử dụng', url: 'dieu-khoan.html', icon: '📋', tags: ['điều khoản', 'chính sách', 'terms', 'policy'] },
];

function toggleNavSearch() {
 const wrap  = document.getElementById('cc-search-wrap');
 const input = document.getElementById('cc-search-input');
 if (!wrap) return;
 const isOpen = wrap.classList.toggle('open');
 if (isOpen) {
   setTimeout(() => input && input.focus(), 50);
 } else {
   closeNavSearch();
 }
}

function closeNavSearch() {
 const wrap    = document.getElementById('cc-search-wrap');
 const results = document.getElementById('cc-search-results');
 const input   = document.getElementById('cc-search-input');
 if (wrap)    wrap.classList.remove('open');
 if (results) results.innerHTML = '';
 if (input)   input.value = '';
}

function doNavSearch(q) {
 const results = document.getElementById('cc-search-results');
 if (!results) return;
 const query = q.trim().toLowerCase();
 if (!query) { results.innerHTML = ''; return; }

 const hits = CC_SEARCH_INDEX.filter(item =>
   item.title.toLowerCase().includes(query) ||
   item.desc.toLowerCase().includes(query)  ||
   item.tags.some(t => t.includes(query))
 ).slice(0, 6);

 if (!hits.length) {
   results.innerHTML = `<div class="cc-search-empty">Không tìm thấy kết quả cho "<b>${q}</b>"</div>`;
   return;
 }

 results.innerHTML = hits.map(h => `
   <a href="${h.url}" class="cc-search-item" onclick="closeNavSearch()">
     <span class="cc-search-item-icon">${h.icon}</span>
     <span class="cc-search-item-text">
       <span class="cc-search-item-title">${h.title}</span>
       <span class="cc-search-item-desc">${h.desc}</span>
     </span>
   </a>
 `).join('');
}

// Đóng search khi click ra ngoài
document.addEventListener('click', function(e) {
 const wrap = document.getElementById('cc-search-wrap');
 if (wrap && wrap.classList.contains('open') && !wrap.contains(e.target)) {
   closeNavSearch();
 }
});

// FOOTER: Inject chung 
function injectFooter() {
 const footer = document.getElementById('cc-footer');
 if (!footer) return;

 footer.innerHTML = `
 <div class="cc-footer-inner">
 <div class="cc-footer-brand">
 <div class="logo"><img src="assets/images/logo.png" alt="Cuckoo Cargo" style="height:32px;width:auto;display:block;" /></div>
 <p data-vi="Dịch vụ vận chuyển Mỹ – Việt uy tín.<br>Label nội địa 50 tiểu bang. Mua hộ hàng Mỹ."
 data-en="Trusted US–Vietnam shipping.<br>Domestic labels all 50 states. Personal shopping.">
 Dịch vụ vận chuyển Mỹ – Việt uy tín.<br>Label nội địa 50 tiểu bang. Mua hộ hàng Mỹ.
 </p>
 <div class="cc-footer-socials">
 <a href="${CC_CONFIG.FACEBOOK}" target="_blank" class="cc-footer-social" aria-label="Facebook">
   <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
 </a>
 <a href="${CC_CONFIG.ZALO}" target="_blank" class="cc-footer-social cc-footer-social-zalo" aria-label="Zalo">
   <span style="font-size:11px;font-weight:900;letter-spacing:-0.5px;color:#fff;">Zalo</span>
 </a>
 <a href="${CC_CONFIG.TIKTOK}" target="_blank" class="cc-footer-social" aria-label="TikTok">
   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
 </a>
 </div>
 </div>
 <div class="cc-footer-col">
 <h4 data-vi="Dịch vụ" data-en="Services">Dịch vụ</h4>
 <ul>
 <li><a href="my-ve-viet.html" data-vi="Mỹ về Việt Nam" data-en="US to Vietnam">Mỹ về Việt Nam</a></li>
 <li><a href="noi-dia-my.html" data-vi="Label Nội địa Mỹ" data-en="US Domestic Label">Label Nội địa Mỹ</a></li>
 <li><a href="mua-ho.html" data-vi="Mua hộ hàng Mỹ" data-en="Shop For Me">Mua hộ hàng Mỹ</a></li>
 <li><a href="san-pham.html" data-vi="Sản phẩm" data-en="Products">Sản phẩm</a></li>
 </ul>
 </div>
 <div class="cc-footer-col">
 <h4 data-vi="Hỗ trợ" data-en="Support">Hỗ trợ</h4>
 <ul>
 <li><a href="tracking.html" data-vi="Tra cứu đơn hàng" data-en="Track Order">Tra cứu đơn hàng</a></li>
 <li><a href="blog.html" data-vi="Blog & Hướng dẫn" data-en="Blog & Guides">Blog & Hướng dẫn</a></li>
 <li><a href="lien-he.html" data-vi="Liên hệ" data-en="Contact">Liên hệ</a></li>
 <li><a href="dieu-khoan.html" data-vi="Điều khoản dịch vụ" data-en="Terms of Service">Điều khoản dịch vụ</a></li>
 </ul>
 </div>
 <div class="cc-footer-col">
 <h4 data-vi="Liên hệ" data-en="Contact">Liên hệ</h4>
 <ul>
 <li><a href="tel:${CC_CONFIG.PHONE}">${CC_CONFIG.PHONE}</a></li>
 <li><a href="${CC_CONFIG.FACEBOOK}" target="_blank" data-vi="Facebook Messenger" data-en="Facebook Messenger">Facebook Messenger</a></li>
 <li><a href="${CC_CONFIG.ZALO}" target="_blank">Zalo</a></li>
 <li><a href="mailto:${CC_CONFIG.EMAIL}">${CC_CONFIG.EMAIL}</a></li>
 </ul>
 </div>
 </div>
 <div class="cc-footer-bottom">
 <span data-vi="© 2026 Cuckoo Cargo. All rights reserved." data-en="© 2026 Cuckoo Cargo. All rights reserved.">© 2026 Cuckoo Cargo. All rights reserved.</span>
 <span><a href="#" data-vi="Chính sách bảo mật" data-en="Privacy Policy">Chính sách bảo mật</a> · <a href="#" data-vi="Điều khoản" data-en="Terms">Điều khoản</a></span>
 </div>
 `;

 // Áp dụng ngôn ngữ hiện tại vào footer vừa inject
 window.setLang && window.setLang(currentLang);
}

// LANGUAGE 
// setLang được cung cấp bởi lang.js (load trước global.js)
// global.js KHÔNG định nghĩa lại setLang để tránh ghi đè từ điển dịch
let currentLang = localStorage.getItem('cc-lang') || 'vi';

// TOAST 
function showToast(type = 'info', message = '', duration = 5000) {
 let toast = document.getElementById('cc-toast');
 if (!toast) {
 toast = document.createElement('div');
 toast.id = 'cc-toast';
 toast.className = 'cc-toast';
 toast.innerHTML = '<span id="cc-toast-msg"></span>';
 document.body.appendChild(toast);
 }
 toast.className = `cc-toast ${type}`;
 document.getElementById('cc-toast-msg').textContent = message;
 toast.classList.add('show');
 clearTimeout(toast._timer);
 toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// GOOGLE SHEETS API 
async function submitToSheet(data) {
 const url = CC_CONFIG.SCRIPT_URL;
 if (!url || url.includes('PASTE')) {
 // Demo mode
 await new Promise(r => setTimeout(r, 1200));
 return { success: true, demo: true, orderId: 'DEMO-' + Date.now().toString().slice(-4) };
 }
 const res = await fetch(url, {
 method: 'POST',
 headers: { 'Content-Type': 'text/plain' },
 body: JSON.stringify(data),
 });
 return { success: true };
}

// TRACKING: Đọc từ Google Sheet 
// Sheet ID cần được publish dạng CSV
const TRACKING_SHEET_ID = "1HXUV1N4tRUK0vAEYz_IiQ7vjODWuMfRmeWf2kPljfwE";

async function fetchTracking(orderId) {
 const url = `https://docs.google.com/spreadsheets/d/${TRACKING_SHEET_ID}/export?format=csv&sheet=TRACKING`;
 const res = await fetch(url);
 const text = await res.text();
 const lines = text.trim().split('\n').slice(1);
 return lines.map(line => {
 const cols = line.split(',');
 return {
 orderId: (cols[0]||'').replace(/"/g,'').trim(),
 time: (cols[1]||'').replace(/"/g,'').trim(),
 status: (cols[2]||'').replace(/"/g,'').trim(),
 location: (cols[3]||'').replace(/"/g,'').trim(),
 note: (cols[4]||'').replace(/"/g,'').trim(),
 };
 }).filter(r => r.orderId.toLowerCase() === orderId.toLowerCase());
}

// AUTO-GENERATE MÃ KHÁCH HÀNG
/**
 * Gọi sau khi trang load xong: tự động điền mã KH khi nhập SĐT
 * @param {string} phoneId  - id của input SĐT
 * @param {string} codeId   - id của input mã KH
 */
function setupAutoCustomerCode(phoneId, codeId) {
  const phoneEl = document.getElementById(phoneId);
  const codeEl  = document.getElementById(codeId);
  if (!phoneEl || !codeEl) return;

  let _debounce = null;

  phoneEl.addEventListener('input', function() {
    clearTimeout(_debounce);
    _debounce = setTimeout(() => _generateCode(this.value), 700);
  });

  phoneEl.addEventListener('blur', function() {
    clearTimeout(_debounce);
    _generateCode(this.value);
  });

  async function _generateCode(raw) {
    const digits = raw.replace(/\D/g, '');
    if (digits.length < 4) return;

    // Nếu người dùng đã tự nhập mã → không ghi đè
    const current = codeEl.value.trim();
    const last4   = digits.slice(-4);
    const isAutoGenerated = !current || current.toUpperCase().startsWith('CAC');

    if (!isAutoGenerated) return;

    // Hiện placeholder loading
    codeEl.setAttribute('placeholder', 'Đang tạo mã...');

    try {
      const apiUrl = `${CC_CONFIG.SCRIPT_URL}?action=generateCode&phone=${encodeURIComponent(digits)}`;
      const res    = await fetch(apiUrl, { redirect: 'follow' });
      const text   = await res.text();
      let data;
      try { data = JSON.parse(text); } catch(e) { throw new Error('parse error'); }

      if (data.success && data.code) {
        codeEl.value = data.code;
        codeEl.style.borderColor = 'var(--orange, #F47B20)';
        setTimeout(() => { codeEl.style.borderColor = ''; }, 2000);
      }
    } catch(err) {
      // Fallback: tạo local không check trùng
      codeEl.value = 'CAC' + last4;
    } finally {
      codeEl.setAttribute('placeholder', 'CAC0001');
    }
  }
}

// ── QUICK CALC BAR ───────────────────────────────────────────
function injectCalcBar() {
  // Use existing placeholder if present, otherwise create and insert
  let bar = document.getElementById('cc-calc-bar');
  const alreadyFilled = bar && bar.innerHTML.trim().length > 0;
  if (alreadyFilled) return;
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'cc-calc-bar';
  }
  bar.className = 'cc-calc-bar';
  const isEN = () => window.currentLang === 'en';
  bar.innerHTML = `
  <div class="cc-calc-inner">
    <div class="cc-calc-label" data-vi="⚡ Tính giá nhanh" data-en="⚡ Quick estimate">⚡ Tính giá nhanh</div>
    <div class="cc-calc-fields">
      <select id="cc-calc-service" onchange="quickCalc()">
        <option value="mvv"   data-vi="Mỹ - Việt Nam"          data-en="US – Vietnam">Mỹ - Việt Nam</option>
        <option value="UPS"   data-vi="Label UPS ($1.99/lbs)"   data-en="UPS Label ($1.99/lbs)">Label UPS ($1.99/lbs)</option>
        <option value="FedEx" data-vi="Label FedEx ($2.49/lbs)" data-en="FedEx Label ($2.49/lbs)">Label FedEx ($2.49/lbs)</option>
        <option value="USPS"  data-vi="Label USPS (từ $1.49/lbs)" data-en="USPS Label (from $1.49/lbs)">Label USPS (từ $1.49/lbs)</option>
      </select>
      <input type="number" id="cc-calc-weight" placeholder="Cân nặng (lbs)"
        data-vi-placeholder="Cân nặng (lbs)" data-en-placeholder="Weight (lbs)"
        min="0.1" step="0.1" oninput="quickCalc()" style="max-width:160px;" />
    </div>
    <div class="cc-calc-result" id="cc-calc-result">
      <span class="rlabel" data-vi="Phí ước tính" data-en="Estimated fee">Phí ước tính</span>
      <span id="cc-calc-price">$0.00</span>
    </div>
    <a href="my-ve-viet.html" class="btn btn-primary btn-sm" data-vi="Tạo đơn →" data-en="Create order →">Tạo đơn →</a>
  </div>`;

  // Insert right after the main nav element (only if not already in DOM)
  if (!document.getElementById('cc-calc-bar')) {
    const nav = document.getElementById('cc-nav') || document.querySelector('nav.cc-nav, nav');
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(bar, nav.nextSibling);
    } else {
      document.body.prepend(bar);
    }
  }

  // Apply current language
  window.setLang && window.setLang(window.currentLang);
}

function quickCalc() {
  const svc    = (document.getElementById('cc-calc-service') || document.getElementById('calc-service'));
  const wInput = (document.getElementById('cc-calc-weight')  || document.getElementById('calc-weight'));
  const priceEl= (document.getElementById('cc-calc-price')   || document.getElementById('calc-price'));
  if (!svc || !wInput || !priceEl) return;
  const weight = parseFloat(wInput.value) || 0;
  if (weight <= 0) { priceEl.textContent = '$0.00'; return; }
  const service = svc.value;
  let price = service === 'mvv'
    ? (typeof calcMVVPrice   === 'function' ? calcMVVPrice(weight)        : weight * 5.99)
    : (typeof calcLabelPrice === 'function' ? calcLabelPrice(service, weight) : weight * 1.99);
  priceEl.textContent = typeof formatPrice === 'function' ? formatPrice(price) : '$' + price.toFixed(2);
}

// SCROLL TO TOP — chỉ xử lý scroll, FAB HTML được thêm tĩnh vào mỗi trang
window.addEventListener('scroll', function() {
 var btn = document.getElementById('cc-fab-top');
 if (btn) btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
}, { passive: true });

// INIT
document.addEventListener('DOMContentLoaded', () => {
 // Xóa tất cả FAB trùng — chỉ giữ cái cuối cùng
 var fabs = document.querySelectorAll('#cc-fab-wrap');
 if (fabs.length > 1) {
   for (var i = 0; i < fabs.length - 1; i++) fabs[i].remove();
 }
 // Luôn gọi setLang để đồng bộ trạng thái nút và nội dung
 window.setLang && window.setLang(currentLang);
 // Close mobile nav on outside click
 document.addEventListener('click', e => {
 const nav = document.getElementById('cc-nav-links');
 const toggle = document.querySelector('.cc-mobile-toggle');
 if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
 nav.classList.remove('open');
 }
 });
});
