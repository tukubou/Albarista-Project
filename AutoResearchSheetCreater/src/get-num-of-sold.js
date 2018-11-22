var global = this;function getNumOfSold() {
}(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

global.getNumOfSold = function () {
  var spreadsheet = SpreadsheetApp.openById("1jj4oXlLsUTmgTpx67kO1sjaA-MiOJ4Qgf9wFcmGTDrU");
  var sheet = spreadsheet.getSheetByName("早見表");
  var researchSpreadSheet = SpreadsheetApp.getActiveSheet();
  var targetArea = researchSpreadSheet.getRange("B14:G28").getValues();
  var lookupTable = sheet.getRange("A3:E105").getValues();
  var _ = Underscore.load();
  _.each(targetArea, function (row, i) {
    if (researchSpreadSheet.getRange("F" + (i + 14)).isBlank()) {
      // すでに何かしらの文字が入っていたらスキップ
      return;
    }
    var brand = row[1]; // ブランド
    var price = row[2]; // 販売価格
    var category = row[3]; // 大カテゴリ
    var ranking = row[4]; // ランキング（○月○日時点）
    var casesSold = row[5]; // 1ヶ月販売件数
    Logger.log("========= " + i + " ===========");
    Logger.log(brand);
    Logger.log(price);
    Logger.log(category);
    Logger.log(ranking);
    Logger.log(casesSold);
    var calcedCasesSold = getCasesSold(ranking, lookupTable, category);
    researchSpreadSheet.getRange("G" + (i + 14)).setValue(calcedCasesSold);
  });
  //_.each(sortTable, function(dataRow){
  //0 ->カテゴリ 1->商品名 2->ASIN 3->ランキング 4->平均販売個数
  // Logger.log('category='+dataRow[0]+' ranking='+dataRow[3]+', casesSold='+dataRow[4]);
  //});
};

function getCasesSold(ranking, dataTable, filterCategory) {
  var _ = Underscore.load();
  // 特定のカテゴリで配列を絞り込む
  var filteredTable = _.where(dataTable, { "0": filterCategory });
  // ランキングでソートする
  var sortTable = _.sortBy(filteredTable, function (num) {
    return num[3];
  });
  // Nearly BigなRowを取得
  Logger.log("ranking=");
  Logger.log(ranking);
  var maxRow = _.max(sortTable, function (v) {
    return v[3];
  });
  var minRow = _.min(sortTable, function (v) {
    return v[3];
  });
  if (ranking > maxRow[3]) {
    Logger.log("rankingが大きすぎました");
    Logger.log(maxRow);
    return maxRow[4];
  }
  if (ranking < minRow[3]) {
    Logger.log("rankingが小さすぎました");
    Logger.log(minRow);
    return minRow[4];
  }
  // Nearly SmallなRowを取得
  var nealySmallRow = _.min(sortTable, function (item) {
    return item[3] <= ranking ? Math.abs(item[3] - ranking) : 1000000;
  });
  var nealyBigRow = _.find(sortTable, function (num, i) {
    return num[3] >= ranking || i === sortTable.length - 1;
  });
  if (nealySmallRow[3]) Logger.log("nealySmallRow=");
  Logger.log(nealySmallRow);
  Logger.log("nealyBigRow=");
  Logger.log(nealyBigRow);
  var a = (nealyBigRow[4] - nealySmallRow[4]) / (nealyBigRow[3] - nealySmallRow[3]);
  var b = nealyBigRow[4] - a * nealyBigRow[3];
  filteredTable = null;
  sortTable = null;
  return a * ranking + b;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
