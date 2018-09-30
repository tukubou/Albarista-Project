export class ChatWork{
    constructor(){
        this.name = "ChatWork";
        this.prefix = "https://api.chatwork.com/v2/rooms/";
        this.suffix = "/messages?force=0";
        this.chatWorkToken = '4f54b7e845391777495771a884198e15';
        // 寺田さんとやりとり用、スマート物流用、東本さん用、アマゾンSEO用、マイチャット
        this.roomIDList = ["113000269","115867174","119617629","119805642","105028009"];
        this.params = {
          headers : {"X-ChatWorkToken" : this.chatWorkToken},
          method : "get"
        };
        this.sendURL = 'https://hooks.slack.com/services/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';
    }
}
