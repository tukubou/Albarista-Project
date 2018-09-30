export class ChatWork{
    constructor(){
        this.name = "ChatWork";
        this.prefix = "https://api.chatwork.com/v2/rooms/";
        this.suffix = "/messages?force=0";
        this.chatWorkToken = '4f54b7e845391777495771a884198e15';
        this.roomIDList = [
            "113000269", // 寺田さんとやりとり用
            "115867174", // スマート物流用
            "119617629", // 東本さん用
            "119805642", // アマゾンSEO用
            "105028009", // マイチャット
            "105108912"  // イーウーマート
        ];
        this.params = {
          headers : {"X-ChatWorkToken" : this.chatWorkToken},
          method : "get"
        };
        this.sendURL = 'https://hooks.slack.com/services/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';
    }
    _getChatRoomURL(roomID){
        return `${this.prefix}${roomID}${this.suffix}`;
    }
}
