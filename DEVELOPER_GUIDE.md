# CUCKOO CARGO — DEVELOPER GUIDE

> Tài liệu kỹ thuật dành cho IT / Developer. Đọc file này trước khi chỉnh sửa bất kỳ thứ gì.

---

## 1. DỰ ÁN NÀY LÀ GÌ?

Website thương mại cho **Cuckoo Cargo** — dịch vụ gửi hàng Mỹ↔Việt Nam.  
**Không có server, không có database.** Toàn bộ là file HTML/CSS/JS tĩnh — mở trực tiếp trên trình duyệt hoặc deploy lên CDN (Vercel/GitHub Pages).

---

## 2. CẤU TRÚC FILE — ĐỌC GÌ TRƯỚC?

```
Cuckoo Cargo Website/
│
├── assets/js/
│   ├── pricing.js   ⭐ QUAN TRỌNG NHẤT — chứa toàn bộ dữ liệu giá
│   ├── lang.js      — hệ thống dịch VI/EN
│   ├── global.js    — nav, config, search
│   └── ward-data.js — dữ liệu tỉnh/quận/phường Việt Nam
│
├── assets/css/
│   ├── global.css   — style toàn site + CSS variables
│   ├── pages.css    — style các section dùng chung
│   └── mobile.css   — responsive (load CUỐI, luôn thắng)
│
├── admin/
│   └── pricing.html — trang quản trị giá (có password)
│
├── index.html        — Trang chủ
├── my-ve-viet.html   — Form đặt đơn Mỹ→Việt (7 bước)
├── noi-dia-my.html   — Bảng giá + đặt label nội địa Mỹ
├── mua-ho.html       — Dịch vụ mua hộ
├── san-pham.html     — Sản phẩm (Ensure, dầu gió)
├── tracking.html     — Tra cứu đơn hàng
├── blog.html         — Blog
├── lien-he.html      — Liên hệ
└── dieu-khoan.html   — Điều khoản
```

---

## 3. QUY TẮC CSS — ĐỌC TRƯỚC KHI SỬA STYLE

### Thứ tự load (RẤT QUAN TRỌNG)
```html
<link rel="stylesheet" href="assets/css/global.css" />   ← 1. Load đầu
<link rel="stylesheet" href="assets/css/pages.css" />    ← 2.
<link rel="stylesheet" href="assets/css/mobile.css" />   ← 3. Load CUỐI — luôn thắng !important
```

> **Nếu mobile bị sai:** tìm trong `mobile.css` trước. Nó dùng `!important` nên override mọi thứ khác.

### CSS Variables (dùng thay vì hardcode màu)
```css
--orange:       #F47B20   /* màu chủ đạo brand */
--orange-deep:  #D4650E   /* hover state */
--black:        #0F0F10   /* nền hero */
--gray-border:  #E5E5EA   /* đường kẻ, border */
--text-primary: #0F0F10   /* chữ chính */
--text-muted:   #8E8E93   /* chữ phụ */
--green:        #22C55E   /* success, giá */
--navy:         #1E3A6E   /* màu UPS, table header */
```

---

## 4. QUY TẮC JAVASCRIPT — ĐỌC TRƯỚC KHI SỬA JS

### Thứ tự load script (KHÔNG được đổi thứ tự)
```html
<!-- Cuối <body>, đúng thứ tự này -->
<script src="assets/js/lang.js"></script>      ← PHẢI ĐẦU TIÊN
<script src="assets/js/pricing.js"></script>
<script src="assets/js/global.js"></script>
<script src="assets/js/ward-data.js"></script> ← Chỉ trang cần địa chỉ VN
<script>
  injectNav('page-id');  ← Page-specific code ở đây
</script>
```

> **Nếu console báo `CC_PRICING is not defined`:** script load sai thứ tự, hoặc `pricing.js` có lỗi syntax.

### Các biến global (dùng được từ mọi nơi)
| Tên | File | Dùng để |
|-----|------|---------|
| `CC_PRICING` | pricing.js | Toàn bộ dữ liệu giá |
| `calcLabelPrice(carrier, svc, lbs, pickup, addrType)` | pricing.js | Tính giá label nội địa |
| `calcMVVPrice(lbs)` | pricing.js | Tính giá gửi Mỹ→Việt |
| `formatPrice(usd)` | pricing.js | Format `$12.50` hoặc `'Liên hệ báo giá'` |
| `CC_CONFIG` | global.js | Phone, links mạng xã hội, Google Script URL |
| `injectNav('id')` | global.js | Render thanh nav vào `<div id="cc-nav">` |
| `window.setLang('vi'/'en')` | lang.js | Đổi ngôn ngữ toàn trang |
| `window.currentLang` | lang.js | Ngôn ngữ đang dùng (`'vi'` hoặc `'en'`) |

