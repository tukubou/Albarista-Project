export class NoSmart{
    constructor(color){
        this.name = "NoSmart";
        this.sendURL = 'https://hooks.slack.com/services/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';
        this.settings = {
            CHECK_NUM: 10,
            FILE_ID: '1x-cjBPa238uAamBcvhfIjDC5YPElPiBvupXBgaieuiU',
            SHEET_NAME: '売り上げデータ',
            RANGE: 'C15:C65'

        }
    }
    getSalesInfo() {
      const spredSheet = SpreadsheetApp.openById(this.settings.FILE_ID);
      const sheet = spredSheet.getSheetByName(this.settings.SHEET_NAME);
      const range = sheet.getRange(this.settings.RANGE);
      const array = range.getValues();
      const writtenNum = array.fillter(cel => cel == '売り上げデータ詳細参照');
      if(writtenNum.length !== this.settings.CHECK_NUM) {
        return ;
      }
      let message = '【売上情報サービス】が届いたようだぜ\n';
      message += 'https://docs.google.com/spreadsheets/d/1x-cjBPa238uAamBcvhfIjDC5YPElPiBvupXBgaieuiU/edit#gid=0';
      return message;
    }

}
