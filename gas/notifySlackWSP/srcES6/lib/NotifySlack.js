export class NotifySlack{
    constructor(color){

    }
    testMessage(){
        return "this is Test Message from Emilia";
    }

    notify(sendURL, message) {
        //slackApp.postMessage(options.channelId, options.message, {username: options.userName});
        const payload  = {
          'text'      : message,
        };
        const options = {
          'method'      : 'post'                 ,
          'contentType' : 'application/json'     ,
          'payload'     : JSON.stringify(payload),
        };
        // botは以下のURLから作成できる
        // https://to-earn.slack.com/apps/new/A0F7XDUAZ--web-
        // https://hooks.slack.com/services/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 // レムたん用
        UrlFetchApp.fetch(sendURL, options);
    }


}
