/* ═══════════════════════════════════════════════════════════
   CUCKOO CARGO — Bảng Giá
   ⚠️ Cập nhật giá tại admin/pricing.html
   ═══════════════════════════════════════════════════════════ */

const CC_PRICING = {

  // ── GỬI HÀNG MỸ → VIỆT ──────────────────────────────────
  mvv: [
    { from: 0,    to: 10,   price: 3.89 },
    { from: 10,   to: 50,   price: 3.89 },
    { from: 50,   to: 90,   price: 3.79 },
    { from: 90,   to: 150,  price: 3.59 },
    { from: 150,  to: 9999, price: 3.49 },
  ],

  deliveryVN: { sgHn: 0, province: 0.99 },

  customs: {
    ruou:          14,
    cigar:         20,
    nuocHoa:       7,
    vitaminMyPham: 0.99,
    dienThoaiCu:   60,
    dienThoaiMoi:  90,
    taiNgheAirpod: 12,
    vaccinMayYTe:  0.2000,
    dienTuKhac:    0.1000,
  },

  insurance: {
    Free:    { price: 0,     perLbs: 5,    maxCover: 100,  label: 'FREE — Miễn phí'                 },
    Pro:     { price: 19.99, perLbs: 12,   maxCover: 500,  label: 'PRO — Bảo vệ nâng cao'           },
    ProMax:  { price: 59.99, perLbs: 20,   maxCover: 800,  label: 'PRO MAX — Bảo vệ tối thượng'     },
    Special: { price: null,  perLbs: null, maxCover: null, label: 'SPECIAL — Theo giá trị khai báo' },
  },

  packaging: {
    'Miễn phí':   { rate: 0,    label: 'Miễn phí'   },
    'Tiêu chuẩn': { rate: 0.39, label: '+$0.39/lbs' },
    'Nâng cao':   { rate: 0.69, label: '+$0.69/lbs' },
  },

  muaHo: 0.05,

  // ── LABEL NỘI ĐỊA MỸ ────────────────────────────────────
  upsPickup:         9.65,
  upsPickupApt:     16.15,
  upsHeavySurcharge: 27.00,

  // flat: giá cố định ≤10 lbs theo [≤2, ≤5, ≤8, ≤10] lbs
  // perLbs: mảng $/lbs [11-20, 21-30, 31-40, 41-50, 51-70, 71-100, 101+]
  rateData: {
    'ups-Ground':    { flat:[{max:2,p:17 },{max:5,p:25 },{max:8,p:28 },{max:10,p:32 }], perLbs:[1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99], maxLbs:null },
    'ups-3-Day':     { flat:[{max:2,p:25 },{max:5,p:39 },{max:8,p:52 },{max:10,p:59 }], perLbs:[4.69, 4.69, 4.69, 4.69, 4.69, 4.69, 4.69], maxLbs:null },
    'ups-2-Day':     { flat:[{max:2,p:31 },{max:5,p:55 },{max:8,p:72 },{max:10,p:82 }], perLbs:[6.49, 6.49, 6.49, 6.49, 6.49, 6.49, 6.49], maxLbs:null },
    'ups-Overnight': { flat:[{max:2,p:89 },{max:5,p:109},{max:8,p:129},{max:10,p:142}], perLbs:[10.69,10.69,10.69,10.69,10.69,10.69,10.69], maxLbs:null },

    'fedex-Ground':    { flat:[{max:2,p:34 },{max:5,p:38 },{max:8,p:40 },{max:10,p:43 }], perLbs:[2.99, 2.99, 2.99, 2.99, 2.99, 2.99, 2.99],   maxLbs:null },
    'fedex-3-Day':     { flat:[{max:2,p:69 },{max:5,p:89 },{max:8,p:112},{max:10,p:135}], perLbs:[12.79,12.79,12.79,12.79,12.79,12.79,12.79], maxLbs:null },
    'fedex-2-Day':     { flat:[{max:2,p:82 },{max:5,p:103},{max:8,p:135},{max:10,p:159}], perLbs:[15.19,15.19,15.19,15.19,15.19,15.19,15.19], maxLbs:null },
    'fedex-Overnight': { flat:[{max:2,p:139},{max:5,p:155},{max:8,p:195},{max:10,p:209}], perLbs:[19.79,19.79,19.79,19.79,19.79,19.79,19.79], maxLbs:null },

    'usps-Ground':   { flat:[{max:2,p:22 },{max:5,p:29 },{max:8,p:37 },{max:10,p:42 }], perLbs:[3.99], maxLbs:20 },
    'usps-Priority': { flat:[{max:2,p:29 },{max:5,p:52 },{max:8,p:67 },{max:10,p:75 }], perLbs:[5.99], maxLbs:20 },
    'usps-Express':  { flat:[{max:2,p:129},{max:5,p:179},{max:8,p:229},{max:10,p:265}], perLbs:null,   maxLbs:10 },
  },

};

// ── HÀM TÍNH GIÁ ─────────────────────────────────────────────

function calcLabelPrice(carrier, service, weightLbs, pickupMode = 'dropoff', addrType = 'house') {
  const key = carrier.toLowerCase() + '-' + service;
  const data = CC_PRICING.rateData[key];
  if (!data) return null;

  const PERLBS_RANGES = [[11,20],[21,30],[31,40],[41,50],[51,70],[71,100],[101,9999]];
  let cost;
  if (weightLbs <= 10) {
    const tier = data.flat.find(f => weightLbs <= f.max);
    cost = tier ? tier.p : data.flat[data.flat.length - 1].p;
  } else {
    if (!data.perLbs) return null;
    if (data.maxLbs && weightLbs > data.maxLbs) return null;
    let rate;
    if (Array.isArray(data.perLbs)) {
      let idx = data.perLbs.length - 1;
      for (let i = 0; i < PERLBS_RANGES.length; i++) {
        if (weightLbs >= PERLBS_RANGES[i][0] && weightLbs <= PERLBS_RANGES[i][1]) {
          idx = Math.min(i, data.perLbs.length - 1);
          break;
        }
      }
      rate = data.perLbs[idx];
    } else {
      rate = data.perLbs;
    }
    if (rate == null) return null;
    cost = weightLbs * rate;
  }

  if (carrier.toLowerCase() === 'ups' && pickupMode === 'pickup') {
    cost += addrType === 'apt' ? CC_PRICING.upsPickupApt : CC_PRICING.upsPickup;
  }
  if (carrier.toLowerCase() === 'ups' && weightLbs > 50) {
    cost += CC_PRICING.upsHeavySurcharge;
  }

  return cost;
}

function calcMVVPrice(weightLbs) {
  const effective = weightLbs < 10 ? 10 : weightLbs;
  const tier = CC_PRICING.mvv.find(t => effective >= t.from && effective < t.to);
  if (!tier) return null;
  return effective * tier.price;
}

function formatPrice(usd) {
  if (usd === null) return 'Liên hệ báo giá';
  return '$' + usd.toFixed(2);
}
