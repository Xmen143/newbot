var mysql = require('mysql');
 //var dateFormat = require('dateformat');
 const dotenv = require('dotenv');
dotenv.config();
console.log("process.env.DATABASE_HOST"+process.env.DATABASE_HOST);
 var config2 = {
	host    :  "127.0.0.1",
    user    : "root",
    password: 'cloud',
    database:  "serverdetails",
    port    :  3306,
    debug: false,
	multipleStatements: true,
	//connectTimeout: 30000
  } 
 /* var config1 = {
	host    : '104.211.216.25',
    user    : 'newbotuser',
    password: 'cloud',
    database: 'db_cloudxchange',
    port    :  3306,
    debug: false,
	multipleStatements: true
	//connectTimeout: 30000
  }  */
   /*  var config = {
	host    : '104.211.216.25',
    user    : 'cxiobot',
    password: 'cloud',
    database: 'cloudxchange_clients',
    port    :  3306,
    debug: false
   
  }   */
  var connection3= mysql.createPool(config2); //added the line
 
   connection3.getConnection(function(err){
      if (err){
        console.log('Error connecting to Cloudxchange sales db Database: ' + err.stack);
      } else {
        console.log('SALES Database connection successfull!');
        console.log(connection3)
		
      }
  });
  
  
  
  
  
module.exports = {
     connection3 : mysql.createPool(config2) 
}