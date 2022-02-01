

const axios = require('axios');
const zaaid = require('./zaaid');
const accessToken = require('./accessToken');

exports.getReportCard  = async (monitorId, companyName, startDate, endDate) =>{
    if(companyName == "CXIO Technologies Pvt Ltd")
	{
        companyName = "Cloudxchange";
	}
    console.log("reportcard funtion compan name is : "+companyName);
	console.log("reportcard funtion monitorId companyName compan name is : "+monitorId);
	console.log("reportcard funtion startDate compan name is : "+startDate);
	console.log("reportcard funtion endDate compan name is : "+endDate);
	
    const zaaID = await zaaid.getZaaid(companyName);
    const token = await accessToken.getAccessToken();
    console.log("reportCard.js received accessToken successfully");
    var reply = {cpu :{}, disk :{}, memory :{}};
	 console.log(`https://www.site24x7.com/api/reports/performance/${monitorId}?period=50&unit_of_time=2&start_date=${startDate}&end_date=${endDate}&report_attribute=CPU`)
    try {
        //CPU Details
		console.log(`https://www.site24x7.com/api/reports/performance/${monitorId}?period=50&unit_of_time=2&start_date=${startDate}&end_date=${endDate}&report_attribute=CPU`);
		console.log("hiiiiiiiiii");
        var response = await axios.get(`https://www.site24x7.com/api/reports/performance/${monitorId}?period=50&unit_of_time=2&start_date=${startDate}&end_date=${endDate}&report_attribute=CPU`, {
            headers: {
                'Accept': 'application/json; version=2.0',
                'Authorization': 'Zoho-oauthtoken '+token,
                'Cookie': `msp_zaaid=${zaaID}`
            }
        });
         console.log("this"+response);
		  //console.log(`https://www.site24x7.com/api/reports/performance/${monitorId}?period=50&unit_of_time=2&start_date=${startDate}&end_date=${endDate}&report_attribute=CPU`)
        var info = response.data;
		console.log("Inside Try");
       // console.log(JSON.stringify(info, null, 2));
        reply.cpu.max = info.data.chart_data[0][0].OverallCPUChart['max'][0];
        reply.cpu.min = info.data.chart_data[0][0].OverallCPUChart['min'][0];
        reply.cpu.ninetyFivePercentile = info.data.chart_data[0][0].OverallCPUChart['95_percentile'][0];

        //Disk Details
        response = await axios.get(`https://www.site24x7.com/api/reports/performance/${monitorId}?period=50&unit_of_time=2&start_date=${startDate}&end_date=${endDate}&report_attribute=DISK`, {
            headers: {
                'Accept': 'application/json; version=2.0',
                'Authorization': 'Zoho-oauthtoken '+token,
                'Cookie': `msp_zaaid=${zaaID}`
            }
        });
        info = response.data;

        reply.disk.max = info.data.table_data[0].DISKUSEDPERCENT['max'];
        reply.disk.min = info.data.table_data[0].DISKUSEDPERCENT['min'];
        reply.disk.ninetyFivePercentile = info.data.table_data[0].DISKUSEDPERCENT['95_percentile'];

        //Memory Details
        response = await axios.get(`https://www.site24x7.com/api/reports/performance/${monitorId}?period=50&unit_of_time=2&start_date=${startDate}&end_date=${endDate}&report_attribute=MEMORY`, {
            headers: {
                'Accept': 'application/json; version=2.0',
                'Authorization': 'Zoho-oauthtoken '+token,
                'Cookie': `msp_zaaid=${zaaID}`
            }
        });
        info = response.data;
        reply.memory.max = info.data.table_data[0].MEMUSEDPERCENT['max'];
        reply.memory.min = info.data.table_data[0].MEMUSEDPERCENT['min'];
        reply.memory.ninetyFivePercentile = info.data.table_data[0].MEMUSEDPERCENT['95_percentile']; 

        console.log(JSON.stringify(reply, null, 2));
		 console.log("ReportCard");
		  console.log("Reportcard");

        return { success: true, data: reply };
    } catch (error) {
        console.log("REPORT ERROR : "+JSON.stringify(error));
		
        return { success: false, data: reply };
    }
    
};



