export class Gmail{
    constructor(){
        this._ = Underscore.load();
        this.name = "Gmail";
        this.sendURL = 'https://hooks.slack.com/services/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';
    }
    _generateInvoiceMessage(threads) {
        if(threads.length === 0) {
            return '【請求書通知】\n　請求書に関する未読のスレッドはありませんでした。';
        }
        let retStr = '【請求書通知】\n　以下のスレッドたち `'+threads.length+'` 件を既読にしました。\n';
        retStr += this._generateMessageItemList(threads);
        return retStr;
    }
    _generateDeleteMessage(deletedThreads) {
        if(deletedThreads.length === 0) {
            return '【スレッド削除】\n　削除できるスレッドはありませんでした。';
        }
        let retStr = '【スレッド削除】\n　以下のスレッドたち `'+deletedThreads.length+'` 件を削除しました。\n';
        retStr += this._generateMessageItemList(deletedThreads);
        return retStr;
    }
    _generateAchiveMessage(achiveThreads) {
        if(achiveThreads.length === 0) {
            return '【スレッドアーカイブ】\n　アーカイブできるスレッドはありませんでした。';
        }
        let retStr = '【スレッドアーカイブ】\n　以下のスレッドたち `'+achiveThreads.length+'` 件をアーカイブしました。\n';
        retStr += this._generateMessageItemList(achiveThreads);
        return retStr;
    }
    _generateMessageItemList(threads) {
        let itemList = '\n';
        this._.each(threads,function(thread, i){
            itemList += [
                `(${i+1}) ${thread.getFirstMessageSubject()}`,
                `　${thread.getPermalink()}`
            ].join('\n');
            itemList += '\n';
        });
        return `\`\`\`${itemList}\`\`\``;
    }
    _generateDeleteDraftMessage(deleteNum) {
        if(deleteNum === 0) {
            return '【原稿削除】\n　削除できる原稿はありませんでした。';
        }
        return `【原稿削除】\n　\`${deleteNum}件\` の原稿を削除しました`;
    }
}
