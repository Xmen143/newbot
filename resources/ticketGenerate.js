const request = require('request');
const inputvalidation = require('../resources/inputvalidation');
const dotenv = require('dotenv');
dotenv.config();
exports.generateTicket = async (subject, message, user)=>{
    console.log("At ticket generate function, description is :"+message);
    var headers = {
    'Content-Type': 'application/json'
    };
	//although we have used procces.enve.TICKET_PASSWORD, HERE. iN validator,js it requires string

    //IF A TICKET HASN'T BEEN GENERATED BEFORE DURING THIS CONVERSATION
	console.log("Ticket Generate Function ------------------");
	console.log(user);
	
    if(user.ticketNumber == "") {
		console.log(user.username)
		var htmlText =user.username ;
		/* var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
		var username = htmlText.replace(noHTML, ''); // remove all html tags
		console.log(username); */ 
		var username = await inputvalidation.validation(htmlText);
		console.log(username);
		 var data = { "helpdesk_ticket": { "description": message.join('\n') , "subject": subject, "email": username, "priority": 1, "status": 2 ,"requester_id":3002012227,"responder_id":3000842173,"source":1003}, "cc_emails": username };
        var dataString = JSON.stringify(data);
        var options = {
            url: 'https://cloudxchangeio.freshservice.com/helpdesk/tickets.json',
            method: 'POST',
            headers: headers,
            body: dataString,
            auth: {
                'user': process.env.TICKET_USERNAME,
                'pass': process.env.TICKET_PASSWORD
            }
        };
        console.log("ticketGenerate : options has been defined");

        user.ticketNumber  = await new Promise(resolve=>{
            request(options, (error, response, body)=>{
                if (!error && response.statusCode == 200) {
                    var parsed = JSON.parse(body);
                    /*console.log(body);
                    console.log("        ");*/
                    console.log("At generate ticket function TICKET NUMBER IS"+parsed.item.helpdesk_ticket.display_id);
                    resolve(parsed.item.helpdesk_ticket.display_id);
                } else {
                    console.log("Error "+error+" response.status :"+response.statusCode);
                }
            });
        });
    } else { //IF A TICKET HAS BEEN GENERATED DURING THIS CONVERSATION
        console.log("A TICKET WTH USER HAS ALREADY BEEN GENERATED SO APPENDING AT TICKET NUMBER:"+user.ticketNumber);
        var data = {
                    "helpdesk_note": {
                    "body":message.join('\n'),
                    "private":false
                    }
                };
        var dataString = JSON.stringify(data);

        var options = {
            url: `https://cloudxchangeio.freshservice.com/helpdesk/tickets/${user.ticketNumber}/conversations/note.json`,
            method: 'POST',
            headers: headers,
            body: dataString,
            auth: {
                'user':  process.env.TICKET_USERNAME,
                'pass':  process.env.TICKET_PASSWORD
            }
        };

        request(options, (error, response, body)=>{
            if (!error && response.statusCode == 200) {
                console.log("Ticket has been appended");
            } else {
                console.log("Error "+error);
            }
        });
    }
}



