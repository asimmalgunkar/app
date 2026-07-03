// Google Sheets backend script
// 1) Create a Google Sheet with the same headers as the Excel template.
// 2) Extensions > Apps Script, paste this code.
// 3) Deploy > New deployment > Web app > Anyone with link.
// 4) Copy Web App URL into the website Settings page.
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Daily_Submissions') || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.id, data.date, data.time, data.store, data.department, data.posId, data.cashier, data.manager, data.shift, data.floatAmount,
    data.qty_1000, data.total_1000, data.qty_500, data.total_500, data.qty_200, data.total_200, data.qty_100, data.total_100,
    data.qty_50, data.total_50, data.qty_20, data.total_20, data.qty_10, data.total_10, data.qty_5, data.total_5,
    data.coins, data.cash, data.visa, data.mastercard, data.amex, data.tpv, data.otherCard, data.card,
    data.usd, data.gbp, data.eur, data.sar, data.omr, data.kwd, data.bhd, data.qar, data.foreign,
    data.grand, data.expectedTotal, data.diff, data.status, data.comment, data.createdAt
  ]);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
