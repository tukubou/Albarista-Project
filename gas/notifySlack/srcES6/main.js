// ###########################
// レムのつぶやき
// ###########################

import {Emilia} from './bot/Emilia';
import {NoSmart} from './bot/NoSmart';
import {NotifySlack} from './lib/NotifySlack';

global.throwAwayTheTrash = () => {
    const emilia = new Emilia();
    const message = emilia.getTrashInfoToThrowAwayToday();
    const notifySlack = new NotifySlack();
    notifySlack.notify(emilia.sendURL, message);
};

global.notifySalesInfoUpdating = () => {
    const noSmart = new NoSmart();
    const message = noSmart.getSalesInfo();
    const notifySlack = new NotifySlack();
    notifySlack.notify(noSmart.sendURL, message);
};

// ###########################
// 一人さんのつぶやき
// ###########################
// function tweetByHitori() {
//     let hitori = new Hitori();
//     hitori.tweet();
// }
