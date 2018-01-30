const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const util = require('util');
const fs = require('fs');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

let db = new sqlite3.Database(path.join(__dirname, 'database.db'));

process.on('SIGINT', function() {
  console.log('SIGINT');
  process.exit();
});

app.listen(9484);
