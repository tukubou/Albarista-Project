// ###########################
// レムのつぶやき
// ###########################

import {Emilia} from './bot/Emilia';
import {NoSmart} from './bot/NoSmart';
import {NotifySlack} from './lib/NotifySlack';
import {ChatWork} from './bot/ChatWork';

global.notifySlack = new NotifySlack();

global.throwAwayTheTrash = () => {
    const emilia = new Emilia();
    const message = emilia.getTrashInfoToThrowAwayToday();
    notifySlack.notify(emilia.sendURL, message);
};

global.notifySalesInfoUpdating = () => {
    const noSmart = new NoSmart();
    const message = noSmart.getSalesInfo();
    notifySlack.notify(noSmart.sendURL, message);
};

global.notifyChatWorkMessage = () => {
    const _ = Underscore.load();
    const chatWork = new ChatWork();
    const roomIDList = chatWork.roomIDList;
    _.each(roomIDList,function(roomID,i){
        const url = chatWork._getChatRoomURL(roomID);
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
    });
};
