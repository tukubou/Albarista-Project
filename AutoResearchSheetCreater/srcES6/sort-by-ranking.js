global.sortByRanking = () => {
    const spreadsheet = SpreadsheetApp.getActive();
    // セラーの数、1~24で固定
    spreadsheet.getRange('C14:Q37').activate()
    .sort({column: 6, ascending: true});
};
