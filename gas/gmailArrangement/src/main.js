var global = this;function archiveDailyThreads() {
}
function deleteThreads() {
}
function deleteDrafts() {
}(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Gmail = exports.Gmail = (function () {
    function Gmail() {
        _classCallCheck(this, Gmail);

        this._ = Underscore.load();
        this.name = "Gmail";
        this.sendURL = "https://hooks.slack.com/services/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";
    }

    _createClass(Gmail, {
        _generateDeleteMessage: {
            value: function _generateDeleteMessage(deletedThreads) {
                if (deletedThreads.length === 0) {
                    return "【スレッド削除】\n　削除できるスレッドはありませんでした。";
                }
                var retStr = "以下のスレッドたち `" + deletedThreads.length + "` )件を削除しました。\n ```\n";
                this._.each(deletedThreads, function (thread, i) {
                    retStr += "(" + (i + 1) + ") " + thread.getFirstMessageSubject() + "\n";
                    //thread.moveToTrash();
                });
                retStr += "```";
                return retStr;
            }
        },
        _generateAchiveMessage: {
            value: function _generateAchiveMessage(achiveThreads) {
                if (achiveThreads.length === 0) {
                    return "【スレッドアーカイブ】\n　アーカイブできるスレッドはありませんでした。";
                }
                var retStr = "以下のスレッドたち `" + achiveThreads.length + "` )件をアーカイブしました。\n ```\n";
                this._.each(achiveThreads, function (thread, i) {
                    retStr += "(" + (i + 1) + ") " + thread.getFirstMessageSubject() + "\n";
                    //thread.moveToTrash();
                });
                retStr += "```";
                return retStr;
            }
        },
        _generateDeleteDraftMessage: {
            value: function _generateDeleteDraftMessage(deleteNum) {
                if (deleteNum === 0) {
                    return "【原稿削除】\n　削除できる原稿はありませんでした。";
                }
                return "【原稿削除】\n　`" + deleteNum + "件` の原稿を削除しました";
            }
        }
    });

    return Gmail;
})();

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var MyGmailApp = exports.MyGmailApp = (function () {
    function MyGmailApp() {
        _classCallCheck(this, MyGmailApp);

        this._ = Underscore.load();
    }

    _createClass(MyGmailApp, {
        _getThreads: {
            /**
             * param query:
             * param startIndex:検索を開始する最初のスレッドのINDEX
             * param maxLength: 取得できる最大スレッド数
             */

            value: function _getThreads(query, startIndex, maxLength) {
                Logger.log(query);
                return !startIndex && !maxLength ? GmailApp.search(query) : GmailApp.search(query, startIndex, maxLength); //条件にマッチしたスレッドを検索して取得
            }
        },
        _archiveThreadsXdayAgo: {
            /**
             * [_archiveThreadsReadAndXdayAgo description]
             */

            value: function _archiveThreadsXdayAgo(threads, xday, removeUnreadThread) {
                var self = this;
                var achiveThreads = [];
                this._.each(threads, function (thread, i) {
                    var isLimitOver = self._isLimitOver(thread, xday);
                    // removeUnreadThreadがfalseの場合は既読、未読にかかわらずアーカイブ
                    var isUnread = removeUnreadThread ? thread.isUnread() : false;
                    // 期限が過ぎて、既読なものはアーカイブ
                    if (isLimitOver && !isUnread) {
                        thread.moveToArchive();
                        achiveThreads.push(thread);
                    }
                });
                return achiveThreads;
            }
        },
        _deleteDrafts: {
            value: function _deleteDrafts() {
                var drafts = GmailApp.getDrafts();
                this._.each(GmailApp.getDrafts(), function (draft, i) {
                    draft.deleteDraft();
                });
                return drafts.length;
            }
        },
        _deleteThreadsByORQuery: {
            value: function _deleteThreadsByORQuery(query) {
                var threads = this._getThreads(query);
                this._.each(threads, function (thread, i) {
                    thread.moveToTrash();
                });
                return threads;
            }
        },
        _isLimitOver: {
            value: function _isLimitOver(thread, xday) {
                var now = Moment.moment();
                var mailReachDate = Moment.moment(thread.getLastMessageDate());
                return now.diff(mailReachDate, "days") >= xday;
            }
        },
        _moveThreadsToArchive: {
            value: function _moveThreadsToArchive(threads) {
                GmailApp.moveThreadsToArchive(threads);
            }
        },
        _generateOrQueryFromArray: {
            /**
             * [_generateOrQueryFromArray キーワード検索するためのqueryを配列から生成]
             * @param  {[type]} keywordArray [description]
             * @return {[type]}              [description]
             */

            value: function _generateOrQueryFromArray(keywordArray) {
                var retStr = "(";
                this._.each(keywordArray, function (keyword, i) {
                    retStr += i !== keywordArray.length - 1 ? "\"" + keyword + "\" OR " : "\"" + keyword + "\")";
                    if (i === keywordArray.length) {
                        Logger.log("最後i(" + i + ")===keywordArray.length(" + keywordArray.length + ")");
                    }
                });
                return retStr;
            }
        }
    });

    return MyGmailApp;
})();

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
(function (global){
// ###########################
// Gmailフィルタ
// ###########################

"use strict";

var MyGmailApp = require("./lib/MyGmailApp").MyGmailApp;

var NotifySlack = require("./lib/NotifySlack").NotifySlack;

var Gmail = require("./bot/Gmail").Gmail;

/**
 * [archiveDailyMail 受信してから一日以上経過したメールをアーカイブする関数]
 */
global.archiveDailyThreads = function () {
    var gApp = new MyGmailApp();
    var notifySlack = new NotifySlack();
    var gmail = new Gmail();
    var achiveThreads = gApp._archiveThreadsXdayAgo(GmailApp.getInboxThreads(), 1, true);
    var message = gmail._generateAchiveMessage(achiveThreads);
    notifySlack.notify(gmail.sendURL, message);
};

global.deleteThreads = function () {
    var notifySlack = new NotifySlack();
    var gmail = new Gmail();
    var gApp = new MyGmailApp();
    //配列内の""は残しておく // Gmailの検索条件
    var query = "(" + ["【Money Forward】\""].join(" OR ") + ")";
    var deletedThreads = gApp._deleteThreadsByORQuery(query);
    var message = gmail._generateDeleteMessage(deletedThreads);
    notifySlack.notify(gmail.sendURL, message);
};

global.deleteDrafts = function () {
    var notifySlack = new NotifySlack();
    var gmail = new Gmail();
    var gApp = new MyGmailApp();
    var deletedNum = gApp._deleteDrafts();
    var message = gmail._generateDeleteDraftMessage(deletedNum);
    notifySlack.notify(gmail.sendURL, message);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./bot/Gmail":1,"./lib/MyGmailApp":2,"./lib/NotifySlack":3}]},{},[4]);
