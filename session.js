const TimeLimit = 600000 ; //SESSION TIMELIMIT IN MILLI SECONDS
//200000
exports.inSession = async function(context, user){

    //STORE USER SENT MESSAGES IN CHAT ARRAY
	//console.log("session step"+JSON.stringify(context));
	//console.log("session step"+JSON.stringify(user));
    pushString = "User :"+context.activity.text;
    if((pushString != user.chat[user.chat.length - 1]) && (pushString != user.chat[user.chat.length - 2])){
        user.chat.push(pushString);
    }
    
    //STORE BOT SENT MESSAGES IN CHAT ARRAY
    context.onSendActivities(async (ctx, activities, next) => {
        // Deliver activities
        await next();
        var pushString = ""
		/* console.log("context.onSendActivities SEssion");
		console.log("context.onSendActivities SEssion"+ctx);
		console.log("context.onSendActivities SEssion"+activities);
		console.log("context.onSendActivities SEssion"+next); */
        // Log sent messages
        activities.filter(a => a.type === 'message').forEach(a => {
			//console.log("coactivities.filtern");
            if(a.attachments) {
                pushString = "Bot :"+a.attachments[0].content.title;
                if((pushString != user.chat[user.chat.length - 1]) && (pushString != user.chat[user.chat.length - 2])){
                    user.chat.push(pushString);
                }

                pushString = "Bot :"+a.attachments[0].content.text;
                if((pushString != user.chat[user.chat.length - 1]) && (pushString != user.chat[user.chat.length - 2])){
                    user.chat.push(pushString);
                }
            } else {
                pushString = "Bot :"+a.text;
                if((pushString != user.chat[user.chat.length - 1]) && (pushString != user.chat[user.chat.length - 2])){
                    user.chat.push(pushString);
                }
            }
        });
    });

    //CHECK WETHER THIS USER IS WITHIN SESSION TIME LIMITS
    //IF USER IS NOT WITHIN TIME LIMITS THEN RETURN FALSE, ELSE RETURN TRUE(AFTER UPDATEING THE LAST INTERACTION TIME VARIABLE OF THIS USER)
	//console.log("Session print context"+Date.parse(context.activity.timestamp));
	//console.log("Session print userinteraction"+user.lastInteractionTime);
    if(Date.parse(context.activity.timestamp)-user.lastInteractionTime < TimeLimit) {
        console.log("SESSION IN TIME");
        user.lastInteractionTime = Date.now();
        return true;
    } else {
		console.log("SESSION not in  TIME");
        user.login = false;
        return false;
    }
}
