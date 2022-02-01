const { ChoicePrompt, TextPrompt, ConfirmPrompt, ChoiceFactory, ListStyle, ComponentDialog, DialogSet, DialogTurnStatus, WaterfallDialog } = require('botbuilder-dialogs');
const { ActionTypes, ActivityTypes, CardFactory, MessageFactory } = require('botbuilder');
const { TopLevelDialog, TOP_LEVEL_DIALOG } = require('./topLevelDialog');
var mysql = require('mysql');
const config2 = require('../resources/databaseDetails3');
var connection3= config2.connection3;
//var connection2= config1.connection2;
//var connection= config.connection;
//const config = require('../resources/databaseDetails');
//const config2 = require('../resources/databaseDetails3');
//const config1 = require('../resources/databaseDetails2');

const DATABASE_DIALOGS = 'DATABASE_DIALOGS';

const CHOICE_PROMPT = 'CHOICE_PROMPT';
const TEXT_PROMPT = 'TEXT_PROMPT';
const USER_NAME_PROMPT = 'USER_NAME_PROMPT';
const OPTIONS_PROMPT = 'OPTIONS_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const MAIN_DIALOG = 'MAIN_DIALOG';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
const USER_PROFILE_PROPERTY = 'USER_PROFILE_PROPERTY';

