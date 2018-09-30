var global = this;function notifySlack() {
}
function throwAwayTheTrash() {
}
function notifySalesInfoUpdating() {
}
function notifyChatWorkMessage() {
}(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var ChatWork = exports.ChatWork = (function () {
    function ChatWork() {
        _classCallCheck(this, ChatWork);

        this.name = "ChatWork";
        this.prefix = "https://api.chatwork.com/v2/rooms/";
        this.suffix = "/messages?force=0";
        this.chatWorkToken = "4f54b7e845391777495771a884198e15";
        this.roomIDList = ["113000269", // 寺田さんとやりとり用
        "115867174", // スマート物流用
        "119617629", // 東本さん用
        "119805642", // アマゾンSEO用
        "105028009", // マイチャット
        "105108912" // イーウーマート
        ];
        this.params = {
            headers: { "X-ChatWorkToken": this.chatWorkToken },
            method: "get"
        };
        this.sendURL = "https://hooks.slack.com/services/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";
    }

    _createClass(ChatWork, {
        _getChatRoomURL: {
            value: function _getChatRoomURL(roomID) {
                return "" + this.prefix + "" + roomID + "" + this.suffix;
            }
        }
    });

    return ChatWork;
})();

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Util = require("../lib/Util").Util;

var Emilia = exports.Emilia = (function () {
  function Emilia() {
    _classCallCheck(this, Emilia);

    this.name = "Emilia";
    this.sendURL = "https://hooks.slack.com/services/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";
  }

  _createClass(Emilia, {
    getTrashInfoToThrowAwayToday: {
      value: function getTrashInfoToThrowAwayToday() {
        var util = new Util();
        var dow = util.getDayOfWeek();
        Logger.log(dow);
        var message = "";
        switch (dow.name) {
          case "日":
            message += "明日、【" + dow.tommorow + "曜日】は\n";
            message += "ゴミ出し日ではありません😊";
            break;
          case "月":
            message += "明日、【" + dow.tommorow + "曜日】は\n";
            message += "🔥可燃ごみ🔥を出す日です😤！！";
            break;
          case "火":
            if (dow.count % 2 == 0) {
              // 明日が第二または第四水曜日の場合
              message += "明日、第" + dow.count + dow.tommorow + "曜日】は\n";
              message += "💧不燃ごみ💧を出す日です！！😤";
            } else {
              message += "明日、第" + dow.count + dow.tommorow + "曜日】は\n";
              message += "ゴミ出し日ではありません。😊";
            }
            break;
          case "水":
            message += "明日、【" + dow.tommorow + "曜日】は\n";
            message += "🌿資源ごみ🌿を出す日です！！😤";
            break;
          case "木":
            message += "明日、【" + dow.tommorow + "曜日】は\n";
            message += "🔥可燃ごみ🔥を出す日です！！😤";
            break;
          case "金":
            message += "明日、【" + dow.tommorow + "曜日】は\n";
            message += "ゴミ出し日ではありません。😊";
            break;
          case "土":
            message += "明日、【" + dow.tommorow + "曜日】は\n";
            message += "ゴミ出し日ではありません。😊";
            break;
        }
        return message;
      }
    }
  });

  return Emilia;
})();

},{"../lib/Util":5}],3:[function(require,module,exports){
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
                var spredSheet = SpreadsheetApp.openById(this.settings.FILE_ID);
                var sheet = spredSheet.getSheetByName(this.settings.SHEET_NAME);
                var range = sheet.getRange(this.settings.RANGE);
                var array = range.getValues();
                var writtenNum = array.fillter(function (cel) {
                    return cel == "売り上げデータ詳細参照";
                });
                if (writtenNum.length !== this.settings.CHECK_NUM) {
                    return;
                }
                var message = "【売上情報サービス】が届いたようだぜ\n";
                message += "https://docs.google.com/spreadsheets/d/1x-cjBPa238uAamBcvhfIjDC5YPElPiBvupXBgaieuiU/edit#gid=0";
                return message;
            }
        }
    });

    return NoSmart;
})();

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Util = exports.Util = (function () {
    function Util() {
        _classCallCheck(this, Util);

        this.botName = "Util";
    }

    _createClass(Util, {
        getDayAndCount: {
            value: function getDayAndCount(date) {
                return { day: date.getDay(), count: Math.floor((date.getDate() - 1) / 7) + 1 };
            }
        },
        getDayOfWeek: {
            value: function getDayOfWeek() {
                var date = new Date();
                var dayOfWeek = date.getDay();
                return {
                    name: ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek], // day of week str
                    tommorow: ["月", "火", "水", "木", "金", "土", "日"][dayOfWeek], // day of week str
                    count: Math.floor((date.getDate() - 1) / 7) + 1
                };
            }
        }
    });

    return Util;
})();

},{}],6:[function(require,module,exports){
(function (global){
// ###########################
// レムのつぶやき
// ###########################

"use strict";

var Emilia = require("./bot/Emilia").Emilia;

var NoSmart = require("./bot/NoSmart").NoSmart;

var NotifySlack = require("./lib/NotifySlack").NotifySlack;

var ChatWork = require("./bot/ChatWork").ChatWork;

global.notifySlack = new NotifySlack();

global.throwAwayTheTrash = function () {
    var emilia = new Emilia();
    var message = emilia.getTrashInfoToThrowAwayToday();
    notifySlack.notify(emilia.sendURL, message);
};

global.notifySalesInfoUpdating = function () {
    var noSmart = new NoSmart();
    var message = noSmart.getSalesInfo();
    notifySlack.notify(noSmart.sendURL, message);
};

global.notifyChatWorkMessage = function () {
    var _ = Underscore.load();
    var chatWork = new ChatWork();
    var roomIDList = chatWork.roomIDList;
    _.each(roomIDList, function (roomID, i) {
        var url = chatWork._getChatRoomURL(roomID);
        var strRespons = UrlFetchApp.fetch(url, chatWork.params);
        if (strRespons != "") {
            var json = JSON.parse(strRespons.getContentText());
            if (json == "") return;
            for (var _i in json) {
                var message = "";
                message = message + json[_i].account.name + "\n```" + json[_i].body + "```\n";
                notifySlack.notify(chatWork.sendURL, message);
            }
        }
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./bot/ChatWork":1,"./bot/Emilia":2,"./bot/NoSmart":3,"./lib/NotifySlack":4}]},{},[6]);
