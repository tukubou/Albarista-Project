import {Util} from '../lib/Util';
export class Emilia{
    constructor(){
        this.name = "Emilia";
        this.sendURL = 'https://hooks.slack.com/services/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';
    }
    getTrashInfoToThrowAwayToday() {
        const util = new Util();
        const dow = util.getDayOfWeek();
        Logger.log(dow);
        let message = "";
            switch (dow.name) {
            case "日":
              message += "明日、【"+dow.tommorow+"曜日】は\n";
              message += "ゴミ出し日ではありません😊";
              break;
            case "月":
              message += "明日、【"+dow.tommorow+"曜日】は\n";
              message += "🔥可燃ごみ🔥を出す日です😤！！";
              break;
            case "火":
              if(dow.count % 2 == 0) { // 明日が第二または第四水曜日の場合
                message += "明日、第"+dow.count+dow.tommorow+"曜日】は\n";
                message += "💧不燃ごみ💧を出す日です！！😤";
              } else {
                message += "明日、第"+dow.count+dow.tommorow+"曜日】は\n";
                message += "ゴミ出し日ではありません。😊";
              }
              break;
            case "水":
              message += "明日、【"+dow.tommorow+"曜日】は\n";
              message += "🌿資源ごみ🌿を出す日です！！😤";
              break;
            case "木":
              message += "明日、【"+dow.tommorow+"曜日】は\n";
              message += "🔥可燃ごみ🔥を出す日です！！😤";
              break;
            case "金":
              message += "明日、【"+dow.tommorow+"曜日】は\n";
              message += "ゴミ出し日ではありません。😊";
              break;
            case "土":
              message += "明日、【"+dow.tommorow+"曜日】は\n";
              message += "ゴミ出し日ではありません。😊";
              break;
          }
          return message;
    }
}
