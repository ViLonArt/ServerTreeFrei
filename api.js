const express = require('express'),
app = express(),
mysql = require('mysql'), // import mysql module
cors = require('cors'),
bodyParser = require('body-parser');


// make server object that contain port property and the value for our server.
var server = {
  port: 3000
};

// setup database
db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'MyPassword',
    database: 'bddtreefrei'
})

// use the modules
app.use(cors())
app.use(bodyParser.json());

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + db.threadId);
});

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));

app.get('/:code', (req, res) => {
    let sql = `SELECT * FROM bdd_treefrei WHERE code=`+req.params.code;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data
      })
    })
})