var mysql = require('mysql');
 var dateFormat = require('dateformat');
 const dotenv = require('dotenv');
dotenv.config();
 var config1 = {
	host    :  process.env.DATABASE_HOST,
    user    : process.env.DATABASE_USER2,
    password: process.env.DATABASE_PASSWORD,
    database:  process.env.DATABASE_NAME2,
    port    :  3306,
    debug: false,
	multipleStatements: true
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
  var connection2 = mysql.createPool(config1); //added the line
 
   connection2.getConnection(function(err){
      if (err){
        console.log('Error connecting to Cloudxchange db_cloudxchange  Database: ' + err.stack);
      } else {
        console.log('Cloudxchange db_cloudxchange  Cloudxchange Client Database connection successfull!');
		
      }
  });
  
  
  
  
  
module.exports = {
     connection2 : mysql.createPool(config1) 
}