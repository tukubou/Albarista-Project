global.sortByReviewNum = () => {
    const spreadsheet = SpreadsheetApp.getActive();
    // Good Review
    spreadsheet.getRange('B6:C25').activate()
        .sort({column: 3, ascending: true});
    // Bad Review
    spreadsheet.getRange('D6:E25').activate()
        .sort({column: 5, ascending: true});
    // 楽天 Good Review
    spreadsheet.getRange('B31:C50').activate()
        .sort({column: 3, ascending: true});
    // 楽天 Bad Review
    spreadsheet.getRange('D31:E50').activate()
        .sort({column: 5, ascending: true});
};
