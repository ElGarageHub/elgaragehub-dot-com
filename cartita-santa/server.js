"use strict";

const PORT = 5474;

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');

const app = express();
app.use(bodyParser.raw({
  inflate: true,
  limit: '1024mb',
  type: 'text/plain'
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let privateKey = fs.readFileSync('/etc/letsencrypt/live/elgaragehub.com/privkey.pem', 'utf8');
let certificate = fs.readFileSync('/etc/letsencrypt/live/elgaragehub.com/fullchain.pem', 'utf8');
let credentials = {key: privateKey, cert: certificate};

app.post('/save-image', function(req, res) {
  var base64Data = req.body.toString().replace(/^data:image\/png;base64,/, "");
  console.log('Image received.');
  fs.writeFile(
    'received-images/' + generateRandomID() + '.png',
    base64Data,
    'base64',
    function(err) {
      if(err) {
        console.log(err);
        res.send("ERROR: " + err);
      } else {
        res.send("OK");
      }
    }
  );
});

app.get('/image-list', function(req, res) {
  fs.readdir('./received-images', function(err, items) {
    if(err) {
      console.log(err);
      res.send('ERROR: ' + err);
    } else {
      console.log(items.filter(file => file.endsWith('.png')));
      res.send(items.filter(file => file.endsWith('.png')));
    }
  });
});

let httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => console.log('Listening on port ' + PORT));

function generateRandomID() {
  return Math.round(Math.random() * Math.pow(10, 15));
}
