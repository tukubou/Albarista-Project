var global = this;function aggregateData() {
}(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

global.aggregateData = function () {
    // var ExclusionFileName = '';
    var searchSheetName = "【リサーチ】";
    // 現在のシートを取得
    var outputSheet = SpreadsheetApp.getActiveSheet();

    var outPutColumn = 2;
    var outPutRow = 1;
    outputSheet.getRange(outPutColumn, outPutRow, outputSheet.getLastColumn(), 2).setValue("");
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = spreadsheet.getSheets();
    sheets.forEach(function (sheet) {
        if (sheet.getName().indexOf(searchSheetName) > -1) {
            var url = "https://docs.google.com/spreadsheets/d/" + spreadsheet.getId() + "/edit#gid=" + sheet.getSheetId();
            var link = ["=HYPERLINK(\"" + url + "\",\"" + sheet.getName() + "\")"];
            Logger.log(sheet.getName());
            outputSheet.getRange(outPutColumn, outPutRow).setValue(outPutColumn - 1);
            outputSheet.getRange(outPutColumn, outPutRow + 1).setValue(link);
            outPutColumn++;
        }
    });
    return;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
