const config1 = require('../resources/databaseDetails2');
var connection2 = config1.connection2
const config = require('../resources/databaseDetails');
var connection = config.connection; 
var arr_icons=[];
var arr_ico=[];

exports.processCmp  = async (jsoncompanyNameprocess) =>{
var sql1 = `SELECT * FROM tb_deployment_public WHERE cust_name in(${jsoncompanyNameprocess})`;
	console.log(sql1);
	console.log("thw array inside  brfore query COMPANYNAMEPROCESS Function "+JSON.stringify(arr_icons));
	arr_icons.length=0;
    connection2.query(sql1, function(err, rows, fields) {
    if (!err) {
		console.log(JSON.stringify(rows));
		var count =rows.length;
        if (count) 
		{
			console.log("inside count");
			var arr_id = rows.map(i => i.id); 
			var sql2 = `SELECT * FROM tb_site24x7_companies WHERE cust_id in ('${arr_id.join("','")}')  `; 
			connection.query(sql2, function(err, rows1, fields) 
			{
				if (!err) 
				{
					console.log(JSON.stringify(rows1));
					var count = rows1.length;
					if (count)
					{
						arr_icons.length=0;
						for(var k=0;k< rows1.length;k++)
						{
							arr_icons.push(rows1[k].company_name_site24x7);
							console.log("thw array after query inside COMPANYNAMEPROCESS Function "+JSON.stringify(arr_icons));
						}
						
					}else
					{
						console.log('no rows forsql2');
						
					}
				}else 
				{
				console.log('error...sql2');
				}
			});
		}else 
		{
		console.log('no rows for sql1');

        }
   }else 
   {
	console.log('error... in sql 1 ');
	}
	});





return arr_icons;




};




