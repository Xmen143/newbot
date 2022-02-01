const request = require('request');
//var data = { "helpdesk_ticket": { "description": message.join('\n') , "subject": subject, "email": user.username, "priority": 1, "status": 1 }, "cc_emails": user.username };
var headers = {
    'Content-Type': 'application/json'
    };
var message = ["This is a test message for ticket append", "Please don't reply"];

var data = {
                "helpdesk_note": {
                "body":message.join('\n'),
                "private":false
                }
            };
var dataString = JSON.stringify(data);

var options = {
    url: 'https://cloudxchangeio.freshservice.com/helpdesk/tickets/213273/conversations/note.json',
    method: 'POST',
    headers: headers,
    body: dataString,
    auth: {
        'user': 'morning@cloudxchange.io',
        'pass': '@fter2Shift'
    }
};

request(options, (error, response, body)=>{
    if (!error && response.statusCode == 200) {
        console.log("Ticket has been appended");
    } else {
        console.log("Error "+error);
    }
});