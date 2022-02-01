const { ChoicePrompt, TextPrompt, ConfirmPrompt, ChoiceFactory, ListStyle, ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');
const { ActionTypes, ActivityTypes, CardFactory, MessageFactory } = require('botbuilder');

const SNAPSHOTS_DIALOG = 'SNAPSHOTS_DIALOG';
const { formatValidator } = require('../resources/formatValidator');
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const TEXT_PROMPT = 'TEXT_PROMPT';
const USER_NAME_PROMPT = 'USER_NAME_PROMPT';
const OPTIONS_PROMPT = 'OPTIONS_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class SnapShotsDialog extends ComponentDialog {
    constructor() {
        super(SNAPSHOTS_DIALOG);

        this.addDialog(new TextPrompt(OPTIONS_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new TextPrompt(TEXT_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new TextPrompt(USER_NAME_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.initialStep.bind(this),
            this.initialStep1.bind(this),
            this.newstep.bind(this),
            this.nameStep2.bind(this),
            this.nameStep3.bind(this),
            this.nameStep4.bind(this),
            this.nameStep6.bind(this),
            //this.otpStep.bind(this),
            this.nameStep5.bind(this)

        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async newstep(stepContext){

        const optionPrompt = { type: ActivityTypes.Message };
            const buttons = [
                { type: ActionTypes.PostBack, title: "DevOps Engg" , value: "DevOps Engg" }, 
                { type: ActionTypes.PostBack, title: "Cloud Engg" , value: "Cloud Engg" } ,
				 { type: ActionTypes.PostBack, title: "Database Engg" , value: "Database Engg" }
            ];
                            
            const card = CardFactory.heroCard('on Which role you worked on pervious Company ?', undefined, buttons, { text: 'Choose one of the following options'  });
            optionPrompt.attachments = [card];
            return await stepContext.prompt(OPTIONS_PROMPT, optionPrompt);
    }
    
    async initialStep(stepContext){
		const list = stepContext.values
        return await stepContext.prompt(CHOICE_PROMPT, {
			prompt: 'YOUR Company Size:',
		choices: ChoiceFactory.toChoices(['100+', '200+', '300+', '400+', '500']),
        style:ListStyle.heroCard,
		});

		}

        async initialStep1(stepContext){
            const list = stepContext.values
            return await stepContext.prompt(CHOICE_PROMPT, {
                prompt: 'can you please give your review company',
            choices: ChoiceFactory.toChoices(['1', '2', '3', '4', '5']),
            style:ListStyle.heroCard,
            });
            }

            async nameStep2(stepContext) {
                // Create an object in which to collect the user's information within the dialog.
                //stepContext.values.userInfo = new UserProfile();
        
                const promptOptions = { prompt: 'Please Give Discription About Your Project You Worked On.' };  
                // Ask the user to enter their name.
                return await stepContext.prompt(TEXT_PROMPT, promptOptions);
            }

            async nameStep3(stepContext) {
                // Create an object in which to collect the user's information within the dialog.
                //stepContext.values.userInfo = new UserProfile();
        
                const promptOptions = { prompt: 'Are You Ready To Work Here??' };  
                // Ask the user to enter their name.
                //console.log(stepContext);
                return await stepContext.prompt(CONFIRM_PROMPT, promptOptions);
                
            }

            async nameStep4(stepContext) {
                // Create an object in which to collect the user's information within the dialog.
                //stepContext.values.userInfo = new UserProfile();
                console.log(stepContext);

                if (stepContext._info.result === true) {
                    await stepContext.context.sendActivity('When You will join the organization??');
			        const list = stepContext.values
                    return await stepContext.prompt(CHOICE_PROMPT, {
                    prompt: 'on which date?',
                    choices: ChoiceFactory.toChoices(['20Jan', '21JAn', '22Jan', '23Jan', '24Jan']),
                    style:ListStyle.heroCard,
            });
                } else {
                    await stepContext.context.sendActivity('Thank You For Your Time!!');
                }
                
            }


            async nameStep6(stepContext) {
        // Create an object in which to collect the user's information within the dialog.
        //stepContext.values.userInfo = new UserProfile();

        const promptOptions = { prompt: 'Please enter your valid Organization email address.' };
		

        // Ask the user to enter their name.
        return await stepContext.prompt(USER_NAME_PROMPT, promptOptions);
    }
    

            async nameStep5(stepContext){

                var validator = require("email-validator");
                console.log(stepContext);
               var valid =  validator.validate(stepContext._info.result);
               console.log(valid);

               if (valid === true) {
                await stepContext.context.sendActivity("Your email you have entered is valid!!");
                
               } else {
                await stepContext.context.sendActivity("Email you entered is not valid!!");
                await stepContext.context.sendActivity("please Enter valid Email address!");
               }


                await stepContext.endDialog();
            }



        }

module.exports.SnapShotsDialog = SnapShotsDialog;
module.exports.SNAPSHOTS_DIALOG = SNAPSHOTS_DIALOG;