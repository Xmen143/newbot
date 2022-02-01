var sanitizeHtml = require('sanitize-html');
var striptags = require('striptags');
exports.fv = async (uname) =>{
    const username = uname;
	console.log("aaaaaaaa"+username);
	var htmlText =username ;
	var noHTML = /(<([^>]+)>)/ig; // regex for removing HTML tags
	var clean = htmlText.replace(noHTML, ''); // remove all html tags
	console.log(clean);
	
    var mailformat =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
	//<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/
    
	 
    if(clean.match(mailformat)){
        console.log("formatValidator : Valid Username format");
        return true;
    } else {
        console.log("formatValidator : invalid email address format");
        return false;
    }   

}
//module.exports.fv() = fv();