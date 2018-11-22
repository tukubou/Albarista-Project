global.aggregateData = () => {
    // var ExclusionFileName = '';
    const searchSheetName = '【リサーチ】';
    // 現在のシートを取得
    let outputSheet = SpreadsheetApp.getActiveSheet();

    var outPutColumn = 2;
    var outPutRow = 1;
    outputSheet.getRange(outPutColumn, outPutRow,outputSheet.getLastColumn(),2).setValue("");
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = spreadsheet.getSheets()
    sheets.forEach(function(sheet) {
        if(sheet.getName().indexOf(searchSheetName) > -1){
            var url = "https://docs.google.com/spreadsheets/d/" + spreadsheet.getId() + "/edit#gid=" + sheet.getSheetId();
            var link = [ '=HYPERLINK("' + url + '","' + sheet.getName() + '")' ];
            Logger.log(sheet.getName());
            outputSheet.getRange(outPutColumn,outPutRow).setValue(outPutColumn-1);
            outputSheet.getRange(outPutColumn,outPutRow+1).setValue(link);
            outPutColumn++;
            }
          });
    return;
};
