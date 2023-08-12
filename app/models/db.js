const mysql = require('mysql'); 
const dbConfig = require('../config/db.config.js'); 

// create a connection to the database 
const connection = mysql.createConnection({
    host: dbConfig.host, 
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.db
}); 

// open the MYSQL connection 
connection.connect(error => {
    if(error) throw error; 
    console.log('Sucessfully connected to the database'); 
}); 

module.exports = connection; 