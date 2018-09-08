// ###########################
// Gmailフィルタ
// ###########################

import {MyGmailApp} from './lib/MyGmailApp';
import {NotifySlack} from './lib/NotifySlack';
import {Gmail} from './bot/Gmail';

/**
 * [archiveDailyMail 受信してから一日以上経過したメールをアーカイブする関数]
 */
global.archiveDailyThreads = () => {
    const gApp = new MyGmailApp();
    const notifySlack = new NotifySlack();
    const gmail = new Gmail();
    const achiveThreads = gApp._archiveThreadsXdayAgo(GmailApp.getInboxThreads(), 1, true);
    const message = gmail._generateAchiveMessage(achiveThreads);
    notifySlack.notify(gmail.sendURL, message);
}

global.deleteThreads = () => {
    const notifySlack = new NotifySlack();
    const gmail = new Gmail();
    const gApp = new MyGmailApp();
    //配列内の""は残しておく // Gmailの検索条件
    const query = `(${['【Money Forward】"'].join(' OR ')})`;
    const deletedThreads = gApp._deleteThreadsByORQuery(query);
    const message = gmail._generateDeleteMessage(deletedThreads);
    notifySlack.notify(gmail.sendURL, message);
}

global.deleteDrafts = () => {
    const notifySlack = new NotifySlack();
    const gmail = new Gmail();
    const gApp = new MyGmailApp();
    const deletedNum = gApp._deleteDrafts();
    const message = gmail._generateDeleteDraftMessage(deletedNum);
    notifySlack.notify(gmail.sendURL, message);

}
