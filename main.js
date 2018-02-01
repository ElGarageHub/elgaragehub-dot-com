const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const util = require('util');
const fs = require('fs');

const DB_FILE = path.join(__dirname, 'database.db');
const SQL_CREATE_TABLES = path.join(__dirname, 'sql/CreateTables.sql');

let db = new sqlite3.Database(DB_FILE);

function error(msg) {
  if(msg) {
    console.log(msg);
  } else {
    console.log('ERROR');
  }
  process.exit();
};

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

process.on('SIGINT', function() {
  error('SIGINT');
});

app.get('/get-data', function(req, res) {
  switch(req.query.data) {
    case 'escuelas':
      db.all('SELECT id, nombre FROM Escuelas', function(err, rows) {
        if(err) error('ERROR al consultar la tabla Escuelas');
        res.send(JSON.stringify(rows));
      });
      break;
  }
});

console.log('Starting server.');
app.listen(9484);
