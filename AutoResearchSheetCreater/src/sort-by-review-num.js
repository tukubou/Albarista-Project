var global = this;function sortByReviewNum() {
}(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

global.sortByReviewNum = function () {
    var spreadsheet = SpreadsheetApp.getActive();
    // Good Review
    spreadsheet.getRange("B6:C25").activate().sort({ column: 3, ascending: true });
    // Bad Review
    spreadsheet.getRange("D6:E25").activate().sort({ column: 5, ascending: true });
    // 楽天 Good Review
    spreadsheet.getRange("B31:C50").activate().sort({ column: 3, ascending: true });
    // 楽天 Bad Review
    spreadsheet.getRange("D31:E50").activate().sort({ column: 5, ascending: true });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
