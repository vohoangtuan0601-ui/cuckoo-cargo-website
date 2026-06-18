# CUCKOO CARGO — MASTER PROMPT & TÀI LIỆU DỰ ÁN TOÀN DIỆN

> **Phiên bản:** 2.0 — Cập nhật tháng 6/2026  
> **Tác giả:** Cuckoo Cargo Dev Team  
> **Mục đích:** Tài liệu kỹ thuật đầy đủ cho toàn bộ dự án website — dùng để onboard dev mới, rebuild, hoặc mở rộng tính năng.

---

## MỤC LỤC

1. [Tổng quan dự án & nghiệp vụ](#1-tổng-quan-dự-án--nghiệp-vụ)
2. [Tech Stack & Kiến trúc tổng thể](#2-tech-stack--kiến-trúc-tổng-thể)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [CSS Architecture — Cascade & Variables](#4-css-architecture--cascade--variables)
5. [JavaScript Architecture — Module & Load Order](#5-javascript-architecture--module--load-order)
6. [Hệ thống giá — CC_PRICING (pricing.js)](#6-hệ-thống-giá--cc_pricing-pricingjs)
7. [Hệ thống đa ngôn ngữ — lang.js](#7-hệ-thống-đa-ngôn-ngữ--langjs)
8. [Navigation & Config — global.js](#8-navigation--config--globaljs)
9. [Trang chủ — index.html](#9-trang-chủ--indexhtml)
10. [Gửi Hàng Mỹ → Việt — my-ve-viet.html](#10-gửi-hàng-mỹ--việt--my-ve-viethtml)
11. [Label Nội Địa Mỹ — noi-dia-my.html](#11-label-nội-địa-mỹ--noi-dia-myhtml)
12. [Mua Hộ — mua-ho.html](#12-mua-hộ--mua-hohtml)
13. [Sản Phẩm — san-pham.html](#13-sản-phẩm--san-phamhtml)
14. [Tra Cứu Đơn Hàng — tracking.html](#14-tra-cứu-đơn-hàng--trackinghtml)
15. [Blog — blog.html](#15-blog--bloghtml)
16. [Liên Hệ & Điều Khoản — lien-he.html, dieu-khoan.html](#16-liên-hệ--điều-khoản)
17. [Admin Panel — admin/pricing.html](#17-admin-panel--adminpricinghtml)
18. [Admin Tracking — admin-tracking.html](#18-admin-tracking--admin-trackinghtml)
19. [Backend Tích Hợp — Google Apps Script](#19-backend-tích-hợp--google-apps-script)
20. [Deployment — GitHub + Vercel + GitHub Pages](#20-deployment--github--vercel--github-pages)
21. [Kế Hoạch Backend Hoàn Chỉnh — Next.js + Supabase](#21-kế-hoạch-backend-hoàn-chỉnh--nextjs--supabase)
22. [Checklist Vận Hành & Bảo Trì](#22-checklist-vận-hành--bảo-trì)

---

## 1. Tổng quan dự án & nghiệp vụ

### 1.1 Về Cuckoo Cargo

**Cuckoo Cargo** là dịch vụ vận chuyển và thương mại Mỹ–Việt. Website này là mặt tiền kỹ thuật số phục vụ toàn bộ nghiệp vụ:

| Dịch vụ | Mô tả |
|---|---|
| **Gửi hàng Mỹ → Việt Nam** | Nhận kiện hàng tại Mỹ, giao tận tay tại Việt Nam trong 7–10 ngày |
| **Label Nội Địa Mỹ** | Tạo nhãn vận chuyển UPS / FedEx / USPS cho 50 tiểu bang Mỹ |
| **Mua Hộ** | Đặt mua hàng từ Amazon, Walmart, Target… phí 5% giá trị hàng |
| **Bán Sản Phẩm** | Sữa Ensure Mỹ chính hãng, Dầu gió Eagle Brand |

### 1.2 Thông tin liên hệ (hardcode trong CC_CONFIG)

```
Phone:    +1 (714) 398-4817
Email:    cuckoocargo.us@gmail.com
Facebook: https://www.facebook.com/61582783740459/
Zalo:     https://zalo.me/cuckoocargo
TikTok:   https://www.tiktok.com/@cuckoo.cargo6
```

### 1.3 Domain & Deployment

| Môi trường | URL |
|---|---|
| GitHub Pages | https://cuckoocargo23102025.github.io/cuckoocargo.com/ |
| Vercel (production) | https://cuckoo-cargo-website-lkjojb9ga-vohoangtuan0601-uis-projects.vercel.app |
| GitHub Repo | https://github.com/vohoangtuan0601-ui/cuckoo-cargo-website |

---

## 2. Tech Stack & Kiến trúc tổng thể

### 2.1 Kiến trúc hiện tại — Static Site

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER / CLIENT                      │
│                                                          │
│  HTML (content + structure)                              │
│  ├── CSS: global.css → pages.css → mobile.css (cascade) │
│  └── JS:  lang.js → global.js → pricing.js → page JS    │
│                                                          │
│  Data:  pricing.js (CC_PRICING)  ← Admin Panel cập nhật │
│  Forms: Google Apps Script (HTTPS POST)                  │
│  Lang:  localStorage 'cc-lang' (vi/en)                   │
│  Auth:  sessionStorage 'cc-admin' (admin panel)          │
└─────────────────────────────────────────────────────────┘
```

**Không có server-side rendering, không có database, không cần Node.js để chạy.** Mọi file đều là tĩnh — có thể mở trực tiếp bằng trình duyệt hoặc host trên bất kỳ CDN nào.

### 2.2 Font & Icons

- **Font chữ:** Google Fonts — `Bebas Neue` (heading), `Inter` (body trên index), `Faustina` (serif, dùng trên hầu hết trang)
- **Icons:** SVG inline, không dùng thư viện icon ngoài

### 2.3 Browser Support

- Chrome, Edge: 100% tính năng (bao gồm File System Access API cho admin)
- Firefox, Safari: Tất cả tính năng trừ `showSaveFilePicker` (fallback: download file)
- Mobile: Responsive qua `mobile.css`

---

## 3. Cấu trúc thư mục

```
Cuckoo Cargo Website/
│
├── index.html              ← Trang chủ
├── my-ve-viet.html         ← Đặt đơn gửi hàng Mỹ → Việt (7 bước)
├── noi-dia-my.html         ← Label nội địa Mỹ (UPS/FedEx/USPS)
├── mua-ho.html             ← Mua hộ hàng Mỹ
├── san-pham.html           ← Sản phẩm (Ensure, dầu gió)
├── tracking.html           ← Tra cứu đơn hàng
├── blog.html               ← Blog / bài viết
├── lien-he.html            ← Liên hệ
├── dieu-khoan.html         ← Điều khoản dịch vụ
├── admin-tracking.html     ← Admin: quản lý tracking
├── google-apps-script.js   ← Source code Google Apps Script
│
├── admin/
│   └── pricing.html        ← Admin: quản lý bảng giá
│
└── assets/
    ├── css/
    │   ├── global.css      ← CSS toàn site, CSS variables, nav, footer
    │   ├── pages.css       ← CSS các section dùng chung nhiều trang
    │   └── mobile.css      ← CSS responsive (load CUỐI, !important wins)
    │
    ├── js/
    │   ├── lang.js         ← IIFE module: hệ thống đa ngôn ngữ VI/EN
    │   ├── global.js       ← Nav inject, CC_CONFIG, search, toast
    │   ├── pricing.js      ← CC_PRICING: nguồn dữ liệu giá duy nhất
    │   └── ward-data.js    ← Dữ liệu tỉnh/quận/phường Việt Nam (cho form)
    │
    └── images/
        ├── logo.png
        ├── ups-logo.png
        ├── fedex-logo.png
        ├── usps-logo.png
        └── [product images...]
```

---

## 4. CSS Architecture — Cascade & Variables

### 4.1 Thứ tự load CSS (RẤT QUAN TRỌNG)

```html
<link rel="stylesheet" href="assets/css/global.css" />   <!-- 1. Load đầu -->
<link rel="stylesheet" href="assets/css/pages.css" />    <!-- 2. Load giữa -->
<link rel="stylesheet" href="assets/css/mobile.css" />   <!-- 3. Load CUỐI -->
```

> ⚠️ **Quy tắc vàng:** `mobile.css` load SAU cùng và dùng `!important` → **luôn luôn thắng** mọi rule inline hay page-specific. Khi debug mobile layout sai, kiểm tra `mobile.css` trước.

Riêng các trang như `my-ve-viet.html`, `noi-dia-my.html`, `mua-ho.html` có thêm `<style>` inline trong `<head>` — thứ tự ưu tiên:

```
mobile.css (!important) > inline <style> > pages.css > global.css
```

### 4.2 CSS Custom Properties (Variables)

Định nghĩa trong `:root` của `global.css` và lặp lại trong `<style>` inline của từng trang:

```css
:root {
  /* Brand Colors */
  --orange:        #F47B20;
  --orange-deep:   #D4650E;
  --orange-light:  #FFB366;
  --orange-bg:     #FFF3E8;

  /* Neutrals */
  --black:         #0F0F10;
  --white:         #FFFFFF;
  --gray:          #8E8E93;
  --gray-light:    #F5F5F7;
  --gray-border:   #E5E5EA;
  --text-primary:  #0F0F10;
  --text-muted:    #8E8E93;

  /* Semantic */
  --green:         #22C55E;
  --blue:          #3B82F6;
  --red:           #EF4444;

  /* Carrier Colors (dùng trong noi-dia-my.html) */
  --ups-color:     #1E3A6E;
  --fedex-color:   #4D148C;
  --usps-color:    #004B87;
  --navy:          #1E3A6E;
  --navy-light:    #2B4F8E;

  /* Gradients */
  --grad-orange:   linear-gradient(135deg, #F47B20, #D4650E);
  --shadow-orange: 0 8px 24px rgba(244,123,32,.4);

  /* Border Radius */
  --radius-sm:     8px;
  --radius-md:     14px;
  --radius-lg:     22px;
}
```

### 4.3 Pattern chung của mỗi trang

Mọi trang đều bắt đầu bằng reset:
```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Faustina', serif; overflow-x: hidden; }
```

---

## 5. JavaScript Architecture — Module & Load Order

### 5.1 Thứ tự load JS (QUAN TRỌNG)

```html
<!-- CUỐI <body> — theo đúng thứ tự này -->
<script src="assets/js/lang.js"></script>      <!-- 1. TRƯỚC TIÊN -->
<script src="assets/js/pricing.js"></script>   <!-- 2. -->
<script src="assets/js/global.js"></script>    <!-- 3. -->
<script src="assets/js/ward-data.js"></script> <!-- 4. (chỉ trang cần địa chỉ VN) -->
<script>
  // 5. Page-specific JS inline
  injectNav('page-id');
  // ...
</script>
```

> `lang.js` phải load trước vì nó expose `window.setLang` và `window.currentLang` mà `global.js` và các trang dùng.

### 5.2 Globals được expose ra window

| Variable/Function | File | Mô tả |
|---|---|---|
| `window.currentLang` | lang.js | `'vi'` hoặc `'en'`, persist qua localStorage |
| `window.setLang(lang)` | lang.js | Đổi ngôn ngữ toàn trang |
| `CC_PRICING` | pricing.js | Object giá toàn bộ dịch vụ |
| `calcLabelPrice(carrier, svc, lbs, pickup, addrType)` | pricing.js | Tính giá label nội địa |
| `calcMVVPrice(lbs)` | pricing.js | Tính giá gửi Mỹ→Việt |
| `formatPrice(usd)` | pricing.js | Format `$12.50` hoặc `'Liên hệ báo giá'` |
| `CC_CONFIG` | global.js | Phone, social links, Google Script URL |
| `injectNav(activePage)` | global.js | Render nav vào `#cc-nav` |

### 5.3 LocalStorage & SessionStorage

| Key | Storage | Giá trị | Mục đích |
|---|---|---|---|
| `cc-lang` | localStorage | `'vi'` / `'en'` | Ngôn ngữ người dùng |
| `cc-pricing` | localStorage | JSON string | Admin override giá (chưa lưu file) |
| `cc-admin` | sessionStorage | `'1'` | Xác thực admin panel |

---

## 6. Hệ thống giá — CC_PRICING (pricing.js)

`pricing.js` là **nguồn dữ liệu giá duy nhất** (single source of truth). Mọi trang đều đọc từ đây, không hardcode giá ở chỗ khác.

### 6.1 Cấu trúc CC_PRICING

```javascript
const CC_PRICING = {

  // ── GỬI HÀNG MỸ → VIỆT ──────────────────────────────
  mvv: [                           // Bảng giá $/lbs theo trọng lượng
    { from: 0,    to: 10,   price: 3.89 },
    { from: 10,   to: 50,   price: 3.89 },
    { from: 50,   to: 90,   price: 3.79 },
    { from: 90,   to: 150,  price: 3.59 },
    { from: 150,  to: 9999, price: 3.49 },
  ],

  deliveryVN: {
    sgHn:     0,      // SG/HN: miễn phí
    province: 0.99,   // Tỉnh thành khác: +$0.99/lbs
  },

  customs: {                       // Phí hải quan theo loại hàng ($/lbs)
    ruou:          14,
    cigar:         20,
    nuocHoa:       7,
    vitaminMyPham: 0.99,
    dienThoaiCu:   60,
    dienThoaiMoi:  90,
    taiNgheAirpod: 12,
    vaccinMayYTe:  0.20,
    dienTuKhac:    0.10,
  },

  insurance: {                     // Gói bảo hiểm
    Free:    { price: 0,     perLbs: 5,    maxCover: 100,  label: 'FREE — Miễn phí' },
    Pro:     { price: 19.99, perLbs: 12,   maxCover: 500,  label: 'PRO — Bảo vệ nâng cao' },
    ProMax:  { price: 59.99, perLbs: 20,   maxCover: 800,  label: 'PRO MAX — Bảo vệ tối thượng' },
    Special: { price: null,  perLbs: null, maxCover: null, label: 'SPECIAL — Theo giá trị khai báo' },
  },

  packaging: {                     // Phí đóng gói (cộng thêm vào giá)
    'Miễn phí':   { rate: 0,    label: 'Miễn phí' },
    'Tiêu chuẩn': { rate: 0.39, label: '+$0.39/lbs' },
    'Nâng cao':   { rate: 0.69, label: '+$0.69/lbs' },
  },

  muaHo: 0.05,                     // Phí mua hộ: 5% giá trị hàng

  // ── LABEL NỘI ĐỊA MỸ ─────────────────────────────────
  upsPickup:          9.65,        // Phụ phí pickup tại nhà (house)
  upsPickupApt:      16.15,        // Phụ phí pickup tại apartment
  upsHeavySurcharge: 27.00,        // Phụ phí hàng nặng UPS (>50 lbs)

  rateData: {
    // key: '{carrier}-{service}'
    // flat:   giá cố định [≤2 lbs, ≤5 lbs, ≤8 lbs, ≤10 lbs]
    // perLbs: mảng [11-20, 21-30, 31-40, 41-50, 51-70, 71-100, 101+] lbs
    // maxLbs: giới hạn cân nặng tối đa (null = không giới hạn)

    'ups-Ground':    { flat:[{max:2,p:17},{max:5,p:25},{max:8,p:28},{max:10,p:32}],   perLbs:[1.99,1.99,1.99,1.99,1.99,1.99,1.99], maxLbs:null },
    'ups-3-Day':     { flat:[{max:2,p:25},{max:5,p:39},{max:8,p:52},{max:10,p:59}],   perLbs:[4.69,4.69,4.69,4.69,4.69,4.69,4.69], maxLbs:null },
    'ups-2-Day':     { flat:[{max:2,p:31},{max:5,p:55},{max:8,p:72},{max:10,p:82}],   perLbs:[6.49,6.49,6.49,6.49,6.49,6.49,6.49], maxLbs:null },
    'ups-Overnight': { flat:[{max:2,p:89},{max:5,p:109},{max:8,p:129},{max:10,p:142}],perLbs:[10.69,10.69,10.69,10.69,10.69,10.69,10.69], maxLbs:null },

    'fedex-Ground':    { flat:[{max:2,p:34},{max:5,p:38},{max:8,p:40},{max:10,p:43}],   perLbs:[2.99,2.99,2.99,2.99,2.99,2.99,2.99],       maxLbs:null },
    'fedex-3-Day':     { flat:[{max:2,p:69},{max:5,p:89},{max:8,p:112},{max:10,p:135}], perLbs:[12.79,12.79,12.79,12.79,12.79,12.79,12.79], maxLbs:null },
    'fedex-2-Day':     { flat:[{max:2,p:82},{max:5,p:103},{max:8,p:135},{max:10,p:159}],perLbs:[15.19,15.19,15.19,15.19,15.19,15.19,15.19], maxLbs:null },
    'fedex-Overnight': { flat:[{max:2,p:139},{max:5,p:155},{max:8,p:195},{max:10,p:209}],perLbs:[19.79,19.79,19.79,19.79,19.79,19.79,19.79],maxLbs:null },

    'usps-Ground':   { flat:[{max:2,p:22},{max:5,p:29},{max:8,p:37},{max:10,p:42}],   perLbs:[3.99], maxLbs:20 },
    'usps-Priority': { flat:[{max:2,p:29},{max:5,p:52},{max:8,p:67},{max:10,p:75}],   perLbs:[5.99], maxLbs:20 },
    'usps-Express':  { flat:[{max:2,p:129},{max:5,p:179},{max:8,p:229},{max:10,p:265}],perLbs:null,  maxLbs:10 },
  },
};
```

### 6.2 Quy tắc perLbs theo loại carrier

| Carrier/Service | perLbs | maxLbs | Ghi chú |
|---|---|---|---|
| UPS Ground/3Day/2Day/Overnight | Array 7 phần tử | null | 7 mức cân nặng khác nhau |
| FedEx Ground/3Day/2Day/Overnight | Array 7 phần tử | null | 7 mức cân nặng khác nhau |
| USPS Ground, USPS Priority | Array 1 phần tử `[rate]` | 20 | Chỉ 1 mức, tối đa 20 lbs |
| USPS Express | `null` | 10 | Không tính theo lbs, tối đa 10 lbs |

### 6.3 Bảng phân vùng cân nặng (PERLBS_RANGES)

```javascript
const PERLBS_RANGES = [
  [11,  20],   // index 0 → perLbs[0]
  [21,  30],   // index 1 → perLbs[1]
  [31,  40],   // index 2 → perLbs[2]
  [41,  50],   // index 3 → perLbs[3]
  [51,  70],   // index 4 → perLbs[4]
  [71, 100],   // index 5 → perLbs[5]
  [101,9999],  // index 6 → perLbs[6]
];
```

### 6.4 Hàm calcLabelPrice — Logic tính giá

```javascript
function calcLabelPrice(carrier, service, weightLbs, pickupMode='dropoff', addrType='house') {
  const key  = carrier.toLowerCase() + '-' + service;
  const data = CC_PRICING.rateData[key];
  if (!data) return null;

  let cost;

  if (weightLbs <= 10) {
    // ── FLAT RATE: ≤10 lbs ──
    const tier = data.flat.find(f => weightLbs <= f.max);
    cost = tier ? tier.p : data.flat[data.flat.length - 1].p;

  } else {
    // ── PER LBS: >10 lbs ──
    if (!data.perLbs) return null;                          // USPS Express: không hỗ trợ
    if (data.maxLbs && weightLbs > data.maxLbs) return null;// USPS: vượt maxLbs

    let rate;
    if (Array.isArray(data.perLbs)) {
      let idx = data.perLbs.length - 1;                    // default: range cuối
      for (let i = 0; i < PERLBS_RANGES.length; i++) {
        if (weightLbs >= PERLBS_RANGES[i][0] && weightLbs <= PERLBS_RANGES[i][1]) {
          idx = Math.min(i, data.perLbs.length - 1);
          break;
        }
      }
      rate = data.perLbs[idx];
    } else {
      rate = data.perLbs;                                   // scalar (USPS Ground/Priority)
    }

    if (rate == null) return null;
    cost = weightLbs * rate;
  }

  // Phụ phí UPS pickup
  if (carrier.toLowerCase() === 'ups' && pickupMode === 'pickup') {
    cost += addrType === 'apt' ? CC_PRICING.upsPickupApt : CC_PRICING.upsPickup;
  }

  // Phụ phí UPS hàng nặng
  if (carrier.toLowerCase() === 'ups' && weightLbs > 50) {
    cost += CC_PRICING.upsHeavySurcharge;
  }

  return cost;
}
```

---

## 7. Hệ thống đa ngôn ngữ — lang.js

### 7.1 Kiến trúc

`lang.js` là IIFE (Immediately Invoked Function Expression) — load và khởi động ngay lập tức.

```javascript
(function () {
  window.currentLang = localStorage.getItem('cc-lang') || 'vi';

  // Áp dụng dịch cho một element
  function applyTrans(el, val) {
    if (!el || val === null || val === undefined) return;
    if (val.includes('<') || val.includes('&')) el.innerHTML = val;
    else el.textContent = val;
  }

  // Dictionary per-page: CSS selector → { vi, en }
  const PAGES = { 'index': {...}, 'my-ve-viet': {...}, 'noi-dia-my': {...}, ... };

  window.setLang = function(lang) {
    window.currentLang = lang;
    localStorage.setItem('cc-lang', lang);
    // Cập nhật button active
    // Áp dụng data-vi / data-en attributes
    // Áp dụng PAGES dictionary cho trang hiện tại
    // Cập nhật placeholder inputs
    // Dispatch event 'langchange'
  };

  // Auto-apply on load
  document.addEventListener('DOMContentLoaded', () => setLang(window.currentLang));
})();
```

### 7.2 Cơ chế dịch 2 lớp

**Lớp 1 — data attributes (HTML):**
```html
<span data-vi="Gửi hàng ngay" data-en="Ship Now">Gửi hàng ngay</span>
```

**Lớp 2 — PAGES dictionary (JS):**
```javascript
'.hero h1': { vi: 'Vận Chuyển <span>Mỹ–Việt</span>', en: 'US–Vietnam <span>Shipping</span>' }
```

Lớp 2 dùng cho content phức tạp (có HTML tags, span màu) không thể để trong attribute.

### 7.3 Page IDs

Mỗi trang được nhận diện qua `<body id="page-xxx">`:

| File | body id | Key trong PAGES |
|---|---|---|
| index.html | `page-index` | `'index'` |
| my-ve-viet.html | `page-mvv` | `'my-ve-viet'` |
| noi-dia-my.html | `page-ndm` | `'noi-dia-my'` |
| mua-ho.html | `page-mh` | `'mua-ho'` |
| tracking.html | `page-tracking` | `'tracking'` |

### 7.4 Event langchange

Khi ngôn ngữ thay đổi, `setLang()` dispatch custom event:
```javascript
window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
```

Các trang listen event này để re-render dynamic content:
```javascript
window.addEventListener('langchange', () => updatePricingTable());
```

---

## 8. Navigation & Config — global.js

### 8.1 CC_CONFIG

```javascript
const CC_CONFIG = {
  SCRIPT_URL: "https://script.google.com/macros/s/...",  // Google Apps Script URL
  PHONE:    "+1 (714) 398-4817",
  FACEBOOK: "https://www.facebook.com/61582783740459/",
  ZALO:     "https://zalo.me/cuckoocargo",
  TIKTOK:   "https://www.tiktok.com/@cuckoo.cargo6",
  EMAIL:    "cuckoocargo.us@gmail.com",
  BANK_NAME:  "[Tên ngân hàng]",
  BANK_ACC:   "[Số tài khoản]",
  BANK_OWNER: "CUCKOO CARGO",
};
```

### 8.2 injectNav(activePage)

Hàm này inject toàn bộ navigation bar vào `<div id="cc-nav">`. Mỗi trang chỉ cần:
```html
<div id="cc-nav"></div>
...
<script>injectNav('ndm');</script>  <!-- 'ndm' = nav link active -->
```

Nav bao gồm: logo, links (Home/MVV/Label/Mua hộ/Tracking/Sản phẩm/Blog), search bar, VN/EN toggle, CTA button, hamburger mobile.

### 8.3 Search

`doNavSearch(query)` tìm kiếm client-side trong danh sách trang được hardcode trong `global.js`. Kết quả hiển thị dropdown realtime.

---

## 9. Trang chủ — index.html

### 9.1 Sections

1. **Hero** — Background đen với gradient cam, tagline chính, 4 thống kê (50 States, 7-10 Days, +1000 Customers, 4 Services), 2 CTA buttons
2. **Quick Calc** — Widget tính giá nhanh Mỹ→Việt theo lbs
3. **Services** — Grid 4 dịch vụ với icon + mô tả ngắn + link
4. **How it Works** — Tabs 3 dịch vụ, mỗi tab 3 bước quy trình
5. **Why Cuckoo** — Lý do chọn (uy tín, nhanh, minh bạch)
6. **Cam kết** — Những điều Cuckoo KHÔNG BAO GIỜ làm
7. **Tracking preview** — Preview widget tra cứu đơn hàng
8. **CTA Bottom** — Call to action cuối trang
9. **Footer** — Links, social, copyright

### 9.2 Script load

```html
<script src="assets/js/lang.js"></script>
<script src="assets/js/pricing.js"></script>
<script src="assets/js/global.js"></script>
<script>
  injectNav('home');
  // Quick calc logic
</script>
```

---

## 10. Gửi Hàng Mỹ → Việt — my-ve-viet.html

### 10.1 Mô tả

Form đặt đơn 7 bước (multi-step wizard) để gửi hàng từ Mỹ về Việt Nam.

### 10.2 Các bước

| Bước | Nội dung |
|---|---|
| **Bước 1** | Thông tin người gửi (tên, phone, địa chỉ Mỹ) |
| **Bước 2** | Thông tin người nhận (tên, phone, tỉnh/quận/phường VN) — dùng `ward-data.js` |
| **Bước 3** | Thời gian giao hàng (Drop-off hoặc Pickup, calendar picker) |
| **Bước 4** | Thông tin kiện hàng (loại hàng, kích thước, trọng lượng) |
| **Bước 5** | Hải quan & Phí (chọn loại hàng → tính customs fee tự động) |
| **Bước 6** | Bảo hiểm & Đóng gói (chọn gói insurance, loại đóng gói) |
| **Bước 7** | Xem lại & Xác nhận (tổng kết toàn bộ đơn + tổng tiền) |

### 10.3 Địa chỉ Việt Nam

File `ward-data.js` chứa dữ liệu phân cấp:
- Cấp 1: Tỉnh/Thành phố (63 tỉnh)
- Cấp 2: Quận/Huyện
- Cấp 3: Phường/Xã

Khi chọn tỉnh → dropdown quận tự động load → chọn quận → dropdown phường load.

### 10.4 Tính giá tự động

Tổng tiền = `calcMVVPrice(lbs)` + customs fee + insurance + packaging + deliveryVN

### 10.5 Submit đơn

Form submit qua `fetch(CC_CONFIG.SCRIPT_URL, { method: 'POST', ... })` đến Google Apps Script, dữ liệu được ghi vào Google Sheets.

### 10.6 Navigation

```html
<!-- Trang này có nav riêng (không dùng injectNav) -->
<!-- Có progress bar hiển thị % hoàn thành 7 bước -->
```

---

## 11. Label Nội Địa Mỹ — noi-dia-my.html

### 11.1 Mô tả

Trang báo giá và đặt lệnh tạo label vận chuyển nội địa Mỹ (50 bang) cho 3 hãng: UPS, FedEx, USPS.

### 11.2 UI Structure

```
[Hero: badge + tiêu đề + 3 stats]
[Selector Section (sticky top:64px)]
  ├── Carrier Tabs: [UPS] [FedEx] [USPS]
  └── Service Tabs: [Ground] [3-Day] [2-Day] [Overnight]
[Pricing Section]
  ├── Service Header (màu theo carrier)
  ├── Pricing Table: Flat rates (≤10 lbs) + PerLbs rates (>10 lbs)
  └── Pickup Options
[Calculator Section]
[Order Form Section]
```

### 11.3 RATE_DATA — Merge pricing + UI

```javascript
const RATE_UI = {
  'ups-Ground':    { label:'UPS Ground',    note:'3–5 ngày · Tiết kiệm nhất' },
  'ups-3-Day':     { label:'UPS 3-Day',     note:'Đảm bảo 3 ngày làm việc' },
  // ...
};

const RATE_DATA = {};
Object.keys(RATE_UI).forEach(key => {
  RATE_DATA[key] = Object.assign({}, CC_PRICING.rateData[key], RATE_UI[key]);
});
```

Kết quả: `RATE_DATA` có đủ cả pricing data lẫn UI labels.

### 11.4 updatePricingTable(carrier, svc)

Hàm này render bảng giá mỗi khi user chọn carrier/service:

```javascript
// Flat rows: 4 dòng ≤10 lbs
// PerLbs rows:
const ALL_PERLBS = [
  {label:'11–20 lbs'},{label:'21–30 lbs'},{label:'31–40 lbs'},{label:'41–50 lbs'},
  {label:'51–70 lbs'},{label:'71–100 lbs'},{label:'101+ lbs'},
];
const plRanges = data.maxLbs === 20 ? [ALL_PERLBS[0]] : ALL_PERLBS;
// → USPS Ground/Priority chỉ show 1 dòng (11–20 lbs)
// → Còn lại show đủ 7 dòng
```

### 11.5 calcPkg(lbs, carrier, svc, pickupMode, addrType)

```javascript
// Dùng PL_RANGES để lookup index trong perLbs array
const PL_RANGES = [[11,20],[21,30],[31,40],[41,50],[51,70],[71,100],[101,9999]];
let rate;
if (Array.isArray(data.perLbs)) {
  let idx = data.perLbs.length - 1;
  for (let i = 0; i < PL_RANGES.length; i++) {
    if (lbs >= PL_RANGES[i][0] && lbs <= PL_RANGES[i][1]) {
      idx = Math.min(i, data.perLbs.length - 1); break;
    }
  }
  rate = data.perLbs[idx];
} else {
  rate = data.perLbs;
}
return lbs * rate;
```

### 11.6 Phụ phí UPS

- Pickup tại nhà: +$9.65
- Pickup tại apartment: +$16.15  
- Hàng nặng (>50 lbs): +$27.00 Heavy Surcharge

### 11.7 Đặt lệnh label

Form đặt lệnh gồm: địa chỉ từ, địa chỉ đến, trọng lượng, kích thước (L×W×H), ghi chú. Submit qua Google Apps Script.

---

## 12. Mua Hộ — mua-ho.html

### 12.1 Mô tả

Dịch vụ mua hộ hàng Mỹ (Amazon, Walmart, Target, Best Buy...) với phí **5% giá trị hàng** (`CC_PRICING.muaHo = 0.05`).

### 12.2 Sections

1. **Hero** + Trust Bar (4 điểm mạnh: uy tín/nhanh/rẻ/dễ)
2. **Quy trình 4 bước** (Gửi link → Báo giá → Thanh toán → Giao hàng)
3. **Supported Stores** (logos: Amazon, Walmart, Target, Costco, Best Buy, eBay...)
4. **Pricing calculator** (nhập giá hàng → tính phí mua hộ + ship)
5. **Form yêu cầu mua hộ** (link sản phẩm, size/màu, số lượng, địa chỉ nhận, ghi chú)

### 12.3 Công thức tính phí

```
Phí mua hộ = Giá hàng × 5%
Tổng = Giá hàng + Phí mua hộ + Phí ship Mỹ→Việt (tính theo lbs ước tính)
```

---

## 13. Sản Phẩm — san-pham.html

### 13.1 Mô tả

Trang bán sản phẩm trực tiếp. Hiện tại có 2 danh mục:
- **Sữa Ensure** (các loại Abbott Ensure từ Mỹ chính hãng)
- **Dầu gió Eagle Brand** (dầu xanh, dầu đỏ)

### 13.2 UI

- Category tabs lọc sản phẩm
- Product cards với ảnh, tên, giá, nút "Đặt hàng"
- Modal hoặc form đặt mua

### 13.3 Load CSS

```html
<link rel="stylesheet" href="assets/css/global.css" />
<link rel="stylesheet" href="assets/css/pages.css" />
```

---

## 14. Tra Cứu Đơn Hàng — tracking.html

### 14.1 Mô tả

Trang tra cứu trạng thái đơn hàng theo mã đơn.

### 14.2 UI

- Hero với ô nhập mã đơn + nút tìm kiếm
- Timeline hiển thị các mốc: Đã nhận → Đang xử lý → Đang vận chuyển → Đã giao
- Fetch data từ Google Sheets qua Google Apps Script (GET request với order ID)

### 14.3 Load JS

```html
<script src="assets/js/lang.js"></script>
<script src="assets/js/global.js"></script>
<script>
  injectNav('tracking');
  // tracking logic
</script>
```

---

## 15. Blog — blog.html

### 15.1 Mô tả

Trang blog với các bài viết về vận chuyển, hải quan, mua hàng Mỹ.

### 15.2 UI

- Grid bài viết (card: ảnh thumbnail, tiêu đề, tóm tắt, ngày, tag)
- Filter theo category
- Bài viết chi tiết (có thể là trang riêng hoặc modal)

---

## 16. Liên Hệ & Điều Khoản

### lien-he.html

Thông tin liên hệ: địa chỉ warehouse Mỹ, phone, email, Zalo, Facebook, TikTok. Form liên hệ nhanh.

### dieu-khoan.html

Điều khoản dịch vụ, chính sách bảo hiểm, chính sách hoàn hàng.

---

## 17. Admin Panel — admin/pricing.html

### 17.1 Mô tả

Trang quản lý giá nội bộ. **Không public** — protected bằng password.

### 17.2 Authentication

```javascript
const ADMIN_PASSWORD = '...';  // Hardcode trong file

function doLogin() {
  if (document.getElementById('pwd-input').value === ADMIN_PASSWORD) {
    sessionStorage.setItem('cc-admin', '1');
    // Hiển thị app, ẩn login screen
    buildLabelTables();
    loadForm();
  }
}
// Session hết khi đóng tab → phải login lại
```

### 17.3 2 Tabs chức năng

**Tab MVV (Mỹ → Việt):**
- Chỉnh giá `mvv[]` ($/lbs theo từng mức cân)
- Chỉnh `deliveryVN` (phí giao SG/HN vs tỉnh)
- Chỉnh `customs` (9 loại hàng hải quan)
- Chỉnh `insurance` (4 gói)
- Chỉnh `packaging` (3 mức)

**Tab Label (Nội địa Mỹ):**
- Render động tất cả carrier × service (11 service total)
- Mỗi service có:
  - 4 input flat rate (≤2, ≤5, ≤8, ≤10 lbs)
  - 7 input perLbs (11-20, 21-30, ..., 101+) — hoặc 1 cho USPS, disabled cho Express
  - UPS: show icon ⚡ cho range 51–70, 71–100, 101+ (heavy surcharge)

### 17.4 Field ID Convention

```javascript
// rd-{carrier}-{svcslug}-{type}{idx}
// type: 'f' = flat, 'pl' = perLbs
// idx: 0-based index

fieldId('ups', '3-Day', 'f', 0)   → 'rd-ups-3day-f0'
fieldId('ups', '3-Day', 'pl', 2)  → 'rd-ups-3day-pl2'
fieldId('fedex', 'Overnight', 'pl', 6) → 'rd-fedex-overnight-pl6'
```

### 17.5 Lưu & Cập nhật — File System Access API

```javascript
let _fileHandle = null;  // Giữ handle file pricing.js đã chọn

async function pickPricingFile() {
  // Mở file picker → chọn pricing.js
  [_fileHandle] = await window.showOpenFilePicker({...});
}

async function saveAndUpdate() {
  const content = generatePricingContent();  // Tạo nội dung pricing.js mới
  if (_fileHandle) {
    // Ghi thẳng vào file qua File System Access API (Chrome/Edge)
    const writable = await _fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  } else {
    fallbackDownload(content);  // Safari/Firefox: download file
  }
}
```

> **Workflow admin:** Chỉnh giá → nhấn "Chọn file" → chọn `pricing.js` → nhấn "Lưu & Cập nhật" → file được ghi trực tiếp → commit & push lên GitHub → Vercel tự deploy.

### 17.6 generatePricingContent()

Hàm này sinh ra toàn bộ nội dung file `pricing.js` dạng string từ data hiện tại trong form:

```javascript
function generatePricingContent() {
  const d = readFormData();  // Đọc tất cả input values

  const rateLines = Object.entries(d.rateData).map(([key, entry]) => {
    const flatStr    = '[' + entry.flat.map(f => `{max:${f.max},p:${f.p}}`).join(',') + ']';
    const perLbsStr  = entry.perLbs === null
      ? 'null'
      : '[' + entry.perLbs.join(', ') + ']';
    return `    '${key}': { flat:${flatStr}, perLbs:${perLbsStr}, maxLbs:${entry.maxLbs} },`;
  }).join('\n');

  return `/* ═══ CUCKOO CARGO — Bảng Giá ═══ */\n\nconst CC_PRICING = {\n  ...${rateLines}\n};\n\n// Hàm tính giá...`;
}
```

> ⚠️ **Bug đã fix:** Template literals phải dùng `${d.customs.ruou}` (không escape), KHÔNG phải `\${d.customs.ruou}` (sẽ output literal text, gây SyntaxError khi load pricing.js).

### 17.7 localStorage Backup

Mỗi lần save, admin data cũng được backup vào `localStorage['cc-pricing']` để phục hồi khi reload trang admin.

---

## 18. Admin Tracking — admin-tracking.html

### 18.1 Mô tả

Dashboard quản lý đơn hàng và tracking. Protected bằng cùng password với admin/pricing.html.

### 18.2 Chức năng

- Xem danh sách đơn hàng từ Google Sheets
- Cập nhật trạng thái đơn (Đã nhận / Đang xử lý / Đang vận chuyển / Đã giao)
- Nhập tracking number của hãng vận chuyển
- Filter, tìm kiếm đơn hàng

---

## 19. Backend Tích Hợp — Google Apps Script

### 19.1 Vai trò

Google Apps Script (GAS) đóng vai "backend đơn giản" — nhận form submission và ghi vào Google Sheets.

### 19.2 File source

`google-apps-script.js` — Copy nội dung này vào Google Apps Script Editor, deploy as Web App.

### 19.3 Các endpoints

```
POST SCRIPT_URL
  body: { action: 'submitOrder', data: {...} }
  → Ghi đơn hàng Mỹ→Việt vào sheet "Orders"

POST SCRIPT_URL
  body: { action: 'submitLabel', data: {...} }
  → Ghi yêu cầu label vào sheet "Labels"

POST SCRIPT_URL
  body: { action: 'submitContact', data: {...} }
  → Ghi liên hệ vào sheet "Contacts"

GET SCRIPT_URL?action=tracking&id=CC-2024-001
  → Trả về JSON trạng thái đơn hàng
```

### 19.4 CORS

GAS Web App deploy với `Execute as: Me` và `Who has access: Anyone` → không bị CORS khi fetch từ browser.

### 19.5 Error Handling

```javascript
fetch(CC_CONFIG.SCRIPT_URL, {
  method: 'POST',
  body: JSON.stringify(data),
})
.then(r => r.json())
.then(res => {
  if (res.success) showToast('Đặt đơn thành công!');
  else showToast('Lỗi: ' + res.message, 'error');
})
.catch(() => showToast('Không thể kết nối. Vui lòng thử lại.', 'error'));
```

---

## 20. Deployment — GitHub + Vercel + GitHub Pages

### 20.1 GitHub Repository

```
URL:    https://github.com/vohoangtuan0601-ui/cuckoo-cargo-website
Nhánh: main
Trạng thái: PUBLIC (yêu cầu cho GitHub Pages free tier)
```

### 20.2 Quy trình deploy manual

```bash
# Trong thư mục dự án
git add .
git commit -m "cập nhật giá tháng X"
git push origin main
```

Vercel tự động trigger build & deploy khi có push lên `main`.

### 20.3 Vercel

- **Kết nối:** GitHub repo → Vercel project
- **Build:** Framework = Other (static site), Output directory = root `/`
- **Auto-deploy:** Bật — mỗi push lên main → deploy mới trong ~30 giây
- **URL:** `https://cuckoo-cargo-website-lkjojb9ga-vohoangtuan0601-uis-projects.vercel.app`

### 20.4 GitHub Pages

- **Source:** Deploy from branch `main`, root `/`
- **URL:** `https://cuckoocargo23102025.github.io/cuckoocargo.com/`
- **Lưu ý:** Repo phải PUBLIC để dùng GitHub Pages miễn phí

### 20.5 Workflow cập nhật giá (hiện tại)

```
1. Mở admin/pricing.html trên Chrome
2. Login
3. Chỉnh giá theo nhu cầu
4. Nhấn "Chọn file" → chọn file pricing.js trong thư mục dự án
5. Nhấn "Lưu & Cập nhật" → pricing.js được ghi trực tiếp
6. git add . && git commit -m "update pricing" && git push
7. Vercel auto-deploy → live trong ~30s
```

---

## 21. Kế Hoạch Backend Hoàn Chỉnh — Next.js + Supabase

> Đây là roadmap để nâng cấp từ static site lên website động (dynamic) với database và authentication thật sự.

### 21.1 Tech Stack Backend

| Layer | Technology | Lý do |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | React + SSR/SSG + API Routes tích hợp |
| **Database** | Supabase (PostgreSQL) | Free tier, realtime, built-in auth, dễ dùng |
| **Hosting** | Vercel | Tích hợp native với Next.js |
| **Email** | Resend | API email đơn giản, free 3000 emails/tháng |
| **Storage** | Supabase Storage | Lưu ảnh sản phẩm, file đính kèm |
| **Auth** | Supabase Auth | Email/password, OTP SMS |

### 21.2 Database Schema (PostgreSQL)

```sql
-- Đơn hàng Mỹ → Việt
CREATE TABLE orders (
  id          TEXT PRIMARY KEY,          -- CC-2024-001
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  status      TEXT DEFAULT 'pending',    -- pending/processing/shipping/delivered
  -- Người gửi
  sender_name    TEXT,
  sender_phone   TEXT,
  sender_address TEXT,
  -- Người nhận
  receiver_name     TEXT,
  receiver_phone    TEXT,
  receiver_province TEXT,
  receiver_district TEXT,
  receiver_ward     TEXT,
  receiver_address  TEXT,
  -- Hàng hóa
  weight_lbs    DECIMAL,
  item_type     TEXT,
  item_desc     TEXT,
  -- Giá
  base_price    DECIMAL,
  customs_fee   DECIMAL,
  insurance_fee DECIMAL,
  packaging_fee DECIMAL,
  delivery_fee  DECIMAL,
  total_price   DECIMAL,
  -- Meta
  insurance_plan TEXT,
  pickup_mode    TEXT,
  pickup_date    DATE,
  tracking_number TEXT,
  notes          TEXT
);

-- Label nội địa
CREATE TABLE labels (
  id          TEXT PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  status      TEXT DEFAULT 'pending',
  carrier     TEXT,   -- ups/fedex/usps
  service     TEXT,   -- Ground/3-Day/etc
  from_address JSONB,
  to_address   JSONB,
  weight_lbs   DECIMAL,
  dimensions   JSONB,  -- {l, w, h}
  price        DECIMAL,
  label_url    TEXT,   -- URL file label PDF
  notes        TEXT
);

-- Mua hộ
CREATE TABLE buyon_behalf (
  id           TEXT PRIMARY KEY,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  status       TEXT DEFAULT 'pending',
  product_url  TEXT,
  product_name TEXT,
  quantity     INT,
  size_color   TEXT,
  est_price    DECIMAL,
  fee          DECIMAL,
  customer_name  TEXT,
  customer_phone TEXT,
  customer_address TEXT,
  notes        TEXT
);

-- Sản phẩm
CREATE TABLE products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_vi     TEXT,
  name_en     TEXT,
  category    TEXT,   -- ensure/daugio/other
  price_usd   DECIMAL,
  stock       INT,
  image_url   TEXT,
  description_vi TEXT,
  description_en TEXT,
  active      BOOLEAN DEFAULT TRUE
);

-- Trạng thái tracking
CREATE TABLE tracking_events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   TEXT REFERENCES orders(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status     TEXT,
  location   TEXT,
  note       TEXT
);
```

### 21.3 Cấu trúc Project Next.js

```
cuckoo-cargo-nextjs/
├── app/
│   ├── layout.tsx              ← Root layout (nav, footer)
│   ├── page.tsx                ← Trang chủ
│   ├── gui-hang/
│   │   └── page.tsx            ← Form gửi hàng (my-ve-viet)
│   ├── label/
│   │   └── page.tsx            ← Label nội địa
│   ├── mua-ho/
│   │   └── page.tsx
│   ├── san-pham/
│   │   └── page.tsx
│   ├── tracking/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx       ← Chi tiết đơn hàng
│   ├── blog/
│   │   └── page.tsx
│   ├── admin/
│   │   ├── layout.tsx          ← Admin layout + auth guard
│   │   ├── pricing/page.tsx
│   │   ├── orders/page.tsx
│   │   └── tracking/page.tsx
│   └── api/
│       ├── orders/route.ts     ← POST /api/orders
│       ├── labels/route.ts
│       ├── tracking/route.ts
│       └── pricing/route.ts    ← GET/POST giá từ Supabase
│
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── PricingTable.tsx
│   ├── OrderForm.tsx
│   └── TrackingTimeline.tsx
│
├── lib/
│   ├── supabase.ts             ← Supabase client
│   ├── pricing.ts              ← calcLabelPrice, calcMVVPrice (TypeScript)
│   └── email.ts                ← Resend email templates
│
└── public/
    └── assets/...
```

### 21.4 Roadmap 4 Phase

**Phase 1 — Foundation (2–3 tuần)**
- Setup Next.js + Supabase + Vercel
- Migrate tất cả trang static sang Next.js components
- Giữ nguyên UI/UX hiện tại
- API Routes thay thế Google Apps Script

**Phase 2 — Database (2 tuần)**
- Connect Supabase, tạo tables
- Form gửi hàng → lưu vào DB
- Admin dashboard: xem/cập nhật đơn hàng
- Tracking realtime từ DB

**Phase 3 — Features (3 tuần)**
- Pricing quản lý từ DB (admin thay giá → tức thì live)
- Email tự động khi đặt đơn / cập nhật trạng thái
- SMS notification (optional, Twilio)
- Trang sản phẩm kết nối DB

**Phase 4 — Polish (2 tuần)**
- Tối ưu SEO (Next.js generateMetadata)
- Analytics (Vercel Analytics)
- Error tracking (Sentry)
- Performance audit

---

## 22. Checklist Vận Hành & Bảo Trì

### 22.1 Cập nhật giá định kỳ

```
□ Mở admin/pricing.html trên Chrome
□ Login bằng admin password
□ Chỉnh giá cần thay đổi
□ "Chọn file" → chọn assets/js/pricing.js
□ "Lưu & Cập nhật" → verify file đã thay đổi
□ git add . && git commit && git push
□ Kiểm tra Vercel dashboard — deploy thành công
□ Hard refresh trang (Cmd+Shift+R) và verify giá mới
```

### 22.2 Kiểm tra sau khi thay đổi pricing.js

```
□ Mở browser DevTools → Console
□ Không có SyntaxError
□ CC_PRICING không bị 'undefined'
□ Trang noi-dia-my.html: bảng giá hiển thị đúng
□ Trang my-ve-viet.html: tính giá tự động hoạt động
```

### 22.3 Debug thường gặp

| Triệu chứng | Nguyên nhân | Giải pháp |
|---|---|---|
| Trang trắng / không có bảng giá | SyntaxError trong pricing.js | Mở DevTools → Console, tìm error dòng bao nhiêu |
| CC_PRICING undefined | pricing.js load lỗi hoặc sai thứ tự | Kiểm tra thứ tự script tags |
| Giá không cập nhật sau save | Browser cache | Cmd+Shift+R (hard refresh) |
| "Lưu & Cập nhật" không hoạt động | Safari không hỗ trợ File System Access API | Dùng Chrome hoặc Edge |
| Mobile layout sai | CSS conflict | Kiểm tra mobile.css — có thể cần thêm !important |
| Form không submit được | Google Apps Script URL sai/hết hạn | Kiểm tra CC_CONFIG.SCRIPT_URL, re-deploy GAS |

### 22.4 Backup

Mỗi tháng:
- Export Google Sheets (đơn hàng, tracking) về máy
- Commit toàn bộ source code lên GitHub (đã làm tự động khi push)

### 22.5 Cấu hình cần thay đổi trước khi go-live

```javascript
// global.js — CC_CONFIG
BANK_NAME:  "Vietcombank",          // Điền tên ngân hàng thật
BANK_ACC:   "1234567890",           // Điền số tài khoản thật
BANK_OWNER: "CUCKOO CARGO",

// admin/pricing.html
const ADMIN_PASSWORD = '...';       // Đổi mật khẩu mạnh hơn

// google-apps-script.js
// Deploy Web App với đúng Google account, copy URL mới vào CC_CONFIG.SCRIPT_URL
```

---

## PHỤ LỤC — Quick Reference

### A. Tất cả màu sắc brand

| Token | Hex | Dùng cho |
|---|---|---|
| `--orange` | `#F47B20` | Primary brand color, buttons, highlights |
| `--orange-deep` | `#D4650E` | Hover state, gradient end |
| `--black` | `#0F0F10` | Hero backgrounds |
| `--navy` | `#1E3A6E` | UPS color, table headers |
| `--fedex-color` | `#4D148C` | FedEx purple |
| `--usps-color` | `#004B87` | USPS blue |
| `--green` | `#22C55E` | Success, giá hiển thị |

### B. Carrier × Service Matrix

| Carrier | Services | perLbs | maxLbs |
|---|---|---|---|
| UPS | Ground, 3-Day, 2-Day, Overnight | Array[7] | null |
| FedEx | Ground, 3-Day, 2-Day, Overnight | Array[7] | null |
| USPS | Ground, Priority | Array[1] | 20 lbs |
| USPS | Express | null | 10 lbs |

### C. Cấu trúc field ID admin

```
rd-{carrier}-{svcslug}-f{idx}    ← flat rate (idx: 0-3)
rd-{carrier}-{svcslug}-pl{idx}   ← perLbs rate (idx: 0-6)

Ví dụ:
rd-ups-ground-f0      → UPS Ground flat ≤2 lbs
rd-ups-ground-f3      → UPS Ground flat ≤10 lbs
rd-ups-ground-pl0     → UPS Ground perLbs 11-20 lbs
rd-ups-overnight-pl6  → UPS Overnight perLbs 101+ lbs
rd-usps-ground-pl0    → USPS Ground perLbs (single rate)
```

### D. Phím tắt thường dùng

```
Cmd+Shift+R   → Hard refresh (clear cache)
F12           → DevTools
Cmd+P         → DevTools: tìm file nhanh
```

---

*Tài liệu này được tổng hợp từ toàn bộ source code và lịch sử phát triển của dự án Cuckoo Cargo.*  
*Cập nhật lần cuối: tháng 6/2026*
