var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var MiddleWare = require('./middleware');

var app = express();
var url = 'mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT+'/blog';
var db;

MongoClient.connect(url, function(err, database){
  if(err){console.log('failed to connect: ' + err); return;}
  db = database;
  exports.db = db;
});

app.use(require('./config'))
app.listen(8082);
