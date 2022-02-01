// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ChoicePrompt, UsernamePrompt, ChoiceFactory, ListStyle, ComponentDialog, NumberPrompt, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');
const { NewDialog, NEW_DIALOGS } = require('./newDialog');
const { SnapShotsDialog, SNAPSHOTS_DIALOG } = require('./snapshotsDialog');
const { UserProfile } = require('../userProfile');
const { formatValidator } = require('../resources/formatValidator');
const USER_NAME_PROMPT = 'USER_NAME_PROMPT';
//const mail = require('../resources/mail');
const TOP_LEVEL_DIALOG = 'TOP_LEVEL_DIALOG';

const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
const TEXT_PROMPT = 'TEXT_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';


class TopLevelDialog extends ComponentDialog {
    constructor() {
        super(TOP_LEVEL_DIALOG);
        this.addDialog(new TextPrompt(TEXT_PROMPT));
        this.addDialog(new TextPrompt(USER_NAME_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT));
        //this.addDialog(new UsernamePrompt(USER_NAME_PROMPT));
		//this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
		var cp = new ChoicePrompt(CHOICE_PROMPT);
		cp.list = ListStyle.list;
		this.addDialog(cp);
		this.choicesX = ['Adatum Corporation', 'Contoso Suites', 'Graphic Design Institute', 'Wide World Importers'];

        this.addDialog(new NewDialog());
		this.addDialog(new SnapShotsDialog());

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.nameStep.bind(this),
			//this.startSelectionStep1.bind(this),
            this.ageStep.bind(this),
			this.ageStep1.bind(this),
			this.ageStepC.bind(this),
			this.startSelectionStepC.bind(this),
			this.ageStep2.bind(this),
            this.startSelectionStep.bind(this),
            this.acknowledgementStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async nameStep(stepContext) {
        // Create an object in which to collect the user's information within the dialog.
        stepContext.values.userInfo = new UserProfile();

        const promptOptions = { prompt: 'Please enter your name.' };
		
		

        // Ask the user to enter their name.
        return await stepContext.prompt(TEXT_PROMPT, promptOptions);
    }

   
    async ageStep(stepContext) {
        // Set the user's name to what they entered in response to the name prompt.
		const UserProfile = stepContext._info.result;
		console.log('UserProfile###########################################################################');
		console.log(UserProfile);
		console.log('UserProfile############################################################################');

        stepContext.values.userInfo.name = stepContext.result;

        const promptOptions = { prompt: UserProfile+ ', Please enter your age.' };

        // Ask the user to enter their age.
        return await stepContext.prompt(NUMBER_PROMPT, promptOptions);
    }
	
	async ageStep1(stepContext) {
        // Set the user's name to what they entered in response to the name prompt.
		//const UserProfile = stepContext._info.result;
		const userProfile = stepContext.values.userInfo;
		console.log('UserProfile###########################################################################');
		console.log(userProfile);
		console.log(stepContext._info.result);
		userProfile.companiesToReview = stepContext.result || [];
        //stepContext.values.userInfo.name = stepContext.result;

        const promptOptions = { prompt:  `${ userProfile.name }, Please enter your DOB.` };

        // Ask the user to enter their age.
        return await stepContext.prompt(NUMBER_PROMPT, promptOptions);
    }
	
	
	async ageStepC(stepContext) {
        // Set the user's name to what they entered in response to the name prompt.
		

        // Ask the user to enter their age.
        return await stepContext.prompt(CHOICE_PROMPT, {
            title: 'Menu',
			prompt: 'Choose Previous Company Name:',
			choices: ChoiceFactory.toChoices(['CXIO', 'GOOGLE', 'APPLE', 'AMAZON', 'RSJ']),
			style:ListStyle.heroCard,
            //ListStyle: builder.ListStyle.button
		});
    }
	
	async startSelectionStepC(stepContext) {
        // Set the user's age to what they entered in response to the age prompt.
		console.log('UserProfile############################################################################');
		console.log(stepContext);
        //stepContext._info.result.value = stepContext.result;
		console.log(stepContext._info.result.index);
		
		console.log(stepContext.result);
		console.log(stepContext._info.result.value);
		const userProfile = stepContext.values.userInfo;

        if (stepContext._info.result.index == 0) {
            // If they are too young, skip the review selection dialog, and pass an empty list to the next step.
            await stepContext.context.sendActivity('You Selected CXIO.');
			await stepContext.context.sendActivity(`Thank YOU SELECTING!!`);
			console.log(SNAPSHOTS_DIALOG);
			console.log(NEW_DIALOGS);

        // Exit the dialog, returning the collected user information.
           return await stepContext.beginDialog(SNAPSHOTS_DIALOG);

            //return await stepContext.next();
        } else {
            // Otherwise, start the review selection dialog.
            return await stepContext.beginDialog(NEW_DIALOGS);
        }
    }
	
	async ageStep2(stepContext) {
        // Set the user's name to what they entered in response to the name prompt.
		const userProfile = stepContext.values.userInfo;
		console.log('UserProfile###########################################################################');
		//console.log(stepContext);
		console.log(UserProfile);
		console.log('UserProfile############################################################################');
		userProfile.companiesToReview = stepContext.result || [];
        //stepContext.values.userInfo.name = stepContext.result;

        const promptOptions = { prompt: `${ userProfile.name } !! Please Enter Your Previous Company Name.` };

        // Ask the user to enter their age.
        return await stepContext.prompt(TEXT_PROMPT, promptOptions);
    }
	
	

    async startSelectionStep(stepContext) {
        // Set the user's age to what they entered in response to the age prompt.
		console.log('UserProfile############################################################################');
		console.log(stepContext);
        stepContext.values.userInfo.age = stepContext.result;

        if (stepContext.result < 25) {
            // If they are too young, skip the review selection dialog, and pass an empty list to the next step.
            await stepContext.context.sendActivity('You must be 25 or older to participate.');

            return await stepContext.next();
        } else {
            // Otherwise, start the review selection dialog.
            return await stepContext.beginDialog(REVIEW_SELECTION_DIALOG);
        }
    }

    async acknowledgementStep(stepContext) {
        // Set the user's company selection to what they entered in the review-selection dialog.
        const userProfile = stepContext.values.userInfo;
        userProfile.companiesToReview = stepContext.result || [];

        await stepContext.context.sendActivity(`Thanks for participating ${ userProfile.name }`);

        // Exit the dialog, returning the collected user information.
        return await stepContext.endDialog(userProfile);
    }
}

module.exports.TopLevelDialog = TopLevelDialog;
module.exports.TOP_LEVEL_DIALOG = TOP_LEVEL_DIALOG;
