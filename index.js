'use strict';

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./private-key.pem', 'utf8');
var certificate = fs.readFileSync('./certificate.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

var bodyParser     = require('body-parser');
var controller = require('./sonos.controller');

// your express configuration here
app.set('port', (process.env.PORT || 5004));
app.use(bodyParser.json());
app.post('/', controller.index);

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//httpServer.listen(80);
//httpsServer.listen(5004);

httpsServer.listen(app.get('port'), function() {
  console.log("Sonos Control Alexa skill/intent parser is running at localhost:" + app.get('port'));
});

//httpServer.listen(app.get('port'), function() {
  //console.log("Node app is running at localhost:" + app.get('port'));
//});
