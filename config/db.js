let mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: (process.env.NODE_ENV == 'production') ? 'root' : 'root',
    /* password : (process.env.NODE_ENV == 'production')?'hp_back22!!':'hp_back22!!', */
    password: (process.env.NODE_ENV == 'production') ? '' : '',
    database: (process.env.NODE_ENV == 'production') ? 'anda_tsena' : 'anda_tsena',
    multipleStatements: true
});


//Solarpro!!
connection.connect()
    //type Utilisateur 
module.exports = connection