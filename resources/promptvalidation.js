const { TextPrompt } = require('botbuilder-dialogs');
const OPTIONS_PROMPT = 'OPTIONS_PROMPT';
module.exports.optionPrompts = class optionPrompts extends TextPrompt {
    constructor(AWS_PORTS_DIALOG) {
        super(AWS_PORTS_DIALOG, async (prompt) => {
            if (!prompt.recognized.succeeded) {
				const optionPrompt = { type: ActivityTypes.Message };
            const buttons = [
                { type: ActionTypes.PostBack, title: "Open" , value: "Open" }, //1 = Add Port
                { type: ActionTypes.PostBack, title: "Close" , value: "Close" } //2 =  Delete Port
            ];
                            
            const card = CardFactory.heroCard('Do you want to Open or Close the Port??', undefined, buttons, { text: 'Choose one of the following options'  });
            optionPrompt.attachments = [card];
            return await step.prompt(OPTIONS_PROMPT, optionPrompt);
                //await prompt.context.sendActivity('Please tell me your name.');
                return false;
            } else {
                const value = prompt.recognized.value;
                if (value.length < 1) {
                    await prompt.context.sendActivity('Your name has to include at least one character.');
                    return false;
                } else if (value.length > 50) {
                    await prompt.context.sendActivity(`Sorry, but I can only handle names of up to 50 characters. Yours was ${ value.length }.`);
                    return false;
                } else {
                    return true;
                }
            }
        });
    }
};