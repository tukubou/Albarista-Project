import {NoSmart} from './bot/NoSmart';
import {NotifySlack} from './lib/NotifySlack';

global.notifySalesInfoUpdating = () => {
    const noSmart = new NoSmart();
    const messObj = noSmart.getSalesInfo();
    if(messObj.code !== 0) {
        return;
    }
    const notifySlack = new NotifySlack();
    notifySlack.notify(noSmart.sendURL, messObj.message);
};
