const { ActionTypes, ActivityTypes, CardFactory } = require('botbuilder');
const { option } = require('./option');

const reply = { type: ActivityTypes.Message };
const buttons = [
    { type: ActionTypes.PostBack, title: "Get your server performance details" , value: option.reports },
    { type: ActionTypes.PostBack, title: "Take snapshot" , value: option.snapshots },
    { type: ActionTypes.PostBack, title: "Open/Close Ports of your Server" , value: option.ports },
    { type: ActionTypes.PostBack, title: "Start/Stop  your Server" , value: option.servers },
    { type: ActionTypes.PostBack, title: "Try to answer any other query" , value: option.queries },
    { type: ActionTypes.PostBack, title: "Raise support request with Cloudxsupport Team" , value: option.help }
];
const card = CardFactory.heroCard('Here is what I can do !!', undefined,
    buttons, { text: 'Choose one of the following options or type in your custom request:' });
reply.attachments = [card];

exports.optionPrompt = reply;