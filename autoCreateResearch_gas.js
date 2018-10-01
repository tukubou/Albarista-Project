function doPost(e) {
  const params = JSON.parse(e.postData.getDataAsString());
  const table_index = 14; // ライバルセラーテーブルの先頭行
  const brand = params.brand; // ブランド
  const price = params.price; // 販売価格
  const ranking = params.ranking;　// ランキング
  const category = params.category; // 大カテゴリ
  const url = params.url;　　　　　　 // URL
  const review_good = params.review.good;　// goodレビュー数
  const review_bad = params.review.bad;　　// badレビュー数
  
  if(ranking > 3000){
    // 3000位以上は載せない
    return ;
  }

  // 親シートを取得
  const ss = SpreadsheetApp.openById(SpreadsheetApp.getActiveSpreadsheet().getId());
  const sheet = ss.getSheetByName("シート1");
  // 作成先情報を取得
  const ssId = sheet.getRange('A2').getValues();
  const sheetId = sheet.getRange('B2').getValues();
  // 作成先シートを取得
  const ss_copyTo = SpreadsheetApp.openById(ssId);
  const sheet_copyTo = ss_copyTo.getSheetByName(sheetId);
  if(ss_copyTo.getSheetByName(sheetId+" のコピー") == null){
    // バックアップを作っていない場合は作成
    sheet_copyTo.copyTo(ss_copyTo);
  }
  var data_index = table_index;
  while(true){
    if(data_index >= table_index + 24){
      // テーブルからはみ出ないように
      return;
    }
    else if(sheet_copyTo.getRange(data_index, 3).getValues() == ""){
      // ブランドの項目を見て空白だったら入れる
      break;
    }
    data_index += 1;
  }
  // データ入力
  sheet_copyTo.getRange(data_index,3).setValue(brand);
  sheet_copyTo.getRange(data_index,4).setValue(price);
  sheet_copyTo.getRange(data_index,5).setValue(category);
  sheet_copyTo.getRange(data_index,6).setValue(ranking);
  sheet_copyTo.getRange(data_index,13).setValue(review_good);
  sheet_copyTo.getRange(data_index,14).setValue(review_bad);
  sheet_copyTo.getRange(data_index,16).setValue(url);
  sheet_copyTo.getRange(data_index,17).setValue(" ");
  

  return "success";
}function doPost(e) {
  const params = JSON.parse(e.postData.getDataAsString());
  const table_index = 14; // ライバルセラーテーブルの先頭行
  const index = params.index; // 行数
  const brand = params.brand; // ブランド
  const price = params.price; // 販売価格
  const ranking = params.ranking;　// ランキング
  const category = params.category; // 大カテゴリ
  const url = params.url;　　　　　　 // URL
  const review_good = params.review.good;　// goodレビュー数
  const review_bad = params.review.bad;　　// badレビュー数
  
  

  // 親シートを取得
  const ss = SpreadsheetApp.openById(SpreadsheetApp.getActiveSpreadsheet().getId());
  const sheet = ss.getSheetByName("シート1");
  // 作成先情報を取得
  const ssId = sheet.getRange('A2').getValues();
  const sheetId = sheet.getRange('B2').getValues();
  // 作成先シートを取得
  const ss_copyTo = SpreadsheetApp.openById(ssId);
  const sheet_copyTo = ss_copyTo.getSheetByName(sheetId);
  if(ss_copyTo.getSheetByName(sheetId+" のコピー") == null){
    // バックアップを作っていない場合は作成
    sheet_copyTo.copyTo(ss_copyTo);
  }
  const data_index = index+table_index;
  // データ入力
  sheet_copyTo.getRange(data_index,3).setValue(brand);
  sheet_copyTo.getRange(data_index,4).setValue(price);
  sheet_copyTo.getRange(data_index,5).setValue(category);
  sheet_copyTo.getRange(data_index,6).setValue(ranking);
  sheet_copyTo.getRange(data_index,13).setValue(review_good);
  sheet_copyTo.getRange(data_index,14).setValue(review_bad);
  sheet_copyTo.getRange(data_index,16).setValue(url);
  sheet_copyTo.getRange(data_index,17).setValue(" ");
  

  return "success";
}
