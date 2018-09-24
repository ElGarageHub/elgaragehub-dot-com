"use strict";

const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const util = require('util');
const db = require('./modules/database.js');
const auth = require('./modules/auth.js');

function error(msg) {
  if(msg) {
    console.log(msg);
  } else {
    console.log('ERROR');
  }
  process.exit();
};

let privateKey = fs.readFileSync('/etc/letsencrypt/live/elgaragehub.com/privkey.pem', 'utf8');
let certificate = fs.readFileSync('/etc/letsencrypt/live/elgaragehub.com/fullchain.pem', 'utf8');
let credentials = {key: privateKey, cert: certificate};

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

function generateRandomLlave() {
  let chars = 'ABCDEFGHJKLMNPQRTWXYZ2346789';
  var result = '';
  for (var i = 5; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

app.post('/register', function(req, res) {
  let id = db.generateRandomID();
  console.log('Inserting Estudiante ' + id);
  db.insertEstudiante(id, req.body, function(err) {
    if(err) {
      console.log(err);
      console.log('Aborted insertion of Estudiante ' + id);
      res.send({
        stat: "error",
        message: err
      });
    } else {
      console.log('Estudiante ' + id + ' inserted');
      res.send({
        stat: "ok"
      });
    }
  });
});

app.post('/login', function(req, res) {
  let id = db.generateRandomID();
  console.log('Inserting User ' + id);
  auth.getPayload(req.body.id_token, function(payload) {
    db.insertUser(id, {
      googleId: payload.sub,
      email: payload.email,
      nombres: payload.given_name,
      apellidos: payload.family_name
    }, function(err) {
      if(err) {
        console.log(err);
        console.log('Aborted insertion of User ' + id);
        res.send({});
      } else {
        console.log('User ' + id + ' inserted');
        res.send({});
      }
    });
  }, function(err) {
    console.log(err);
    console.log('Aborted insertion of User ' + id);
    res.send({});
  });
});

app.post('/add-programa', function(req, res) {
  let id = db.generateRandomID();
  console.log('Inserting Programa ' + id);
  auth.getPayload(req.body.id_token, function(payload) {
    db.insertPrograma(id, {
      nombre: req.body.nombre,
      googleId: payload.sub
    }, function(err) {
      if(err) {
        console.log(err);
        console.log('Aborted insertion of Programa ' + id);
        res.send({});
      } else {
        console.log('Programa ' + id + ' inserted');
        res.send({});
      }
    });
  }, function(err) {
    console.log(err);
    console.log('Aborted insertion of Programa ' + id);
    res.send({});
  });
});

app.post('/add-escuela', function(req, res) {
  let id = db.generateRandomID();
  console.log('Inserting Escuela ' + id);
  auth.getPayload(req.body.id_token, function(payload) {
    db.insertEscuela(id, {
      nombre: req.body.nombre,
      googleId: payload.sub
    }, function(err) {
      if(err) {
        console.log(err);
        console.log('Aborted insertion of Escuela ' + id);
        res.send({});
      } else {
        console.log('Escuela ' + id + ' inserted');
        res.send({});
      }
    });
  }, function(err) {
    console.log(err);
    console.log('Aborted insertion of Escuela ' + id);
    res.send({});
  });
});

app.post('/gen-llave', function(req, res) {
  let llave = generateRandomLlave();
  console.log('Inserting llave ' + llave);
  auth.getPayload(req.body.id_token, function(payload) {
    db.insertLlave(llave, payload.sub, function(err) {
      if(err) {
        console.log(err);
        console.log('Aborted insertion of llave ' + llave);
        res.send({});
      } else {
        console.log('Llave ' + llave + ' inserted');
        res.send({
          llave: llave
        });
      }
    });
  }, function(err) {
    console.log(err);
    console.log('Aborted insertion of llave ' + llave);
    res.send({});
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
      let httpsServer = https.createServer(credentials, app);
      httpsServer.listen(9484);
    }
  });
})();
