var sanitizeHtml = require('sanitize-html');
var striptags = require('striptags');
const config1 = require('../resources/databaseDetails2');
var connection2 = config1.connection2
const config = require('../resources/databaseDetails');
var connection = config.connection; 
var arr_icons=[];
const process = require('../resources/intent');
exports.permissioncheck = async (cname,intent) =>{
	//const companys= cname;
    const luisintent= intent;
	
	var jsoncompanyName=JSON.stringify(cname);
	 var companys=jsoncompanyName.split('[').pop().split(']')[0];
	var intentcheck;
	 arr_icons = await process.processCmpintent(companys,intent);
	 
	 
	 
	console.log('After splitting the aaaaaaaaaaaaaaatbody tag'+JSON.stringify(arr_icons));
	var check;
	if(intent !='exit' ||intent !='None')
	{
		for(var i=0;i < arr_icons.length;i++)
		{
			console.log("INTENTsssssssssssecjjjjjjj");
			var index = arr_icons.indexOf(intent); // get index if value found otherwise -1
			
			if (index > -1) { //if found
			  intentcheck='intentpresent';
			}
				
		}
	}
	console.log("INPERMISSION .jS"+intentcheck);
	if(intentcheck=='intentpresent')
	{
		check="NA";
	} 
	else
	{
		check="A";
		
	}
	 
	 
	 return check;
	
}
//////////////////////////////////////////////////////////////////////////////////
exports.permissioncheckmain = async (cname,intent) =>{
	//const companys= cname;
    const luisintent= intent;
	
	var jsoncompanyName=JSON.stringify(cname);
	 var companys=jsoncompanyName.split('[').pop().split(']')[0];
	var intentchecking;
	 arr_icons = await process.processCmpintent(companys,intent);
	 
	 
	 
	console.log('After splitting the aaaaaaaaaaaaaaatbody tag'+JSON.stringify(arr_icons));
	var checking;
	if(intent !='exit' ||intent !='None')
	{
		if(arr_icons!="")
		{
		 intentchecking='intentpresent';
		 }
	}
	console.log("INTENTsssssssssssecjjjjjjjpermissioncheckmain"+intentchecking);
	if(intentchecking=='intentpresent')
	{
		checking="NA";
	} 
	else
	{
		checking="A";
		
	}
	 
	 
	 return checking;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    
	

}