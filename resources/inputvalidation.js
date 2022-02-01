var validator = require('validator');
const isIp = require('is-ip');
exports.validation = async (uname) =>{
	
	 

  
    const username = uname;
	console.log("aaaaaaaa"+username);
	var htmlText =username ;
	var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
	var clean = htmlText.replace(noHTML, ''); // remove all html tags
	console.log(clean);
     var name=clean.trim();
    
    return name;

};
exports.validationtag = async (uname) =>{
	
	 

  
    const username = uname;
	console.log("aaaaaaaa"+username);
	var htmlText =username ;
	var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
	var clean = htmlText.replace(noHTML, ''); // remove all html tags
	console.log(clean);
     var name=clean.trim();
    
    return name;

};

exports.validationip = async (ip) =>{
	
	 var htmlText =ip ;
	var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
	var clean = htmlText.replace(noHTML, ''); // remove all html tags
	console.log(clean);
     var ipname=clean.trim();
	 console.log("ipname"+ipname);
   
  
 var ipaddress=isIp(ipname); //=> true
if(ipaddress==true)
{
    var one=1;
return one;
}else{
	 var two= "-1";
return two;
}

};
exports.validationstringlengthdescription = async (textLength) =>{
	console.log("textLength");
	console.log(textLength);
	var htmlText =textLength;
	var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
	var clean = htmlText.replace(noHTML, ''); // remove all html tags
	console.log(clean);
    var textL=clean.trim();
	 console.log("DESCRIPTION "+textL);
	  var re =/^[a-zA-Z0-9-_ ($)\-!;:=*#\/().[@{}]+$/;
	 console.log(re.test(textL));
	 
	 if(textL.length< 50 && re.test(textL)==true)
	 {
		var one=1;
        return one;
		 
	 }
	 else
	 {
		var two= "-1";
        return two;
		 
	 }
   
  


};
exports.validationstringlength = async (textLength) =>{
	console.log("textLength");
	console.log(textLength);
	var htmlText =textLength;
	var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
	var clean = htmlText.replace(noHTML, ''); // remove all html tags
	console.log(clean);
    var textL=clean.trim();
	 console.log("ipname"+textL);
	 
	 
	 if(textL.length< 50)
	 {
		var one=1;
        return one;
		 
	 }
	 else
	 {
		var two= "-1";
        return two;
		 
	 }
   
  


};
exports.validationtagcharacter = async (tag) =>{
	
	 

  
    const tagname = tag;
	console.log("aaaaaaaa"+tagname);
	var htmlText =tagname ;
	var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
	var clean = htmlText.replace(noHTML, ''); // remove all html tags
	console.log(clean);
     var name=clean.trim();
	 var re = /^[a-zA-Z0-9-_()]+$/;
	 console.log(re.test(name));
		
	 if (re.test(name)==true) {
		console.log(re.test(name));
		 var one=1;
       return one;

	}else
	{
		 var two= "-1";
      return two;
		
	}
	 
    
    return name;

};
exports.validationretention = async (tag) =>{
	
	 

  
    const tagname = tag;
	console.log("aaaaaaaa"+tagname);
	var htmlText =tagname ;
	var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
	var clean = htmlText.replace(noHTML, ''); // remove all html tags
	console.log(clean);
     var name=clean.trim();
	 var re =  /^[1-9]+$/;
	 if (re.test(name)==true) {
		console.log(re.test(name));
		 var one=1;
           return one;

	}else
	{
		 var two= "-1";
      return two;
		console.log(re.test(name));
		console.log("false");
	}
	 
    
   

};

exports.validationport = async (ip) =>{
	
	 
   var htmlText =ip ;
	var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
	var clean = htmlText.replace(noHTML, ''); // remove all html tags
	console.log(clean);
     var ipname=clean.trim();
	 console.log(clean);
     var name=clean.trim();
	 var re =  /^[0-9]+$/;
	 
  
 var ipaddress=validator.isPort(ipname); //=> true
 
 
 var regexp = /^[0-9]+$/;
  var regexp1 = /^[*]+$/;
    var check = name;
    
    console.log("Hello World"+regexp.test(check));
    console.log("Hello World"+regexp1.test(check));
    
    if (regexp.test(check) === true || regexp1.test(check) === true  )
       {
           
           console.log("Hello World");
		     var ones=1;
   return ones;  
       }
    else{
      console.log("Hello Worldaaaaaaaaa");
	   var two= "-1";
return two;
        }
		
		
		
 /* if(ipname=="*")
 {
	  var ones=1;
   return ones;  
 }
else if(ipaddress==true && re.test(ipname)==true )
{
    var one=1;
return one;
}else{
	 var two= "-1";
return two;
} */

};

