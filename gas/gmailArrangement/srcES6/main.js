// ###########################
// Gmailフィルタ
// ###########################

import {MyGmailApp} from './lib/MyGmailApp';
import {NotifySlack} from './lib/NotifySlack';
import {Gmail} from './bot/Gmail';

// ここだけ共通で使うオブジェクトなのでグローバルm(_ _)m
global.gApp = new MyGmailApp();
global.notifySlack = new NotifySlack();
global.gmail = new Gmail();
/**
 * [archiveDailyMail 受信してから一日以上経過したメールをアーカイブする関数]
 */
global.archiveDailyThreads = () => {
    const achiveThreads = gApp._archiveThreadsXdayAgo(GmailApp.getInboxThreads(), 1, true);
    const message = gmail._generateAchiveMessage(achiveThreads);
    notifySlack.notify(gmail.sendURL, message);
}

global.notifyInvoices = () => {
    const query = gApp._generageQueryOR(['Apple からの領収書です','残高不足請求のお知らせ','手数料明細書']);
    const threads = gApp._getUnreadThreadsByORQuery(query);
    gApp._makeThreadsReadStatus(threads);
    const message = gmail._generateInvoiceMessage(threads);
    notifySlack.notify(gmail.sendURL, message);
}

global.deleteThreads = () => {
    //配列内の""は残しておく // Gmailの検索条件
    const query = gApp._generageQueryOR(['【Money Forward】']);
    const deletedThreads = gApp._deleteThreadsByORQuery(query);
    const message = gmail._generateDeleteMessage(deletedThreads);
    notifySlack.notify(gmail.sendURL, message);
}

global.deleteDrafts = () => {
    const deletedNum = gApp._deleteDrafts();
    const message = gmail._generateDeleteDraftMessage(deletedNum);
    notifySlack.notify(gmail.sendURL, message);
}
