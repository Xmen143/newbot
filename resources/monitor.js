const axios = require('axios');
const accessToken = require('./accessToken');
const process = require('../resources/Companynameprocessing');

exports.monitorFunction  = async (companyName) =>{
	console.log('After splitting the tbody tag'+companyName);
	var jsoncompanyName=JSON.stringify(companyName);
	console.log('Split inside MONITOR FUNCTION aafunction'+jsoncompanyName.split('[').pop().split(']')[0]);
	var   jsoncompanyNameprocess=jsoncompanyName.split('[').pop().split(']')[0];
	  console.log('After splitting the tbody tag'+jsoncompanyNameprocess);
	var arr=[];
	arr.length=0;
    arr = await process.processCmp(jsoncompanyNameprocess);
	const token = await accessToken.getAccessToken();
	console.log('the received oauthtoken  start');
    const response = await axios.get(`https://www.site24x7.com/api/msp/monitors/status`, {
        headers: {
            'Accept': 'application/json; version=2.0',
            'Authorization': 'Zoho-oauthtoken '+token
        }
    });
    
    const users = response.data;
	 //console.log(users);
	
    console.log("##############################################AT MONITOR FUNCTION! COmpnay name is "+companyName);
    if(companyName == "CXIO Technologies Pvt Ltd") {
        companyName = "Cloudxchange";
    }
    var monitor = [];
    console.log("monitor.js.monitorFunction : Before for loop");
	console.log( "this is server names"+JSON.stringify(arr));
    for(var i=0; i<users.data.length; i++)
    {
		for(var j=0;j<arr.length;j++)
		{
			 if(arr[j] == "CXIO Technologies Pvt Ltd")
			{
               companyName = "Cloudxchange";
				if(users.data[i].customer_name == companyName)  //to be replaced with companyName
				{
					console.log("monitor.js : company name found")
					monitor.push(users.data[i]);
				}
             }else
			 {
			
				 console.log("Cloudxchange");
				 
			 }
			 
			if(users.data[i].customer_name == arr[j])  //to be replaced with companyName
				{
					console.log("monitor.js : company name found")
					monitor.push(users.data[i]);
				}
			 
			
		}
    }
	arr.length=0;

    console.log("monitor.js : Monitors of Cloudxchange found are :");
    for(var i=0; i<monitor.length; i++)
    {
        console.log(monitor[i]);
    }
     
    return monitor;
};

