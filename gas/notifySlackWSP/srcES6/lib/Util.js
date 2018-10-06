export class Util{
    constructor(){
        this.botName = "Util";
    }
    getDayAndCount(date){
      return {day: date.getDay(), count: Math.floor((date.getDate() - 1) / 7) + 1};
    }
    getDayOfWeek() {
      var date = new Date();
      var dayOfWeek = date.getDay();
      return {
          name: [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek], // day of week str
          tommorow: [ "月", "火", "水", "木", "金", "土", "日" ][dayOfWeek], // day of week str
          count: Math.floor((date.getDate() - 1) / 7) + 1
      };
    }
}
