const axios = require('axios');
 
exports.getAccessToken = async ()=>{

    // The await keyword saves us from having to write a .then() block.
    let json = await axios.post('https://accounts.zoho.com/oauth/v2/token?client_id=1000.MM9WSOUFFK2D05036GZELQRKKMJDHH&client_secret=d4352e12ed44e83db72d8f557e3c72f98c82807fff&grant_type=refresh_token&redirect_uri=https://www.site24x7.com&refresh_token=1000.62b09fe7ea087301c5a7c5b0d840b2c0.e3d138d81d2ac7710e65620c15366eef');

    console.log('accessToken.js ' + json.data.access_token);

    return json.data.access_token;
};