---

## 5. FILE QUAN TRỌNG NHẤT — pricing.js

Đây là **nguồn giá duy nhất** của toàn site. Mọi trang đọc giá từ đây.

### Cấu trúc CC_PRICING
```javascript
const CC_PRICING = {

  // Giá gửi Mỹ → Việt ($/lbs)
  mvv: [
    { from: 0,   to: 10,  price: 3.89 },
    { from: 10,  to: 50,  price: 3.89 },
    { from: 50,  to: 90,  price: 3.79 },
    { from: 90,  to: 150, price: 3.59 },
    { from: 150, to: 9999,price: 3.49 },
  ],

  deliveryVN: { sgHn: 0, province: 0.99 }, // Phí giao nội địa VN

  customs: {               // Phí hải quan ($/lbs)
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

  insurance: {             // Gói bảo hiểm
    Free:    { price: 0,     perLbs: 5,    maxCover: 100  },
    Pro:     { price: 19.99, perLbs: 12,   maxCover: 500  },
    ProMax:  { price: 59.99, perLbs: 20,   maxCover: 800  },
    Special: { price: null,  perLbs: null, maxCover: null },
  },

  packaging: {             // Phí đóng gói
    'Miễn phí':   { rate: 0    },
    'Tiêu chuẩn': { rate: 0.39 },
    'Nâng cao':   { rate: 0.69 },
  },

  muaHo: 0.05,             // Phí mua hộ: 5%

  // Phụ phí UPS
  upsPickup:          9.65,
  upsPickupApt:      16.15,
  upsHeavySurcharge: 27.00,  // Khi >50 lbs

  // Giá label nội địa
  // flat   = giá cố định ≤10 lbs (4 bậc: ≤2, ≤5, ≤8, ≤10)
  // perLbs = mảng $/lbs cho [11-20, 21-30, 31-40, 41-50, 51-70, 71-100, 101+] lbs
  // maxLbs = giới hạn tối đa (null = không giới hạn)
  rateData: {
    'ups-Ground':    { flat:[...], perLbs:[1.99,1.99,1.99,1.99,1.99,1.99,1.99], maxLbs:null },
    'ups-3-Day':     { flat:[...], perLbs:[4.69,4.69,4.69,4.69,4.69,4.69,4.69], maxLbs:null },
    'ups-2-Day':     { flat:[...], perLbs:[6.49,6.49,6.49,6.49,6.49,6.49,6.49], maxLbs:null },
    'ups-Overnight': { flat:[...], perLbs:[10.69,...],                           maxLbs:null },
    // fedex tương tự...
    'usps-Ground':   { flat:[...], perLbs:[3.99],  maxLbs:20  }, // 1 mức, tối đa 20 lbs
    'usps-Priority': { flat:[...], perLbs:[5.99],  maxLbs:20  },
    'usps-Express':  { flat:[...], perLbs:null,    maxLbs:10  }, // không tính theo lbs
  },
};
```

> **Để thay đổi giá:** Dùng trang `admin/pricing.html` (cần password). **Không sửa tay `pricing.js`** trừ khi biết rõ mình đang làm gì.

---

## 6. HỆ THỐNG ĐA NGÔN NGỮ

### Cách dịch trong HTML (đơn giản)
```html
<span data-vi="Gửi hàng ngay" data-en="Ship Now">Gửi hàng ngay</span>
```
`setLang()` sẽ tự động swap nội dung khi người dùng đổi ngôn ngữ.

### Cách dịch nội dung phức tạp (có HTML tags)
Thêm vào dictionary `PAGES` trong `lang.js`:
```javascript
'.hero h1': {
  vi: 'Vận Chuyển <span>Mỹ–Việt</span>',
  en: 'US–Vietnam <span>Shipping</span>'
}
```

### Ngôn ngữ được lưu trong
```javascript
localStorage.getItem('cc-lang')  // 'vi' hoặc 'en'
```

---

## 7. THÊM TRANG MỚI — Checklist

Khi tạo một trang HTML mới, cần đảm bảo:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tiêu đề trang | Cuckoo Cargo</title>

  <!-- CSS — đúng thứ tự -->
  <link rel="stylesheet" href="assets/css/global.css" />
  <link rel="stylesheet" href="assets/css/pages.css" />
  <link rel="stylesheet" href="assets/css/mobile.css" />
  <style>
    /* CSS riêng của trang — đặt SAU mobile.css để không bị override */
  </style>
