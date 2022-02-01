const axios = require('axios');
const accessToken = require('./accessToken');

exports.getZaaid  = async (companyName) =>{
    const token = await accessToken.getAccessToken();
    const response = await axios.get(`https://www.site24x7.com/api/short/msp/customers`, {
        headers: {
            'Accept': 'application/json; version=2.0',
            'Authorization': 'Zoho-oauthtoken '+token
        }
    });

    const users = response.data;
    var zaaid = "";

    for(var i=0; i<users.data.length; i++)
    {
        if(users.data[i].name == companyName)
        {
            zaaid = users.data[i].zaaid;
            console.log("LLOOKK HEERE Zaaid is : " + zaaid);
        }
    }
    
    return zaaid;
};
