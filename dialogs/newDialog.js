const { ComponentDialog, ConfirmPrompt, NumberPrompt, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');
const { ActionTypes, ActivityTypes, CardFactory, MessageFactory } = require('botbuilder');
const { optionPrompt } = require('../resources/optionPrompt');
const NEW_DIALOGS = 'NEW_DIALOGS';


const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
const TEXT_PROMPT = 'TEXT_PROMPT';
const OPTIONS_PROMPT = 'OPTIONS_PROMPT';
const FURTHER_ACTION_PROMPT = 'FURTHER_ACTION_PROMPT';
const IP_PROMPT = "IP_PROMPT";
const MAIN_WATERFALL_DIALOG = 'MAIN_WATERFALL_DIALOG';
//const session = require('../session');
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
//const inputvalidation = require('../resources/inputvalidation');
const config2 = require('../resources/databaseDetails');
var mysql = require('mysql');
//var dateformat = require('dateformat');
var connection3 = config2.connection3;
//var strings = require('node-strings');
const NUMBER_PROMPT = 'NUMBER_PROMPT';
var value = [];
const mail = require('../resources/mail');
//const permission= require('../resources/Permissions');
//const { permissionDialog } = require('./permissionDialog');


//const config22 = require('../resources/databaseDetails3');
//var connection33= config22.connection33;
class NewDialog extends ComponentDialog {
    constructor() {
        super(NEW_DIALOGS);
        this.startDialogrepeat = 0;
        this.checkDialogrepeat = 0;
        this.addDialog(new TextPrompt(FURTHER_ACTION_PROMPT));
        this.addDialog(new TextPrompt(OPTIONS_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT, this.confirmation));
        this.addDialog(new TextPrompt(IP_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT, this.agePromptValidator));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.initialstepContext.bind(this),
            this.IPstepContext.bind(this),
           this.insertDatastepContext.bind(this),
            //this.finalstepContext.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async initialstepContext(stepContext) {
        //console.log("### START STOP stepContext 1,ASKS FOR START OR STOP  :"+JSON.stringify(stepContext));
        console.log("### ServerDialog.initialstepContext :");
        //stepContext.values.userInfo = stepContext.options;
        //console.log("###In Start Stop dialog, first stepContext  stepContext.values.userInfo is : " +stepContext.values.userInfo);
        /////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        await stepContext.context.sendActivity("If you want me to abort ongoing request at any point, please type 'back' !!");



        const optionPrompt = { type: ActivityTypes.Message };
        const buttons = [
            { type: ActionTypes.PostBack, title: "Start Server", value: "Start Server" },
            { type: ActionTypes.PostBack, title: "Stop Server", value: "Stop Server" },
            { type: ActionTypes.PostBack, title: "Back", value: "Back" }
        ];

        const card = CardFactory.heroCard(' Do you want to Start/Stop server?', undefined, buttons, { text: 'Choose one of the following options' });
        optionPrompt.attachments = [card];
        return await stepContext.prompt(OPTIONS_PROMPT, optionPrompt);

    }

    async IPstepContext(stepContext) {
        console.log("### START STOP stepContext 2,ASKS FOR TAG/IP :,company psush");
        console.log("### ServerDialog.IPstepContext :");
        stepContext.values.nameofserver = stepContext._info.result;
        var response = await this.searchDatabase(stepContext.values.nameofserver);
        console.log(stepContext.values.nameofserver);
        console.log("from ipAddr search function" + JSON.stringify(response));
        if (response.success) {
            stepContext.values.serverDetails = response.serverDetails;

            console.log("from ipAddr search function" + JSON.stringify(response));
            console.log("from invawsID search function" + JSON.stringify(response.invawsID));
            console.log("from tagName searchfunction" + JSON.stringify(response.tagName));
            stepContext.values.ipAddr = response.ipAddr;
            stepContext.values.invawsID = response.invawsID;
            stepContext.values.tagName = response.tagName;
            stepContext.values.cloud = response.cloud;
            //Contextstep.values.uniqueCompany=response.uniqueCompany;/////////////new_06_01_2020
            console.log("ipAddr  step.values.ipAddr:  " + JSON.stringify(stepContext.values.ipAddr));
            console.log("invawsID  step.values.invawsID:  " + JSON.stringify(stepContext.values.invawsID));
            console.log("tagName  step.values.tagName:  " + JSON.stringify(stepContext.values.tagName));
            console.log("cloud  step.values.cloud:  " + JSON.stringify(stepContext.values.cloud));
            //console.log("If multiple companies are present, only the company of server should be inserted  step.values.cloud:  "+JSON.stringify(step.values.uniqueCompany));//new_06_01_2020
            console.log(stepContext);
            if (stepContext._info.index == 1) {


                //stepContext.values.serverID=stepContext.values.serverDetails.serverID;
                stepContext.values.serviceProvider = 3;
                //stepContext.values.uniqueCompanyname=stepContext.values.serverDetails.uniqueCompanyname;////////////new_06_01_2020
                var amazon = "aws";
                stepContext.values.azaw = amazon;
                await stepContext.context.sendActivity("The server :" + stepContext.values.serverDetails.serverName + " an AWS Server has been found .");
                if (stepContext._info.result == 'Start Server') {
                    await stepContext.context.sendActivity("If you say yes to proceed , I will Start  " + stepContext.values.serverDetails.serverName + "[" + stepContext.values.IPAddress + "]  Server.");
                } else {

                    await stepContext.context.sendActivity("If you say yes to proceed , I will Stop  " + stepContext.values.serverDetails.serverName + "[" + stepContext.values.IPAddress + "]  Server.");

                }

                // } else if(stepContext.values.serverDetails.serviceProvider == 2) {

                // 	stepContext.values.serverID=stepContext.values.serverDetails.serverID;
                // 	stepContext.values.serviceProvider=2;
                // 	stepContext.values.uniqueCompanyname=stepContext.values.serverDetails.uniqueCompanyname;////////////new_06_01_2020
                // 	var azure="azure";
                // 	stepContext.values.azaw=azure;
                //     await stepContext.context.sendActivity("The server :"+stepContext.values.serverDetails.serverName+" an Azure Server has been found.");
                // 	if (stepContext._info.index == 1)
                // 	{
                // 		await stepContext.context.sendActivity( "If you say yes to proceed , I will Start  "+stepContext.values.serverDetails.serverName+ "["+stepContext.values.IPAddress+"]  Server."   );
                // 	}else{

                // 		await stepContext.context.sendActivity( "If you say yes to proceed , I will Stop  "+stepContext.values.serverDetails.serverName+ "["+stepContext.values.IPAddress+"]  Server."   );

                // 	}


            } if (stepContext.values.serverDetails.serviceProvider == 3) {
                var tag = "tagname";
                await stepContext.context.sendActivity("Kindly hold while I fetch your servers.");

                const serverDisplay = await this.serverDisplay(stepContext.context.activity.channelId, stepContext.values.tagName, stepContext.values.invawsID, stepContext.values.ipAddr, stepContext.values.cloud, stepContext.values.uniqueCompany);//////////new_06_01_2020
                stepContext.values.tagOrIp = tag;
                console.log("THIS IS step.values.tagOrIp" + stepContext.values.tagOrIp);
                return await stepContext.prompt(OPTIONS_PROMPT, serverDisplay);


            }
            return await stepContext.next();
        } else {

            await stepContext.context.sendActivity("No such Server was found.");

            return await stepContext.endDialog(stepContext.values.userInfo);
        }

    }


    async insertDatastepContext(stepContext){
		  
		
			// const datetime = new Date(Date.now()).toLocaleString();
			// var day = dateformat(datetime, "yyyy-mm-dd h:MM:ss");
			// console.log("Details are : "+stepContext.values.serverDetails.serviceProvider+" server id"+stepContext.values.serverDetails.serverID);
			// //const nDate = new Date().toLocaleString('en-US', {
			//  timeZone: 'Asia/Calcutta'
			//  });
			// var istDate = dateformat(nDate, "yyyy-mm-dd h:MM:ss");
			 //console.log(stepContext.values.userInfo.username);

			//var username = await inputvalidation.validation(stepContext.values.userInfo.username);
		   // console.log(username);
			//var status = 0;
//console.log( "to check which user is in the session(insert db)"+stepContext.values.userInfo.name);
			var typesnap;
			if(stepContext.values.typeofSnapshot=='Start Server')
			{
				typesnap= 1;
				
			}else{
				typesnap= 2;
			}
			//console.log("username"+username);
			 //console.log("date"+istDate);
			 console.log("typesnap"+typesnap);
			 //if multiple company names are present for one customer only customer selcetd sever company name shoudld go 
			 console.log("if multiple company names are present for one customer only customer selcetd sever company name shoudld go"+stepContext.values.uniqueCompanyname);
			 
			 var created='CXIOBOT';
				 if( stepContext.values.azaw=="aws"||stepContext.values.cloudid==1)
				{
					var awsid=1;
					const queryString = "INSERT INTO serverstartstop(action)VALUES ('"+typesnap+"')";
					connection3.query(queryString,(err, rows, fields)=> {
					  if(err) {
						console.log(err);
					  } else {
						console.log('Row inserted');
						
						value.length=0;
						console.log('value'+JSON.stringify(value));
					  }
					});
				}
				else  
                return await stepContext.next();
		}
		
        //connection.end();
       
    

    // async Select(stepContext){
    // 	 // if(await session.inSession(stepContext.context, stepContext.values.userInfo)){


    // 		  stepContext.values.id=stepContext._info.result;
    //           console.log("333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333")
    //           console.log(stepContext.values);
    // 		  console.log("THE SERVER  selected BY customer"+stepContext.values.id);
    // 		  console.log("THIS IS stepContext.values.tagOrIp"+stepContext.values.tagOrIp);
    // 		  console.log("###In Start Stop dialog,  fourth stepContext  stepContext.values.inv_aws_id the server selected by customer  is : " + stepContext.values.id);
    // 		console.log(stepContext.values);
    //           if(stepContext.values.tagOrIp=="tagname")
    // 		 {
    // 			 var tbody;

    // 		  //stepContext.values.serviceProvider=1;
    // 		  //console.log("value selected"+ stepContext.values.serviceProvider);
    // 		  value.length=0;
    // 		  console.log('Split aafunction'+stepContext.values.id.split('<tbody id=').pop().split('style')[0]);
    // 		   tbody=stepContext.values.id.split('<tbody id=').pop().split('style')[0];
    // 		  console.log('After splitting the tbody tag'+tbody);

    // 		  value=value.concat(tbody.split(':::'));
    // 		  console.log('Split Function AFTER TBODYTAG'+JSON.stringify(value));
    // 		   console.log('Split Function server id'+JSON.stringify(value[0]));
    // 		   console.log('Split Function server tag'+JSON.stringify(value[1]));
    // 		   console.log('Split Function userInput Ip'+JSON.stringify(value[2]));

    // 		   stepContext.values.ServerNameTag=value[1];
    // 		   stepContext.values.serverID=value[0];
    // 		   	stepContext.values.UserInputIP=value[2];
    // 			stepContext.values.cloudid=value[3];

    // 					stepContext.values.check=value[4];
    // 					stepContext.values.name=value[5];//////////////////new_06_01_2020
    // 					console.log("stepContext.values.cloudid"+stepContext.values.cloudid);
    // 					if(stepContext.values.check=="startdialog")
    // 					{
    // 						  this.checkDialogrepeat=0;
    // 						if(stepContext.values.cloudid==1 || stepContext.values.cloudid==2)
    // 						{
    // 							stepContext.values.cloudid=value[3];

    // 						}
    // 						else
    // 						{
    // 							 await stepContext.context.sendActivity("Sorry, As you  have not chosen from the listed server,Start/Stop dialog will start again.");
    // 						return await stepContext.replaceDialog(NEW_DIALOGS, stepContext.values.userInfo);

    // 						}
    // 					   console.log("stepContext.values.serverID"+stepContext.values.serverID);
    // 					   console.log("stepContext.values.ServerNameTag"+stepContext.values.ServerNameTag);
    // 					   console.log("stepContext.values.UserInputIP"+stepContext.values.UserInputIP);
    // 					   console.log("stepContext.values.cloudid"+stepContext.values.cloudid);



    // 					   if(stepContext.values.cloudid== 1)
    // 					   {
    // 						 console.log('Split Function'+JSON.stringify(stepContext.values.serverID));
    // 						 stepContext.values.serviceProvider=1;
    // 						 await stepContext.context.sendActivity("The server :"+value[1]+" an AWS Server has been found.");
    // 						 }
    // 						 else if(stepContext.values.cloudid==2)
    // 						{
    // 							stepContext.values.serviceProvider=2;
    // 							await stepContext.context.sendActivity("The server :"+value[1]+" an Azure Server has been found.");

    // 						}

    // 					   if (stepContext.values.nameofserver == 'Start Server')
    // 							{
    // 								await stepContext.context.sendActivity( "If you say yes to proceed , I will Start   "+stepContext.values.ServerNameTag+ "["+stepContext.values.UserInputIP+"]  Server."   );
    // 							}else{
    // 								await stepContext.context.sendActivity( "If you say yes to proceed , I will Stop  "+stepContext.values.ServerNameTag+ "["+stepContext.values.UserInputIP+"]  Server."   );

    // 							}
    // 							//tagOrIp.length=0;

    // 							 if (stepContext.values.nameofserver == 'Start Server')
    // 							{
    // 								var serstate="start server";
    // 							}else
    // 							{
    // 								var serstate="stop server";

    // 							}

    // 					  const optionPrompt = { type: ActivityTypes.Message };
    // 						  const buttons = [
    // 						{ type: ActionTypes.PostBack, title: "Yes" , value: "Yes" }, //1 = OS Snapshot
    // 						{ type: ActionTypes.PostBack, title: "No" , value: "No" } //2 = Complete Snapshot
    // 					];
    // 						  const card = CardFactory.heroCard("Are you sure, you want to "+serstate+"  ? ", undefined, buttons, { text: 'Choose one of the following options'  });
    // 							 optionPrompt.attachments = [card];

    // 					return await stepContext.prompt(OPTIONS_PROMPT, optionPrompt); 
    // 				}else if(stepContext.values.check=='Back'){

    // 	  return await stepContext.endDialog(stepContext.values.userInfo);	

    // 	}
    // 		else
    // 				{
    // 					this.checkDialogrepeat++;
    // 					console.log("diaaaaaaaaaaaaalohhhhhhhhh"+this.checkDialogrepeat);
    // 					if(this.checkDialogrepeat < 3)
    // 					{
    // 						 await stepContext.context.sendActivity("You have not selected from the given choice.");
    // 						 await stepContext.context.sendActivity(" So I have to Start dialog again.");
    // 					return await stepContext.replaceDialog(NEW_DIALOGS, stepContext.values.userInfo);
    // 					}else if(this.checkDialogrepeat == 3)
    // 					{
    // 						 await stepContext.context.sendActivity("You have not selected from the given choice.");
    // 						 await stepContext.context.sendActivity(" So I have to Start Dialog again .");
    // 						await stepContext.context.sendActivity(" This will be your last attempt to try if any unexpected input received you will be Blocked.");
    // 						return await stepContext.replaceDialog(NEW_DIALOGS, stepContext.values.userInfo);


    // 					}
    // 					else 
    // 					{

    // 						 await stepContext.context.sendActivity("You have attempted too many times.");
    // 						 this.checkDialogrepeat=0;
    // 					//	 var descriptionBlock="This user="+stepContext.values.userInfo.name+" have not chosen from the listed in Start/StopDialog in wrong format more than 3 times.Last text:"+stepContext.context.activity.text;
    // 					//	 var status=0;
    // 					//	 var subject = "CXIO Chatbot - Too many unsuccessful input  , username "+stepContext.values.userInfo.username;
    // 						//mail.sendFailedquery('This user='+stepContext.values.userInfo.name+' have not chosen from the listed in Start/StopDialog in wrong format more than 3 times.Last text:'+stepContext.context.activity.text+'.\nChannel:'+stepContext.context.activity.channelId+'\nThis users access is Blocked in the CXIOBOT\n Last Text:'+stepContext.values.userInfo.username+'\n Please Look into the matter.\n Thanks & Regards\n',subject);
    // 						 //var response = await this.insertBlocked(stepContext.values.userInfo.username,descriptionBlock,status);

    // 						 return await stepContext.replaceDialog(MAIN_WATERFALL_DIALOG);
    // 					}

    // 				}

    // 			 }else if(stepContext.values.id=='Back' || stepContext.values.tagOrIp=='Back'){

    // 	  return await stepContext.endDialog(stepContext.values.userInfo);



    // 	} else {

    // 		 if (stepContext.values.nameofserver == 'Start Server')
    // 							{
    // 								var serstate="start server";
    // 							}else
    // 							{
    // 								var serstate="stop server";

    // 							}
    // 				 const optionPrompt = { type: ActivityTypes.Message };
    // 				  const buttons = [
    // 				{ type: ActionTypes.PostBack, title: "Yes" , value: "Yes" }, //1 = OS Snapshot
    // 				{ type: ActionTypes.PostBack, title: "No" , value: "No" } //2 = Complete Snapshot
    // 			];
    // 				  const card = CardFactory.heroCard("Are you sure, you want to  "+serstate+"  ???", undefined, buttons, { text: 'Choose one of the following options'  });
    // 					 optionPrompt.attachments = [card];

    // 			return await stepContext.prompt(OPTIONS_PROMPT, optionPrompt);
    // 			 }





    // 		    return await stepContext.next();


    // 	// 	  } else {
    //     //     return await stepContext.endDialog();
    //     // }


    // } 


    async serverDisplay(channelId, tagName, invawsID, ipAddr, cloud) {
        console.log("###In Start Stop dialog,  if user gives server name  it will come in serverDisplay to populate the server ");

        console.log("###In Start Stop dialog,  if user gives server name  it will come in serverDisplay to populate the server " + JSON.stringify(cloud));
        const reply = { type: ActivityTypes.Message };
        const buttons = [];
        for (var i = 0; i < tagName.length; i++) {


            let monitorId = invawsID[i];
            //let monitorName = Firewallid[i];
            let monitorName = tagName[i];
            let monitorUniqeCompnay = [i];
            let name = ""
            if (ipAddr[i] == "" || ipAddr[i] == null) {
                name = "No tag name";
            }
            else {
                name = ipAddr[i];
            }
            console.log("serverCard for loop, tagName and serverName and ip = " + name);
            console.log("serverCard for loop, tagName and serverName and ip  = " + name);
            var check = "startdialog";
            console.log("serverCard for loop, tagName and serverName and ip = " + monitorId + " " + monitorName);
            if (channelId == 'msteams') {
                var temp = { type: ActionTypes.PostBack, title: monitorId + " " + "[" + name + "]" + "<tbody id= " + monitorName + ":::" + monitorId + ":::" + name + ":::" + cloud[i] + ":::" + check + ":::" + monitorUniqeCompnay + "style=display: none;></tbody>", value: monitorId + " " + "[" + name + "]" + "<tbody id=" + monitorName + ":::" + monitorId + " :::" + name + ":::" + cloud[i] + ":::" + check + ":::" + monitorUniqeCompnay + "style=display: none;></tbody>" };

            }
            else if (channelId == 'skype' || channelId == 'emulator') {
                var temp = { type: ActionTypes.PostBack, title: monitorId + " " + "[" + name + "]", value: monitorId + " " + "[" + name + "]" + "<tbody id=" + monitorName + ":::" + monitorId + " :::" + name + ":::" + cloud[i] + ":::" + check + ":::" + monitorUniqeCompnay + "style=display: none;></tbody>" };


            }


            console.log("portCard functions for loop, temp is " + temp);
            buttons.push(temp);


        }
        var back = "Back"
        if (channelId == 'msteams') {
            var temp = {
                type: ActionTypes.PostBack, title: "Back <tbody id= " + back + ":::" + back + ":::" + back + ":::" + back + ":::" + back + "style=display: none;></tbody>"
                , value: "Back <tbody id= " + back + ":::" + back + ":::" + back + ":::" + back + ":::" + back + "style=display: none;></tbody>"
            };

        }
        else if (channelId == 'skype' || channelId == 'emulator') {
            var temp = {
                type: ActionTypes.PostBack, title: "Back", value: "Back <tbody id= " + back + ":::" + back + ":::" + back + ":::" + back + ":::" + back + "style=display: none;></tbody>"
            };

        }
        buttons.push(temp);
        const card = CardFactory.heroCard('Kindly choose server you want to Start / Stop ', undefined,
            buttons, { text: 'Choose one of the following options' });
        reply.attachments = [card];

        return reply;
    }

    //  async insertDatastepContext(stepContext){

    // 	var typesnap;
    // 		if(stepContext.values.nameofserver=='Start Server')
    // 		{
    // 			typesnap= 1;

    // 		}else{
    // 			typesnap= 2;
    // 		}
    // 		//console.log("username"+username);
    // 		 //le.log("if multiple company names are present for one customer only customer selcetd sever company name shoudld go"+stepContext.values.name);
    //     }




    // // async finalstepContext(stepContext) {
    // //     return await stepContext.endDialog(stepContext.values.userInfo);
    // // }



    async searchDatabase(IP, companyName) {
        const ipAddr = [];
        const invawsID = [];
        const tagName = [];
        const cloud = [];
        //const uniqueCompany=[];//////////////////////////////////new_06_01_2020
        var serverInfo = {
            serviceProvider: 0,  //AZURE :2, AWS :1
            serverID: "",
            serverName: "",
            // uniqueCompanyname : "", //////new_06_01_2020
        };


        var serverDetails = await new Promise(resolve => {
            console.log("Before query");
            serverInfo.serviceProvider = 2;
            connection3.query(`SELECT * FROM serverstartstop`, async (err, rows, fields) => {
                //console.log("Azure rows: "+rows[0]);
                if (err) {
                    console.log("Error :" + err);
                    resolve("");
                } else {
                    if (rows != "") {
                        serverInfo.serverID = rows[0].id;
                        serverInfo.serverName = rows[0].ServerName;
                        serverInfo.uniqueCompanyname = rows[0].Status1;/////////new_06_01_2020
                        resolve(rows);
                    } else {
                        resolve("");
                    }
                }
            });
        });

        if (serverDetails != "") {
            console.log("Nothing Found in Azure");
            serverDetails = await new Promise(resolve => {
                serverInfo.serviceProvider = 1;
                console.log("COMPANY NAME" + JSON.stringify(companyName));
                console.log(`SELECT * FROM serverstartstop`);
                connection3.query(`SELECT * FROM serverstartstop`, async (err, rows, fields) => {
                    if (err) {
                        console.log("Error :" + err);


                        resolve("")
                    } else {

                        if (rows != "") {
                            serverInfo.serverID = rows[0].id;
                            serverInfo.serverName = rows[0].ServerName;
                            serverInfo.uniqueCompanyname = rows[0].Status1;/////////new_06_01_2020

                            resolve(rows);
                        } else {
                            resolve("");
                        }
                    }
                });
            });
        }

        if (serverDetails != "") {

            serverDetails = await new Promise(resolve => {
                serverInfo.serviceProvider = 3;

                var sql = `SELECT * FROM serverstartstop`;
                console.log(sql);
                connection3.query(sql, [2, 1], async (err, rows, fields) => {
                    if (err) {
                        console.log("Error :" + err);
                        resolve("")
                    } else {

                        if (rows[0] != "" || rows[1] != "") {
                            serverInfo.serverID = rows[0].id;
                            serverInfo.serverName = rows[0].ServerName;
                            serverInfo.uniqueCompanyname = rows[0].Status1;/////////new_06_01_2020
                            console.log(JSON.stringify(rows));
                            console.log("The result of query 1" + JSON.stringify(rows[0]));
                            console.log("The result of query 2" + JSON.stringify(rows[1]));

                            for( let i=0; i<rows.length; i++)
                	{
                            ipAddr.push(rows[i].id);
                            invawsID.push(rows[i].ServerName);
                            tagName.push(rows[i].Status1);
                            //uniqueCompany.push(rows[0][i].inv_com_name);////////////////new_06_01_2020
                            cloud.push(1);
                            console.log(" public IP is  :" + JSON.stringify(ipAddr));
                            console.log(" invaws ID is  :" + JSON.stringify(invawsID));
                            console.log(" public IP is  :" + JSON.stringify(tagName));
                            console.log(" public IP is  :" + JSON.stringify(cloud));
                            console.log("the user has given tagname, id are  is  :" + rows[i].id);
                            console.log("the user has given tagname, tag name are is  :" + rows[i].ServerName);
                            console.log("the user has given tagname, tag name are is  :" + rows[i].Status1);
                    }
                            // ipAddr.push(rows[1].id);
                            // invawsID.push(rows[1].ServerName);
                            // tagName.push(rows[1].Status1);
                            // //uniqueCompany.push(rows[0][i].inv_com_name);////////////////new_06_01_2020
                            // cloud.push(2);
                            // console.log(" public IP is  :" + JSON.stringify(ipAddr));
                            // console.log(" invaws ID is  :" + JSON.stringify(invawsID));
                            // console.log(" public IP is  :" + JSON.stringify(tagName));
                            // console.log(" public IP is  :" + JSON.stringify(cloud));
                            // console.log("the user has given tagname, id are  is  :" + rows[1].id);
                            // console.log("the user has given tagname, tag name are is  :" + rows[1].ServerName);
                            // console.log("the user has given tagname, tag name are is  :" + rows[1].Status1);

                            //    for( let i=0; i<rows[1].length; i
                            // 	{
                            //       ipAddr.push(rows[1][i].id); 
                            // 	invawsID.push(rows[1][i].ServerName);
                            //     tagName.push(rows[1][i].Status1);
                            // 	//uniqueCompany.push(rows[0][i].inv_com_name);////////////////new_06_01_2020
                            // 	cloud.push(2);
                            // 	console.log(" public IP is  :" +JSON.stringify(ipAddr));
                            // 	console.log(" invaws ID is  :" +JSON.stringify(invawsID));
                            // 	console.log(" public IP is  :" +JSON.stringify(tagName));
                            // 	console.log(" public IP is  :" +JSON.stringify(cloud));
                            //     console.log("the user has given tagname, id are  is  :" +rows[1][i].id );
                            //    console.log("the user has given tagname, tag name are is  :" +rows[1][i].ServerName );
                            //    console.log("the user has given tagname, tag name are is  :" +rows[1][i].Status1 );
                            //    //console.log("the user has given tagname, tag name are is  :" +rows[1][i].ip_id );
                            //    }

                            console.log(" public IP is  :" + JSON.stringify(ipAddr));
                            console.log(" invaws ID is  :" + JSON.stringify(invawsID));
                            console.log(" public IP is  :" + JSON.stringify(tagName));

                            resolve(rows);
                        } else if (rows[0] == "" && rows[1] == "") {
                            resolve("");
                        }
                    }
                });
            });
        }
        if (serverDetails == "") {
            console.log("Nothing Found in Azure and AWS");
            return { success: false, serverDetails: serverInfo, ipAddr: ipAddr, invawsID: invawsID, tagName: tagName, cloud: cloud }; /////new_06_01_2020 
        } else {
            console.log("Data found");
            return { success: true, serverDetails: serverInfo, ipAddr: ipAddr, invawsID: invawsID, tagName: tagName, cloud: cloud }; /////new_06_01_2020 
        }
    }

}
//connection3.end();
//console.log('end of  search database of start stop dialog');

// if(serverDetails == "") {
//     console.log("Nothing Found in Azure and AWS");
//     return { success: false, serverDetails: serverInfo,ipAddr: ipAddr,invawsID:invawsID,tagName:tagName,cloud:cloud}; /////new_06_01_2020 :
// } else {




module.exports.NewDialog = NewDialog;
module.exports.NEW_DIALOGS = NEW_DIALOGS;