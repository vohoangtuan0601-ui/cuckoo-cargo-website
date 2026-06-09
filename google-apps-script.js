/**
 * CUCKOO CARGO — Google Apps Script
 * Paste toàn bộ file này vào Google Apps Script Editor
 * Deploy as Web App → Anyone can access
 *
 * Cách dùng: https://script.google.com/home → New Project → paste code này
 */

// ─── CẤU HÌNH ───────────────────────────────────────────────────────────────
const SHEET_ID = "1HXUV1N4tRUK0vAEYz_IiQ7vjODWuMfRmeWf2kPljfwE";
// Sheet ID nằm trong URL của Google Sheet:
// https://docs.google.com/spreadsheets/d/[SHEET_ID_Ở_ĐÂY]/edit

const SHEETS = {
  ORDERS:    "ORDERS",
  TRACKING:  "TRACKING",
  CUSTOMERS: "CUSTOMERS",
  LABELS:    "LABELS",    // Nội địa Mỹ
  SHOPPING:  "SHOPPING",  // Mua hộ
};

// ─── HÀM CHÍNH: Nhận POST từ form HTML ──────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.formType; // "order" | "label" | "shopping"
    let result = {};

    if (type === "order") {
      result = handleOrder(data);
    } else if (type === "label") {
      result = handleLabel(data);
    } else if (type === "shopping") {
      result = handleShopping(data);
    } else if (type === "addTracking") {
      result = handleAddTracking(data);
    } else {
      throw new Error("formType không hợp lệ: " + type);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, ...result }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Cho phép GET để test + truy vấn đơn hàng + tạo mã khách hàng
