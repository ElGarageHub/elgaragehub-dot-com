const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const util = require('util');
const db = require('./modules/database.js');

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
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

process.on('SIGINT', function() {
  error('SIGINT');
});

app.post('/register', function(req, res) {
  let id = db.generateRandomID();
  db.insertEstudiante(id, req.body, function(err) {
    if(err) {
      console.log(err);
      res.send({
        stat: "error",
        message: err
      });
    } else {
      res.send({
        stat: "ok"
      });
    }
  });
});

app.get('/get-data', function(req, res) {
  db.getData(req.query.data, function(err, data) {
    if(err) {
      error(err);
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

(function() {
  console.log('Starting server...');
  db.readQueries(function(err) {
    if(err) {
      error(err);
    } else {
      console.log('Server Started.');
      app.listen(9484);
    }
  });
})();
