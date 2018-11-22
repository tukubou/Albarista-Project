var global = this;(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function doPost(e) {
  var params = JSON.parse(e.postData.getDataAsString());
  var tableIndex = 14; // ライバルセラーテーブルの先頭行

  if (params.ranking > params.rankingLimit) {
    // 対象ランキング圏外は無視
    return;
  }
  // 親シートを取得
  var ss = SpreadsheetApp.openById(SpreadsheetApp.getActiveSpreadsheet().getId());
  var sheet = ss.getSheetByName("シート1");
  // 作成先情報を取得
  var ssId = sheet.getRange("A2").getValues();
  var sheetId = sheet.getRange("B2").getValue();
  // 作成先シートを取得
  var ssCopyTo = SpreadsheetApp.openById(ssId);
  var sheetCopyTo = ssCopyTo.getSheetByName(sheetId);
  if (ssCopyTo.getSheetByName(sheetId + " のコピー") == null) {
    // バックアップを作っていない場合は作成
    sheetCopyTo.copyTo(ssCopyTo);
  }
  var dataIndex = tableIndex;
  while (true) {
    if (dataIndex >= tableIndex + 24) {
      // テーブルからはみ出ないように
      return;
    } else if (sheetCopyTo.getRange(dataIndex, 3).getValues() == "") {
      // ブランドの項目を見て空白だったら入れる
      break;
    }
    dataIndex += 1;
  }
  // データ入力
  if (sheetCopyTo.getRange("E3").getValue() == "") {
    // 商品名が空白の場合はカテゴリ、画像も合わせて設定する
    sheetCopyTo.getRange("E3").setValue(sheetId.replace("【リサーチ】", ""));
    sheetCopyTo.getRange("E4").setValue(params.category);
    sheetCopyTo.getRange("B4").setFormula("=IMAGE(\"" + params.image + "\")");
  }
  sheetCopyTo.getRange("C" + dataIndex).setValue(params.brand);
  sheetCopyTo.getRange("D" + dataIndex).setValue(params.price);
  sheetCopyTo.getRange("E" + dataIndex).setValue(params.category);
  sheetCopyTo.getRange("F" + dataIndex).setValue(params.ranking);
  sheetCopyTo.getRange("M" + dataIndex).setValue(params.review.good);
  sheetCopyTo.getRange("N" + dataIndex).setValue(params.review.bad);
  sheetCopyTo.getRange("P" + dataIndex).setValue(params.url);
  sheetCopyTo.getRange("Q" + dataIndex).setValue(" ");

  return "success";
}

},{}]},{},[1]);
