const config1 = require('../resources/databaseDetails2');
var connection2 = config1.connection2
const config = require('../resources/databaseDetails');
var connection = config.connection; 
var arr_icons=[];
const arr_ico=[];

exports.processCmpintent  = async (companys,intent) =>{
return new Promise((resolve, reject) => {
	console.log('intent.js company name:'+companys);
	console.log('intent.js intent_name:'+intent);
	connection.query(`select tb_bot_intent_name.intent_name from tb_bot_intent_processing left join tb_bot_intent_name on tb_bot_intent_processing.intent_restricted=tb_bot_intent_name.id where tb_bot_intent_processing.company in (${companys})  AND tb_bot_intent_processing.status=0 `, (err,rows2) => {
	  if(err) throw err;

	  console.log('Data received from Db:');
	  console.log(rows2);
	  arr_ico.length=0;
	  if(rows2!="")
	  {
		  console.log('Data aaaaaareceived from Db:');
	  rows2.forEach( (row) => {
		
		  arr_ico.push(`${row.intent_name}`);
	 
		});
		 return err ? reject(err) : resolve(arr_ico);
		
	  }else
	  {
		  arr_ico.length=0;
		  return err ? reject(err) : resolve(arr_ico);
	  }
	 
	  
	});
	
});
	
	
};