function doGet(e) {
  const params = e.parameter || {};

  if (params.action === 'getOrder' && params.orderId) {
    return getOrderData(params.orderId);
  }

  if (params.action === 'generateCode' && params.phone) {
    return generateCustomerCode(params.phone);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "Cuckoo Cargo Script OK" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Tạo mã khách hàng unique dựa trên số điện thoại
 * GET ?action=generateCode&phone=0909123456
 * → { success: true, code: "CAC3456" }
 */
function generateCustomerCode(phone) {
  // Lấy 4 số cuối của SĐT
  var digits = (phone || '').replace(/\D/g, '');
  var last4  = digits.length >= 4 ? digits.slice(-4) : digits.padStart(4, '0');
  var base   = 'CAC' + last4;

  // Lấy tất cả mã đã tồn tại từ CUSTOMERS sheet
  var existingCodes = [];
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEETS.CUSTOMERS);
    if (sheet && sheet.getLastRow() > 1) {
      var vals = sheet.getDataRange().getValues();
      existingCodes = vals.slice(1).map(function(r) {
        return (r[0] || '').toString().toUpperCase().trim();
      }).filter(function(c) { return c.length > 0; });
    }
  } catch(e) {
    // Nếu không đọc được sheet, trả về base code
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, code: base }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Nếu base code chưa tồn tại → dùng luôn
  var code = base;
  if (existingCodes.indexOf(base.toUpperCase()) !== -1) {
    // Thử thêm suffix 0–9
    var found = false;
    for (var i = 0; i <= 9; i++) {
      var candidate = base + i;
      if (existingCodes.indexOf(candidate.toUpperCase()) === -1) {
        code  = candidate;
        found = true;
        break;
      }
    }
    // Nếu 0–9 đều trùng, thêm suffix 2 chữ số ngẫu nhiên
    if (!found) {
      var suffix = Math.floor(10 + Math.random() * 90).toString();
      code = base + suffix;
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true, code: code }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Truy vấn thông tin đơn hàng + lịch sử tracking theo orderId
 * GET ?action=getOrder&orderId=HTS202606076740
 */
function getOrderData(orderId) {
  orderId = (orderId || '').toString().toUpperCase().trim();
  const ss = SpreadsheetApp.openById(SHEET_ID);

  // Tìm trong tất cả sheet đơn hàng
  let orderInfo = null;
  const orderSheets = [SHEETS.ORDERS, SHEETS.LABELS, SHEETS.SHOPPING];

  for (var si = 0; si < orderSheets.length; si++) {
    var sheet = ss.getSheetByName(orderSheets[si]);
    if (!sheet || sheet.getLastRow() < 2) continue;

    var values = sheet.getDataRange().getValues();
    var headers = values[0];

    for (var i = 1; i < values.length; i++) {
      if ((values[i][0] || '').toString().toUpperCase().trim() === orderId) {
        orderInfo = { _sheet: orderSheets[si] };
        for (var j = 0; j < headers.length; j++) {
          orderInfo[headers[j]] = values[i][j] !== undefined ? values[i][j].toString() : '';
        }
        break;
      }
    }
    if (orderInfo) break;
  }

  // Lấy tất cả tracking events
  var trackingEvents = [];
  var trackingSheet = ss.getSheetByName(SHEETS.TRACKING);
  if (trackingSheet && trackingSheet.getLastRow() > 1) {
    var tValues = trackingSheet.getDataRange().getValues();
    for (var ti = 1; ti < tValues.length; ti++) {
      if ((tValues[ti][0] || '').toString().toUpperCase().trim() === orderId) {
        trackingEvents.push({
          orderId:  tValues[ti][0] || '',
          time:     tValues[ti][1] ? tValues[ti][1].toString() : '',
          status:   tValues[ti][2] || '',
          location: tValues[ti][3] || '',
          note:     tValues[ti][4] || '',
        });
      }
    }
  }

  var result = {
    success:  true,
    found:    orderInfo !== null || trackingEvents.length > 0,
    order:    orderInfo,
    tracking: trackingEvents,
  };

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// CORS OPTIONS preflight
function doOptions() {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ─── XỬ LÝ ĐƠN HÀNG MỸ → VIỆT ──────────────────────────────────────────────
function handleOrder(data) {
  const ss       = SpreadsheetApp.openById(SHEET_ID);
  const sheet    = ss.getSheetByName(SHEETS.ORDERS);
  const orderId  = data.orderId || generateOrderId();
  const now      = formatDate(new Date());

  // Thêm header nếu sheet còn trống
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Order ID", "Ngày tạo", "Loại dịch vụ",
      "Tên Facebook", "Họ tên người gửi", "Mã KH",
      "Email", "SĐT Mỹ",
      "Tên người nhận", "SĐT người nhận", "Địa chỉ VN",
      "Mặt hàng", "Giá trị khai báo ($)",
      "Cân nặng (lbs)", "Bảo hiểm", "Đóng gói",
      "Phí ước tính ($)", "Tracking Code",
      "Trạng thái", "Nhân viên xử lý", "Ghi chú",
    ]);
    formatHeader(sheet);
  }

  sheet.appendRow([
    orderId,
    now,
    "Mỹ → Việt",
    data.facebookName || "",
    data.senderName   || "",
    data.customerCode || "",
    data.email        || "",
    data.phoneUS      || "",
    data.receiverName || "",
    data.receiverPhone|| "",
    data.receiverAddress || "",
    data.items        || "",
    data.declaredValue|| "",
    data.weight       || "",
    data.insurance    || "Free",
    data.packaging    || "Tiêu chuẩn",
    data.estimatedFee || "",
    "",                       // Tracking Code — nhân viên điền sau
    "Mới tạo",                // Trạng thái
    "",                       // Nhân viên
    data.note         || "",
  ]);

  // Thêm dòng đầu vào TRACKING
  addTrackingEvent(ss, orderId, "Đơn hàng được tạo", "Online");

  // Cập nhật hoặc thêm khách hàng
  upsertCustomer(ss, data);

  return { orderId };
}

// ─── XỬ LÝ BOOK LABEL NỘI ĐỊA MỸ ───────────────────────────────────────────
function handleLabel(data) {
  const ss      = SpreadsheetApp.openById(SHEET_ID);
  const sheet   = ss.getSheetByName(SHEETS.LABELS);
  const labelId = data.orderId || generateLabelId();
  const now     = formatDate(new Date());

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Label ID", "Ngày tạo", "Hãng vận chuyển", "Dịch vụ con",
      "Tên Facebook", "Họ tên", "Mã KH", "Email", "SĐT Mỹ",
      "Hình thức", "Ngày pickup", "Giờ pickup",
      "Địa chỉ lấy hàng",
      "Tên người nhận", "SĐT người nhận", "Địa chỉ người nhận",
      "Cân nặng (lbs)", "Bảo hiểm", "Phí ($)",
      "Trạng thái", "File Label", "Ghi chú",
    ]);
    formatHeader(sheet);
  }

  sheet.appendRow([
    labelId,
    now,
    data.carrier     || "",  // UPS / FedEx / USPS
    data.service     || "",  // Ground / 2Day / Overnight...
    data.facebookName|| "",
    data.senderName  || "",
    data.customerCode|| "",
    data.email       || "",
    data.phoneUS     || "",
    data.pickupMode  || "Drop-off",
    data.pickupDate  || "",
    data.pickupTime  || "",
    data.pickupAddress || "",
    data.receiverName || "",
    data.receiverPhone|| "",
    data.receiverAddress || "",
    data.weight      || "",
    data.insurance   || "Free",
    data.estimatedFee|| "",
    "Chờ xử lý",
    "",  // File Label — admin điền sau
    data.note        || "",
  ]);

  upsertCustomer(ss, data);

  return { labelId };
}

