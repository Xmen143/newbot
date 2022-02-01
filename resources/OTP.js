var nodemailer =  require('nodemailer');
var strings = require('node-strings');

var generateOTP = function (){
		function randomString(length, chars) 
		{
			var result = '';
			for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
			return result; 	
		}
		var OTP = randomString(6, '0123456789');
		console.log("OTP is " + OTP);
		return OTP;
};

/* var sendOTP = function(mail,OTP) {	
		//console.log("Mail received is : ");
		console.log("At send OTP function");
		let transporter = nodemailer.createTransport({
		 
		  host:'smtp.office365.com',
		  secureConnection: false,
		 requireTLS: true, 
		  port:587,
		   tls: {
                 ciphers:'SSLv3'
                }, 
		  auth: {
			user: 'Customer_Communications@cloudxsupport.com',   // Official Cloudxsupport mail and password to be entered
			pass: 'Cloud@1234'
		  } ,
		  logger:true,
		  debug:true
		  
		   
		
		 
		});
      
		
		let receiverDetails = {
		  from: '"cloudxsupport" <Customer_Communications@cloudxsupport.com>',		  
		  to: mail,   //variable mail to be entered
		  subject: 'Your OTP is '+OTP+ '  for cloudxsupport BOT',
		  text: 'Dear Customer, \nYour One-Time Password(OTP) for cloudxsupport BOT verification is : '+OTP+ '\nThanks & Regards    \nCloudxsupport Team'
		};

		transporter.sendMail(receiverDetails, (error, info) => {
			//console.log("Mail Sent")
			console.log("OTP : at send otp transporter error is "+JSON.stringify(error)+" info is "+JSON.stringify(info));
			return null;
		  });
		  
};
 */
module.exports.generateOTP = generateOTP;
//module.exports.sendOTP = sendOTP;
