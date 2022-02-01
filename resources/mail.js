var nodemailer =  require('nodemailer');
var strings = require('node-strings');
 const dotenv = require('dotenv');
dotenv.config();
var sendFailedquery = function(texts,subject) {	
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
			user: process.env.MAIL_USERNAME,   // Official Cloudxsupport mail and password to be entered
			pass: process.env.MAIL_PASSWORD
		  } ,
		  logger:true,
		  debug:true
		  
		   
		
		 
		});
      
		
		var maillist=[
		'Customer_Communications@cloudxsupport.com',
		  'development@cloudxchange.io',
		   
		];
		let receiverDetails = {
		  from: '"CXIO Chat Bot" <Customer_Communications@cloudxsupport.com>',		  
		  to:maillist,
		    //variable mail to be entered
		  subject: 'CXIOBOT '+subject,
		  text: ' Message: '+texts,
		  /* text: ' USER QUERY: '+texts+ '\n The above mentioned query was asked by customer,but CXIOBOT FAILED to answer.\n Look into the matter and take the required action    \nThanks & Regards', */
		  
		}; 

		transporter.sendMail(receiverDetails, (error, info) => {
			//console.log("Mail Sent")
			console.log("aaaaaaaaaaaaaaaaaaaaaaOTP : at send otp transporter error is "+JSON.stringify(error)+" info is "+JSON.stringify(info));
			return null;
		  });
		  
};
var sendBlockmail = function(texts,subject) {	
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
			user: process.env.MAIL_USERNAME,   // Official Cloudxsupport mail and password to be entered
			pass: process.env.MAIL_PASSWORD
		  } ,
		  logger:true,
		  debug:true
		  
		   
		
		 
		});
      
		
		var maillist=[
		'Customer_Communications@cloudxsupport.com',
		  'development@cloudxchange.io',
		   
		];
		let receiverDetails = {
		  from: '"CXIO Chat Bot" <Customer_Communications@cloudxsupport.com>',		  
		  to:maillist,
		    //variable mail to be entered
		  subject: 'CXIOBOT '+subject,
		  text: ' Message: '+texts,
		  /* text: ' USER QUERY: '+texts+ '\n The above mentioned query was asked by customer,but CXIOBOT FAILED to answer.\n Look into the matter and take the required action    \nThanks & Regards', */
		  
		}; 

		transporter.sendMail(receiverDetails, (error, info) => {
			//console.log("Mail Sent")
			console.log("aaaaaaaaaaaaaaaaaaaaaaOTP : at send otp transporter error is "+JSON.stringify(error)+" info is "+JSON.stringify(info));
			return null;
		  });
		  
};


var sendOTP = function(mail,OTP) {	
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
			user: process.env.MAIL_USERNAME,   // Official Cloudxsupport mail and password to be entered
			pass: process.env.MAIL_PASSWORD
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


module.exports.sendFailedquery = sendFailedquery;
module.exports.sendOTP = sendOTP
module.exports.sendBlockmail = sendBlockmail;