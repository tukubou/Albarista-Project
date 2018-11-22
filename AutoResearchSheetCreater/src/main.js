var global = this;function notifySalesInfoUpdating() {
}(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var NoSmart = exports.NoSmart = (function () {
    function NoSmart(color) {
        _classCallCheck(this, NoSmart);

        this.name = "NoSmart";
        this.sendURL = "https://hooks.slack.com/services/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";
        this.settings = {
            CHECK_NUM: 10,
            FILE_ID: "1x-cjBPa238uAamBcvhfIjDC5YPElPiBvupXBgaieuiU",
            SHEET_NAME: "売り上げデータ",
            RANGE: "C15:C65"

        };
    }

    _createClass(NoSmart, {
        getSalesInfo: {
            value: function getSalesInfo() {
                var messObj = {};
                var spredSheet = SpreadsheetApp.openById(this.settings.FILE_ID);
                var sheet = spredSheet.getSheetByName(this.settings.SHEET_NAME);
                var range = sheet.getRange(this.settings.RANGE);
                var array = range.getValues();
                var writtenNum = array.filter(function (cel) {
                    return cel == "売り上げデータ詳細参照";
                });
                if (writtenNum.length !== this.settings.CHECK_NUM) {
                    messObj.code = -1;
                    messObj.message = "No Notify";
                    return messObj;
                }
                var message = "【売上情報サービス】が届いたようだぜ\n";
                message += "https://docs.google.com/spreadsheets/d/1x-cjBPa238uAamBcvhfIjDC5YPElPiBvupXBgaieuiU/edit#gid=0";
                messObj.code = 0;
                messObj.message = message;
                return messObj;
            }
        }
    });

    return NoSmart;
})();

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var NotifySlack = exports.NotifySlack = (function () {
    function NotifySlack(color) {
        _classCallCheck(this, NotifySlack);
    }

    _createClass(NotifySlack, {
        testMessage: {
            value: function testMessage() {
                return "this is Test Message from Emilia";
            }
        },
        notify: {
            value: function notify(sendURL, message) {
                //slackApp.postMessage(options.channelId, options.message, {username: options.userName});
                var payload = {
                    text: message };
                var options = {
                    method: "post",
                    contentType: "application/json",
                    payload: JSON.stringify(payload) };
                // botは以下のURLから作成できる
                // https://to-earn.slack.com/apps/new/A0F7XDUAZ--web-
                // https://hooks.slack.com/services/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 // レムたん用
                UrlFetchApp.fetch(sendURL, options);
            }
        }
    });

    return NotifySlack;
})();

},{}],3:[function(require,module,exports){
(function (global){
"use strict";

var NoSmart = require("./bot/NoSmart").NoSmart;

var NotifySlack = require("./lib/NotifySlack").NotifySlack;

global.notifySalesInfoUpdating = function () {
    var noSmart = new NoSmart();
    var messObj = noSmart.getSalesInfo();
    if (messObj.code !== 0) {
        return;
    }
    var notifySlack = new NotifySlack();
    notifySlack.notify(noSmart.sendURL, messObj.message);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./bot/NoSmart":1,"./lib/NotifySlack":2}]},{},[3]);
