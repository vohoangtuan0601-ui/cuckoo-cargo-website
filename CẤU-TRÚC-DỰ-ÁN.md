# 🐦 Cuckoo Cargo Website — Cấu Trúc Dự Án

## 📁 Cây thư mục

```
Cuckoo Cargo Website/
│
├── 📄 index.html          ← Trang chủ
├── 📄 my-ve-viet.html     ← Gửi hàng Mỹ → Việt (wizard 7 bước)
├── 📄 noi-dia-my.html     ← Label nội địa Mỹ (UPS/FedEx/USPS)
├── 📄 mua-ho.html         ← Mua hộ hàng Mỹ
├── 📄 tracking.html       ← Tra cứu đơn hàng
├── 📄 san-pham.html       ← Sản phẩm (Ensure, dầu gió)
├── 📄 blog.html           ← Blog & hướng dẫn
├── 📄 lien-he.html        ← Liên hệ
│
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── global.css     ← ⭐ CSS dùng chung (màu sắc, nav, footer, button...)
│   │   └── pages.css      ← CSS riêng từng trang (cards, wizard, tracking...)
│   │
│   ├── 📁 js/
│   │   ├── global.js      ← ⭐ JS dùng chung (nav, footer, lang toggle, toast, Sheets API)
│   │   └── pricing.js     ← ⭐ Bảng giá (cập nhật tại đây → áp dụng toàn site)
│   │
│   ├── 📁 images/         ← Logo, ảnh sản phẩm, ảnh blog
│   └── 📁 fonts/          ← Font tùy chỉnh nếu cần
│
├── 📁 admin/              ← Trang quản trị nội bộ (phase 2)
│
├── 📄 google-apps-script.js  ← Script dán vào Google Apps Script
├── 📄 test-form.html         ← Test kết nối Google Sheet
└── 📄 CẤU-TRÚC-DỰ-ÁN.md    ← File này
```

---

## ⚙️ Cách sử dụng

### Mỗi trang HTML cần có 3 dòng này trong `<head>`:
```html
<link rel="stylesheet" href="assets/css/global.css" />
<link rel="stylesheet" href="assets/css/pages.css" />
```

### Và 2 dòng này trước `</body>`:
```html
<script src="assets/js/global.js"></script>
<script src="assets/js/pricing.js"></script>
```

### Nav + Footer inject tự động:
```html
<header id="cc-nav" class="cc-nav"></header>   <!-- Nav tự điền -->
<footer id="cc-footer" class="cc-footer"></footer> <!-- Footer tự điền -->
<script>
  injectNav('home'); // 'home' | 'mvv' | 'ndm' | 'mh' | 'tracking' | 'sp' | 'blog'
  injectFooter();
</script>
```

---

## 🔧 Cập nhật thông tin quan trọng

### Thay đổi giá cước → `assets/js/pricing.js`
```js
label: {
  UPS:   1.99,   // ← đổi số này
  FedEx: 2.49,   // ← đổi số này
  USPS:  1.69,   // ← đổi số này
},
```

### Thay đổi thông tin liên hệ → `assets/js/global.js`
```js
const CC_CONFIG = {
  PHONE:    "+1 (818) 123-4567",  // ← đổi SĐT
  FACEBOOK: "https://m.me/...",   // ← đổi link
  ZALO:     "https://zalo.me/...",
  EMAIL:    "info@cuckoocargo.com",
  BANK_NAME: "Vietcombank",       // ← điền ngân hàng
  BANK_ACC:  "1234567890",        // ← điền số TK
};
```

### Kết nối Google Sheet → `assets/js/global.js`
```js
SCRIPT_URL: "https://script.google.com/macros/s/xxx/exec", // ← dán URL Apps Script
```

---

## 🎨 Thay đổi màu sắc → `assets/css/global.css`
```css
:root {
  --orange:      #F47B20;  /* Màu cam chính */
  --orange-deep: #D4650E;  /* Cam đậm */
  --black:       #0F0F10;  /* Màu đen */
}
```

---

## 📋 Checklist trước khi deploy

- [ ] Điền `SCRIPT_URL` trong `assets/js/global.js`
- [ ] Điền thông tin ngân hàng QR (BANK_NAME, BANK_ACC)
- [ ] Cập nhật số điện thoại, Facebook, Zalo
- [ ] Điền bảng giá thật vào `assets/js/pricing.js`
- [ ] Upload logo vào `assets/images/`
- [ ] Test form gửi đơn với `test-form.html`
- [ ] Deploy lên Vercel
- [ ] Trỏ domain về Vercel
