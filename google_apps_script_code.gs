// Daily Collection Google Sheets backend
// Spreadsheet linked by user:
const SPREADSHEET_ID = '1yv0EUSpwPzA_-5nb_zPBsMYIwOUZlvP_ZIolXeLljvg';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    const mainHeaders = [
      'CollectionID','SubmittedAt','CollectionDate','Store','Department','POSID','Shift',
      'Cashier','Manager','OpeningFloat','ExpectedCash','ActualCashTotal','CardTotal',
      'ForeignCurrencyAED','GrandTotal','Difference','Status','Remarks'
    ];
    const denomHeaders = ['CollectionID','CollectionDate','Store','Denomination','Quantity','Total'];
    const cardHeaders = ['CollectionID','CollectionDate','Store','PaymentMethod','Amount'];

    const mainSheet = getOrCreateSheet_(ss, 'DailyCollection', mainHeaders);
    const denomSheet = getOrCreateSheet_(ss, 'Denominations', denomHeaders);
    const cardSheet = getOrCreateSheet_(ss, 'CardPayments', cardHeaders);

    const collectionDate = payload.collectionDate || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');

    mainSheet.appendRow([
      payload.collectionId || '',
      payload.submittedAt || new Date().toISOString(),
      collectionDate,
      payload.store || '',
      payload.department || '',
      payload.posId || '',
      payload.shift || '',
      payload.cashier || '',
      payload.manager || '',
      Number(payload.openingFloat || 0),
      Number(payload.expectedCash || 0),
      Number(payload.actualCashTotal || 0),
      Number(payload.cardTotal || 0),
      Number(payload.foreignCurrencyAED || 0),
      Number(payload.grandTotal || 0),
      Number(payload.difference || 0),
      payload.status || 'Submitted',
      payload.remarks || ''
    ]);

    if (Array.isArray(payload.denominations)) {
      payload.denominations.forEach(d => {
        denomSheet.appendRow([
          payload.collectionId || '', collectionDate, payload.store || '',
          Number(d.denomination || 0), Number(d.quantity || 0), Number(d.total || 0)
        ]);
      });
    }

    if (Array.isArray(payload.cards)) {
      payload.cards.forEach(c => {
        cardSheet.appendRow([
          payload.collectionId || '', collectionDate, payload.store || '',
          c.paymentMethod || '', Number(c.amount || 0)
        ]);
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, collectionId: payload.collectionId || '' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Daily Collection Google Sheets backend is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}