class DatabaseDialogs extends ComponentDialog {
    constructor() {
        super(DATABASE_DIALOGS);

        this.addDialog(new TextPrompt(OPTIONS_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new TextPrompt(TEXT_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new TextPrompt(USER_NAME_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            //this.newstep1.bind(this),
          //  this.IPStep.bind(this),
            this.searchDatabase(this),
            //this.newstep1.bind(this),
            //this.newstep2.bind(this)
            //this.searchDatabase.bind(this)
            

        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

async searchDatabase(stepContext){
    
    const serveri=[];	
		const servern =[];         
		const servers=[];
		//const cloud=[];
		//const uniqueCompany=[];
    //////////////////////////////////new_06_01_2020
    var serverInfo = {
                   id : '',  //AZURE :2, AWS :1
                   ServerName : "" ,
                   Status1 : '' //////new_06_01_2020
                     };
    console.log('inside search database of start stop dialog');
    console.log(serverInfo);
                    
    console.log(`SELECT * FROM  serverstartstop `);

    var serverDetails = await new Promise(resolve=>{
        console.log("Before query");
    const queryString = "SELECT * FROM  serverstartstop"
    connection3.query(queryString,(err, rows, fields)=> {
    if(err){
        console.log("Error :"+err);
        resolve("");
    } else {
        if(rows != ""){
            for( var i=0;i<rows[0].length;i++)
						{
            serveri.push(rows[0][i].ServerName)
            console.log("fior referenvceeeeeeeeeeeeee@@@@@@@@@@@@@@@@@@aaaaaaaaaaaaaaa"+JSON.stringify(serveri));
            serverInfo.id = rows[0].id;
            serverInfo.ServerName = rows[0].ServerName;
            serverInfo.Status1= rows[0].Status1;
           // serverInfo.id = rows[1, 2].id;
            //serverInfo.ServerName = rows[1, 2].ServerName;
            //serverInfo.Status1= rows[1, 2].Status1;
             //////////////////////////new_06_01_2020
            resolve(rows);
            console.log(serverInfo.id);
            console.log(serverInfo.ServerName);
            console.log(serverInfo.Status1);

                        }  
        } else {
            resolve("");
        }
    }
});
});
console.log(serverInfo.id);
console.log(serverInfo.ServerName);
console.log(serverInfo.Status1);
console.log(serveri);
    //console.log(a);
    console.log("Email you entered is not valid!!")
   // await stepContext.next();

         }

         //if(step.values.serverDetails.serviceProvider == 3) {
           // var tag="tagname";
            //await step.context.sendActivity( "Kindly hold while I fetch your servers.");	
            
            //const serverDisplay = await this.serverDisplay(step.context.activity.channelId,step.values.tagName,step.values.invawsID,step.values.ipAddr,step.values.cloud,step.values.uniqueCompany);//////////new_06_01_2020
            //step.values.tagOrIp=tag;
            //console.log("THIS IS step.values.tagOrIp"+step.values.tagOrIp);
            //return await step.prompt(OPTIONS_PROMPT, serverDisplay);



/*
async serverDisplay(channelId,tagName,invawsID,serveri,servern,servers)
	
	{
		console.log("###In Start Stop dialog,  if user gives server name  it will come in serverDisplay to populate the server ");
		
		console.log("###In Start Stop dialog,  if user gives server name  it will come in serverDisplay to populate the server "+JSON.stringify(cloud));
        const reply = { type: ActivityTypes.Message };
        const buttons = [];
        for(var i=0; i<tagName.length; i++)
			
        { 
			
        
            let monitorId =tagName[i];
            //let monitorName = Firewallid[i];
			let monitorName = invawsID[i];
			let monitorUniqeCompnay=uniqueCompany[i];
			let name = ""
			if(serveri[i]=="" || serveri[i]==null)
			{
				name = "No tag name";
			}
			else
			{
				name = serveri[i];
			}
			console.log("serverCard for loop, tagName and serverName and ip = "+name);
			console.log("serverCard for loop, tagName and serverName and ip  = "+name);
			var check="startdialog";
            console.log("serverCard for loop, tagName and serverName and ip = " + monitorId + " " + monitorName);
			if(channelId =='msteams')
			{
				  var temp = { type: ActionTypes.PostBack, title: monitorId +" " +"[" +name +"]"+ "<tbody id= "+monitorName+":::"+monitorId+ ":::"+name+ ":::"+cloud[i]+":::"+check+":::"+monitorUniqeCompnay+"style=display: none;></tbody>" , value:monitorId +" "  +"[" +name +"]"+ "<tbody id="+monitorName+":::"+monitorId+ " :::"+name+ ":::"+cloud[i]+":::"+check+":::"+monitorUniqeCompnay+"style=display: none;></tbody>"};
              
			}
			else if(channelId =='skype' ||channelId=='emulator' )
			{
				  var temp = { type: ActionTypes.PostBack, title: monitorId +" " +"[" +name +"]", value:monitorId +" "  +"[" +name +"]"+ "<tbody id="+monitorName+":::"+monitorId+ " :::"+name+ ":::"+cloud[i]+":::"+check+":::"+monitorUniqeCompnay+"style=display: none;></tbody>"};
				
				
			}
			
          
            console.log("portCard functions for loop, temp is " + temp);
            buttons.push(temp);
        
		
	}
	var back="Back"
	if(channelId =='msteams')
			{
				var temp = { type: ActionTypes.PostBack, title:"Back <tbody id= "+back+":::"+back+ ":::"+back+ ":::"+back+":::"+back+"style=display: none;></tbody>" 
			 , value:"Back <tbody id= "+back+":::"+back+ ":::"+back+ ":::"+back+":::"+back+"style=display: none;></tbody>" };
              
			}
			else if(channelId =='skype' ||channelId=='emulator' )
			{
				var temp = { type: ActionTypes.PostBack, title:"Back"  , value:"Back <tbody id= "+back+":::"+back+ ":::"+back+ ":::"+back+":::"+back+"style=display: none;></tbody>"
			 };
				
			}
			 buttons.push(temp);
        const card = CardFactory.heroCard('Kindly choose server you want to Start / Stop ', undefined,
        buttons, { text: 'Choose one of the following options' });
        reply.attachments = [card];

        return reply;
    }
*/






/*
         async newstep1(stepContext){
            // await session.inSession(step.context, step.values.userInfo)){
                     
                     
                 const optionPrompt = { type: ActivityTypes.Message };
                 const buttons = [
                     { type: ActionTypes.PostBack, title: "Start Server", value: "Start Server" }, 
                     { type: ActionTypes.PostBack, title: "Stop Server" , value: "Stop Server" } ,
                     { type: ActionTypes.PostBack, title: "Back" , value: "Back" } 
                 ];
                                 
                 const card = CardFactory.heroCard(' Do you want to Start/Stop server?', undefined, buttons, { text: 'Choose one of the following options'  });
                 optionPrompt.attachments = [card];
                 
         console.log(stepContext);
         console.log('88888888888888666666666666666666666666666666666666666666666666666666666666666666666666688888888');
                 if ( stepContext._info.index == 0) {

                    console.log(serverInfo.ServerName)
                     //const optionPrompt = { type: ActivityTypes.Message };
                     // const buttons = [
                         // { type: ActionTypes.PostBack, title: serverInfo.ServerName, value: serverInfo.ServerName }, 
                         // { type: ActionTypes.PostBack, title: "Stop Server" , value: "Stop Server" } ,
                          //{ type: ActionTypes.PostBack, title: "Back" , value: "Back" } 
                     // ];
                                      
                    //  const card = CardFactory.heroCard(' Do you want to Start/Stop server?', undefined, buttons, { text: 'Choose one of the following options'  });
                     // optionPrompt.attachments = [card];
          console.log('88888888888888666666666666666666666666666666666666666666666666666666666666666666666666688888888');
                      //return await stepContext.prompt(OPTIONS_PROMPT, optionPrompt);
                     }else {
                     console.log('else88888888888888666666666666666666666666666666666666666666666666666666666666666666666666688888888');
         
                    }
                  
                  return await stepContext.prompt(OPTIONS_PROMPT, optionPrompt);
                 }
             

    */
	//connection3.query(`SELECT * FROM  external_storage_pricing WHERE Region= '${region1}' AND Storage='${type}' AND Cloud='AWS' `, async (err, rows, fields)=> {
                        
   /* 

    async newstep2(stepContext){
        // await session.inSession(step.context, step.values.userInfo)){
                 
                 
             const optionPrompt = { type: ActivityTypes.Message };
             const buttons = [
                 { type: ActionTypes.PostBack, title: serverInfo.ServerName, value: serverInfo.ServerName }, 
                 { type: ActionTypes.PostBack, title: "Stop Server" , value: "Stop Server" } ,
                 { type: ActionTypes.PostBack, title: "Back" , value: "Back" } 
             ];
                             
             const card = CardFactory.heroCard(' Do you want to Start/Stop server?', undefined, buttons, { text: 'Choose one of the following options'  });
             optionPrompt.attachments = [card];
             return await stepContext.prompt(OPTIONS_PROMPT, optionPrompt);
         }

    
}
*/
}
module.exports.DatabaseDialogs = DatabaseDialogs;
 module.exports.DATABASE_DIALOGS = DATABASE_DIALOGS;