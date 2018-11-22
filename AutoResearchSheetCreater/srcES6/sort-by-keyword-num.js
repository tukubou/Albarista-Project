// キーワードソート
global.sortByKeywordNum = () => {
    const spreadsheet = SpreadsheetApp.getActive();
    // キーワードの数 1~5で固定
    spreadsheet.getRange('B41:D45').activate()
    .sort({column: 4, ascending: true});
};
