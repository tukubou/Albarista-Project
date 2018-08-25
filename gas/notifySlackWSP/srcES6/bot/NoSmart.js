export class NoSmart{
    constructor(color){
        this.name = "NoSmart";
        this.sendURL = 'https://hooks.slack.com/services/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';
        this.settings = {
            CHECK_NUM: 10,
            FILE_ID: '1x-cjBPa238uAamBcvhfIjDC5YPElPiBvupXBgaieuiU',
            SHEET_NAME: '売り上げデータ',
            RANGE: 'C15:C65'

        };
    }

    getSalesInfo() {
        let messObj = {};
        const spredSheet = SpreadsheetApp.openById(this.settings.FILE_ID);
        const sheet = spredSheet.getSheetByName(this.settings.SHEET_NAME);
        const range = sheet.getRange(this.settings.RANGE);
        const array = range.getValues();
        const writtenNum = array.filter(cel => cel == '売り上げデータ詳細参照');
        if(writtenNum.length !== this.settings.CHECK_NUM) {
            messObj.code = -1;
            messObj.message = 'No Notify';
            return messObj;
        }
        let message = '【売上情報サービス】が届いたようだぜ\n';
        message += 'https://docs.google.com/spreadsheets/d/1x-cjBPa238uAamBcvhfIjDC5YPElPiBvupXBgaieuiU/edit#gid=0';
        messObj.code = 0;
        messObj.message = message;
        return messObj;
    }
}
