const express = require('express'),
app = express(),
const { Client } = require('pg'), // import postgre module
cors = require('cors'),
bodyParser = require('body-parser');


// make server object that contain port property and the value for our server.
var server = {
  port: 3000
};

// setup database
const db = new Client({
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
  const sql = "SELECT * FROM bdd_treefrei WHERE code=$1"
  const result = await client.query({
    text: sql,
    values: [req.params.code] // ici name et description ne sont pas concaténées à notre requête
  })
  res.json({ status: 200, result})
})