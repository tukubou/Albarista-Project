export class MyGmailApp{
    constructor(){
        this._ = Underscore.load();
    }
    /**
     * param query:
     * param startIndex:検索を開始する最初のスレッドのINDEX
     * param maxLength: 取得できる最大スレッド数
     */
    _getThreads(query, startIndex, maxLength) {
        Logger.log(query);
        return (!startIndex && !maxLength) ? GmailApp.search(query) : GmailApp.search(query, startIndex, maxLength); //条件にマッチしたスレッドを検索して取得
    }
    /**
     * [_archiveThreadsReadAndXdayAgo description]
     */
    _archiveThreadsXdayAgo(threads, xday, removeUnreadThread) {
        const self = this;
        let achiveThreads = [];
        this._.each(threads,function(thread,i){
            const isLimitOver = self._isLimitOver(thread, xday);
            // removeUnreadThreadがfalseの場合は既読、未読にかかわらずアーカイブ
            const isUnread = removeUnreadThread? thread.isUnread() : false;
            // 期限が過ぎて、既読なものはアーカイブ
            if(isLimitOver && !isUnread) {
                thread.moveToArchive();
                achiveThreads.push(thread);
            }
        });
        return achiveThreads;
    }
    _deleteDrafts() {
        const drafts = GmailApp.getDrafts();
        this._.each(GmailApp.getDrafts(),function(draft, i){
            draft.deleteDraft();
        });
        return drafts.length;
    }
    _deleteThreadsByORQuery(query) {
        const threads = this._getThreads(query);
        this._.each(threads,function(thread, i){
            thread.moveToTrash();
        });
        return threads;
    }
    _getUnreadThreadsByORQuery(query) {
        let array = [];
        const threads = this._getThreads(query);
        return this._.filter(threads, function(thread){
            return thread.isUnread();
        });
    }


    _isLimitOver(thread, xday) {
        const now = Moment.moment();
        const mailReachDate = Moment.moment(thread.getLastMessageDate());
        return now.diff(mailReachDate, 'days') >= xday;
    }
    _moveThreadsToArchive(threads) {
        GmailApp.moveThreadsToArchive(threads);
    }
    /**
     * [_generateOrQueryFromArray キーワード検索するためのqueryを配列から生成]
     * @param  {[type]} keywordArray [description]
     * @return {[type]}              [description]
     */
    _generateOrQueryFromArray(keywordArray) {
        let retStr = '(';
        this._.each(keywordArray,function(keyword,i){
            retStr += (i !== keywordArray.length-1)? `"${keyword}" OR ` : `"${keyword}")`;
            if(i===keywordArray.length) {
                Logger.log(`最後i(${i})===keywordArray.length(${keywordArray.length})`);
            }
        });
        return retStr;
    }
    _generageQueryOR(array) {
        const modifyArray = this._.map(array, function(keyword){
            return `"${keyword}"`; // ""でそれぞれの要素をくくる。
        });
        return `(${modifyArray.join(' OR ')})`;
    }
    _generageQueryAND(array) {
        const modifyArray = this._.map(array, function(keyword){
            return `"${keyword}"`; // ""でそれぞれの要素をくくる。
        });
        return `(${modifyArray.join(' AND ')})`;
    }
    _makeThreadsReadStatus(threads) {
        this._.each(threads,function(thread, i){
            thread.markRead();
        });
    }
}
