function doPost(e) {
  var params = JSON.parse(e.postData.getDataAsString());
  var tableIndex = 14; // ライバルセラーテーブルの先頭行
  
  if(params.ranking > params.rankingLimit) {
    // 対象ランキング圏外は無視
    return ;
  }
  // 親シートを取得
  var ss = SpreadsheetApp.openById(SpreadsheetApp.getActiveSpreadsheet().getId());
  var sheet = ss.getSheetByName("シート1");
  // 作成先情報を取得
  var ssId = sheet.getRange('A2').getValues();
  var sheetId = sheet.getRange('B2').getValue();
  // 作成先シートを取得
  var ssCopyTo = SpreadsheetApp.openById(ssId);
  var sheetCopyTo = ssCopyTo.getSheetByName(sheetId);
  if(ssCopyTo.getSheetByName(sheetId+" のコピー") == null) {
    // バックアップを作っていない場合は作成
    sheetCopyTo.copyTo(ssCopyTo);
  }
  var dataIndex = tableIndex;
  while(true) {
    if(dataIndex >= tableIndex + 24) {
      // テーブルからはみ出ないように
      return;
    } else if(sheetCopyTo.getRange(dataIndex, 3).getValues() == "") {
      // ブランドの項目を見て空白だったら入れる
      break;
    }
    dataIndex += 1;
  }
  // データ入力
  if(sheetCopyTo.getRange('E3').getValue() == "") {
    // 商品名が空白の場合はカテゴリ、画像も合わせて設定する
    sheetCopyTo.getRange('E3').setValue(sheetId.replace("【リサーチ】",""));
    sheetCopyTo.getRange('E4').setValue(params.category);
    sheetCopyTo.getRange('B4').setFormula("=IMAGE(\"" + params.image + "\")");
  }
  sheetCopyTo.getRange(dataIndex, 3).setValue(params.brand);
  sheetCopyTo.getRange(dataIndex, 4).setValue(params.price);
  sheetCopyTo.getRange(dataIndex, 5).setValue(params.category);
  sheetCopyTo.getRange(dataIndex, 6).setValue(params.ranking);
  sheetCopyTo.getRange(dataIndex, 13).setValue(params.review.good);
  sheetCopyTo.getRange(dataIndex, 14).setValue(params.review.bad);
  sheetCopyTo.getRange(dataIndex, 16).setValue(params.url);
  sheetCopyTo.getRange(dataIndex, 17).setValue(" ");
  
  return "success";
}
