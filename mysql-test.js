// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'aaabbb3',
//   database : 'emailseq'
// });

// connection.connect();

// connection.query('SELECT * from emails', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
// });

// connection.end();


var mysql = require('mysql'),
    pool = mysql.createPool({
	    connectionLimit : 100,
	    host     : 'localhost',
	    user     : 'root',
	    password : 'aaabbb3',
	    database : 'emailseq',
	    debug    :  false
  	});

  pool.getConnection(function(err, connection){
    connection.query( "select * from emails",  function(err, rows){
      if(err) {
        throw err;
      }else{
        console.log( rows );
      }
    });
    
    connection.release();
  });  	