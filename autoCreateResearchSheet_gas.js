function doPost(e) {
  var params = JSON.parse(e.postData.getDataAsString());
  var table_index = 14; // ライバルセラーテーブルの先頭行
  
  if(params.ranking > params.ranking_limit) {
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
  var ss_copyTo = SpreadsheetApp.openById(ssId);
  var sheet_copyTo = ss_copyTo.getSheetByName(sheetId);
  if(ss_copyTo.getSheetByName(sheetId+" のコピー") == null) {
    // バックアップを作っていない場合は作成
    sheet_copyTo.copyTo(ss_copyTo);
  }
  var data_index = params.index;
  while(true) {
    if(data_index >= table_index + 24) {
      // テーブルからはみ出ないように
      return;
    }
    else if(sheet_copyTo.getRange(data_index, 3).getValues() == "") {
      // ブランドの項目を見て空白だったら入れる
      break;
    }
    data_index += 1;
  }
  // データ入力
  if(sheet_copyTo.getRange(3, 5).getValue() == "") {
    // 商品名が空白の場合はカテゴリ、画像も合わせて設定する
    sheet_copyTo.getRange(3, 5).setValue(sheetId.replace("【リサーチ】",""));
    sheet_copyTo.getRange(4, 5).setValue(params.ranking);
    sheet_copyTo.getRange(4, 2).setFormula("=IMAGE(\"" + params.image + "\")");
  }
  sheet_copyTo.getRange(data_index, 3).setValue(params.brand);
  sheet_copyTo.getRange(data_index, 4).setValue(params.price);
  sheet_copyTo.getRange(data_index, 5).setValue(params.category);
  sheet_copyTo.getRange(data_index, 6).setValue(params.ranking);
  sheet_copyTo.getRange(data_index, 13).setValue(params.review.good);
  sheet_copyTo.getRange(data_index, 14).setValue(params.review.bad);
  sheet_copyTo.getRange(data_index, 16).setValue(params.url);
  sheet_copyTo.getRange(data_index, 17).setValue(" ");
  

  return "success";
}