</head>
<body id="page-ten-trang">   <!-- ← id này để lang.js nhận diện trang -->

  <div id="cc-nav"></div>    <!-- ← Nav sẽ được inject vào đây -->

  <!-- Nội dung trang -->

  <!-- JS — đúng thứ tự, cuối body -->
  <script src="assets/js/lang.js"></script>
  <script src="assets/js/pricing.js"></script>
  <script src="assets/js/global.js"></script>
  <script>
    injectNav('page-id');    // ← id của link nav cần active
  </script>
</body>
</html>
```

Sau đó thêm link vào `injectNav()` trong `global.js`:
```javascript
const links = [
  ...
  { href: 'trang-moi.html', vi: 'Tên VI', en: 'Name EN', id: 'trang-moi' },
];
```

---

## 8. ADMIN PANEL — admin/pricing.html

**Truy cập:** Mở file `admin/pricing.html` trực tiếp trên Chrome.  
**Password:** Xin từ quản lý.

### Chức năng
- Tab **MVV**: Chỉnh giá gửi Mỹ→Việt, hải quan, bảo hiểm, đóng gói
- Tab **Label**: Chỉnh giá UPS/FedEx/USPS nội địa Mỹ

### Lưu giá
1. Nhấn **"Chọn file"** → chọn `assets/js/pricing.js`
2. Nhấn **"Lưu & Cập nhật"** → file được ghi trực tiếp
3. Commit & push lên GitHub → Vercel tự deploy

> **Chỉ hoạt động trên Chrome/Edge.** Safari phải download file rồi thay thủ công.

---

## 9. FORM SUBMISSION — Google Apps Script

Tất cả form (đặt đơn, liên hệ, mua hộ) gửi dữ liệu đến Google Apps Script:

```javascript
// URL được khai báo trong global.js → CC_CONFIG.SCRIPT_URL
fetch(CC_CONFIG.SCRIPT_URL, {
  method: 'POST',
  body: JSON.stringify({ action: 'submitOrder', data: { ... } })
})
```

Dữ liệu được ghi vào Google Sheets. Nếu form không gửi được, kiểm tra:
1. `CC_CONFIG.SCRIPT_URL` có đúng không
2. Google Apps Script có đang deploy không (Google account cần re-authorize định kỳ)

---

## 10. DEPLOY — GitHub + Vercel

```
Sửa code → git add . → git commit → git push origin main
→ Vercel tự động deploy trong ~30 giây
```

| Môi trường | URL |
|---|---|
| Production (Vercel) | https://cuckoo-cargo-website-lkjojb9ga-vohoangtuan0601-uis-projects.vercel.app |
| GitHub Pages | https://cuckoocargo23102025.github.io/cuckoocargo.com/ |
| GitHub Repo | https://github.com/vohoangtuan0601-ui/cuckoo-cargo-website |

---

## 11. DEBUG — LỖI THƯỜNG GẶP

| Triệu chứng | Kiểm tra |
|---|---|
| Trang trắng / không render | DevTools → Console → tìm SyntaxError |
| `CC_PRICING is not defined` | `pricing.js` có lỗi syntax, hoặc load sai thứ tự |
| Giá không cập nhật sau khi sửa | Hard refresh: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Win) |
| Mobile layout sai | Tìm trong `mobile.css` — có thể cần thêm `!important` |
| Form không submit | Kiểm tra `CC_CONFIG.SCRIPT_URL` và trạng thái Google Apps Script |
| Nav không hiển thị | Kiểm tra có `<div id="cc-nav"></div>` và `injectNav()` chưa |
| Ngôn ngữ không đổi | Kiểm tra element có `data-vi`/`data-en`, hoặc thêm vào PAGES trong `lang.js` |

---

## 12. NHỮNG THỨ KHÔNG ĐƯỢC LÀM

| ❌ Không làm | ✅ Làm thế này thay |
|---|---|
| Hardcode giá trong HTML | Đọc từ `CC_PRICING` trong `pricing.js` |
| Hardcode màu hex trong CSS | Dùng CSS variable `var(--orange)` |
| Hardcode phone/email trong HTML | Dùng `CC_CONFIG.PHONE`, `CC_CONFIG.EMAIL` |
| Sửa giá trực tiếp trong `pricing.js` | Dùng trang `admin/pricing.html` |
| Đổi thứ tự load script | Thứ tự load ảnh hưởng đến toàn bộ tính năng |
| Dùng `localStorage` cho admin auth | Đã dùng `sessionStorage` — hết phiên là logout |

---

*Cần hỗ trợ: cuckoocargo.us@gmail.com*
