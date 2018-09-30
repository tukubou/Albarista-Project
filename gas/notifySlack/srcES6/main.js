// ###########################
// レムのつぶやき
// ###########################

import {Emilia} from './bot/Emilia';
import {NoSmart} from './bot/NoSmart';
import {NotifySlack} from './lib/NotifySlack';
import {ChatWork} from './bot/ChatWork';

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

global.notifyChatWorkMessage = () => {
    const chatWork = new ChatWork();
    const notifySlack = new NotifySlack();
    const roomIDList = chatWork.roomIDList;
    for(let i = 0; i < roomIDList.length; i ++) {
        const url = `${chatWork.prefix}${roomIDList[i]}${chatWork.suffix}`;
        const strRespons = UrlFetchApp.fetch(url, chatWork.params);
        if (strRespons != "") {
            const json = JSON.parse(strRespons.getContentText());
            if(json == "") return;
            for(let i in json){
                let message = '';
                message = message + json[i].account.name + "\n```" + json[i].body + "```\n";
                notifySlack.notify(chatWork.sendURL, message);
            }
        }
    }
};
