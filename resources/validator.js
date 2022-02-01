const axios = require('axios');
const mail = require('../resources/mail');
var dateFormat = require('dateformat');


exports.v  = async (email) =>{
    var email1 = `email is ${ email }`;
    var urlencoded = encodeURIComponent(email1);
	 console.log('Validator : User  '+email1);
    const loginInfo = Buffer.from(`oidLL1P1szz5sR6lTqCN:@fter2Shift`).toString('base64'); //Convert to base64
    var url = `https://cloudxchangeio.freshservice.com/itil/requesters.json?query=` + urlencoded;
	console.log('Validator : User '+email1);
	console.log('Validator : User '+url);
    
    const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${ loginInfo }`
        }
    });
	console.log('Validator : User  exist'+response);
    
    if(response.data == ""){
        console.log('Validator : User does not exist');
        return {success: false, name: null, companyName: null};
    } else {
        console.log('Validator : User exists');
        console.log("*********************"+response.data);
		console.log("*********************"+JSON.stringify(response.data));
		const nDate = new Date().toLocaleString('en-US', {
         timeZone: 'Asia/Calcutta'
         });
         var istDate = dateFormat(nDate, "yyyy-mm-dd h:MM:ss TT");
		 var subject='Tracking Bot user';
		
        console.log("mainDialog.companyAndNameDetails response.data[0].user = "+ JSON.stringify(response.data[0].user, null, 2));
        var user1 = response.data[0].user;
        var name = user1.name;
        var companyName = user1.company_names;
        console.log(name);
		 mail.sendFailedquery("This user is using Bot = "  +email1+  ", \nTime  =" +istDate ,subject);
        console.log(companyName);
        return {success: true, name: name, companyName: companyName};
    }
};