// ─── XỬ LÝ MUA HỘ ────────────────────────────────────────────────────────────
function handleShopping(data) {
  const ss         = SpreadsheetApp.openById(SHEET_ID);
  const sheet      = ss.getSheetByName(SHEETS.SHOPPING);
  const shoppingId = data.orderId || generateShoppingId();
  const now        = formatDate(new Date());

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Shopping ID", "Ngày tạo",
      "Tên Facebook", "Họ tên", "Mã KH", "Email",
      "Link sản phẩm 1", "SL 1", "Size 1", "Màu 1",
      "Link sản phẩm 2", "SL 2", "Size 2", "Màu 2",
      "Link sản phẩm 3", "SL 3", "Size 3", "Màu 3",
      "Địa chỉ VN",
      "Báo giá ($)", "Trạng thái", "Ghi chú",
    ]);
    formatHeader(sheet);
  }

  const items = data.items || [];

  sheet.appendRow([
    shoppingId,
    now,
    data.facebookName   || "",
    data.customerName   || "",
    data.customerCode   || "",
    data.email          || "",
    items[0]?.url       || "", items[0]?.qty || "", items[0]?.size || "", items[0]?.color || "",
    items[1]?.url       || "", items[1]?.qty || "", items[1]?.size || "", items[1]?.color || "",
    items[2]?.url       || "", items[2]?.qty || "", items[2]?.size || "", items[2]?.color || "",
    data.receiverAddress|| "",
    "",           // Báo giá — admin điền sau
    "Chờ báo giá",
    data.note     || "",
  ]);

  upsertCustomer(ss, data);

  return { shoppingId };
}

// ─── HÀM HỖ TRỢ ─────────────────────────────────────────────────────────────

// ─── CẬP NHẬT TRACKING TỪ ADMIN ─────────────────────────────────────────────
function handleAddTracking(data) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  addTrackingEvent(ss, data.orderId, data.status, data.location || "", data.note || "");
  return { orderId: data.orderId };
}

function addTrackingEvent(ss, orderId, status, location) {
  const sheet = ss.getSheetByName(SHEETS.TRACKING);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Order ID", "Thời gian", "Trạng thái", "Địa điểm", "Ghi chú"]);
    formatHeader(sheet);
  }

  const note = arguments[4] || "";
  sheet.appendRow([orderId, formatDate(new Date()), status, location, note]);
}

function upsertCustomer(ss, data) {
  if (!data.customerCode && !data.email) return;

  const sheet = ss.getSheetByName(SHEETS.CUSTOMERS);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Mã KH", "Họ tên", "Facebook", "Email", "SĐT Mỹ", "Ngày đầu tiên", "Tổng đơn", "VIP"]);
    formatHeader(sheet);
  }

  // Tìm khách đã tồn tại theo email
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][3] === data.email) {
      // Cập nhật tổng đơn
      sheet.getRange(i + 1, 7).setValue((values[i][6] || 0) + 1);
      return;
    }
  }

  // Thêm khách mới
  sheet.appendRow([
    data.customerCode || "",
    data.senderName || data.customerName || "",
    data.facebookName || "",
    data.email || "",
    data.phoneUS || "",
    formatDate(new Date()),
    1,
    "No",
  ]);
}

function generateOrderId() {
  var d    = new Date();
  var yyyy = d.getFullYear();
  var mm   = ("0" + (d.getMonth() + 1)).slice(-2);
  var dd   = ("0" + d.getDate()).slice(-2);
  var rand = Math.floor(1000 + Math.random() * 9000);
  return "HTS" + yyyy + mm + dd + rand;
}

function generateLabelId()    { return generateOrderId(); }
function generateShoppingId() { return generateOrderId(); }

function formatDate(date) {
  return Utilities.formatDate(date, "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm");
}

function formatHeader(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setBackground("#F47B20");   // Màu cam Cuckoo Cargo
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  sheet.setFrozenRows(1);
}
