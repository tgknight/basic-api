var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var url = 'mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT+'/blog';
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

MongoClient.connect(url, function(err, database){
  if(err){console.log('failed to connect: ' + err); return;}
  db = database;
  app.listen(8082);
  console.log("Connected correctly to server!!");
});

//insert
var insertDocuments = function(req, res, urlx) {
  var json = req.body;
  var doc = {'ID':parseInt(json.id),
              'Description':json.Description,
              'Completed':json.Completed,
              'Duration':json.Duration};
  if(json.id == null||
      typeof json.Description !== 'string'||
      typeof json.Completed !== 'boolean'||
      typeof json.Duration !== 'string'){
      res.send('Something wrong???', 400);}
  else {
    db.collection(urlx).insert(doc, {w:1}, function(err, result){
      db.collection(urlx).findOne({ ID: parseInt(json.id)},function(err, docs){
        res.send(docs,201);
      });
    });
  }
}

//list
var listDocuments = function(req, res, urlx) {
  db.collection(urlx).find().toArray(function(err, docs){
    if(docs == ''){
      res.send('Not found :-(', 404);}
    else {
      res.send(docs);}
  });
}

//get
var getDocuments = function(req, res, urlx) {
  if(isNaN(parseInt(req.params.id)) == true){
    res.send('Wrong Input!!! (Maybe it is not number)', 400);}
  else {
    var myquery = { ID: parseInt(req.params.id)};
    db.collection(urlx).findOne(myquery,function(err, docs){
      if(docs == null){
        res.send('Not found :-(', 404);}
      else {
        res.send(docs);}
    });
  }
}

//delete
var deleteDocuments = function(req, res, urlx) {
  if(isNaN(parseInt(req.params.id)) == true){
    res.send('Wrong Input!!! (Maybe it is not number)', 400);}
  else {
    var myquery = { ID: parseInt(req.params.id)};
    db.collection(urlx).remove(myquery, function(err, docs){
      db.collection(urlx).findOne(myquery,function(err, docs){
        res.send(docs,204);
      });
    });
  }
}

//update
var updateDocuments = function(req, res, urlx) {
  var json = req.body;
  if(isNaN(parseInt(req.params.id)) == true){
    res.send('Wrong Input!!! (Maybe it is not number)', 400);}
  else {
    var myquery = { ID: parseInt(req.params.id)};
    var newquery = {$set: {Description: json.Description,
                        Completed: json.Completed,
                        Duration: json.Duration}}
    if(typeof json.Description !== 'string'||
      typeof json.Completed !== 'boolean'||
      typeof json.Duration !== 'string'){
      res.send('Something wrong???', 400);}
    else {
      db.collection(urlx).findOneAndUpdate(myquery,newquery,function(err,docs){
        db.collection(urlx).findOne(myquery,function(err, docs){
          res.send(docs);
        });
      });
    }
  }
}

//insert
app.post('/task', function(req, res, next){insertDocuments(req, res, 'task');});
app.post('/work', function(req, res, next){insertDocuments(req, res, 'work');});
//list
app.get('/task', function(req, res, next){listDocuments(req, res, 'task');});
app.get('/work', function(req, res, next){listDocuments(req, res, 'work');});
//get
app.get('/task/:id', function(req, res, next){getDocuments(req, res, 'task');});
app.get('/work/:id', function(req, res, next){getDocuments(req, res, 'work');});
//delete
app.delete('/task/:id', function(req, res, next){deleteDocuments(req, res, 'task');});
app.delete('/work/:id', function(req, res, next){deleteDocuments(req, res, 'work');});
//update
app.patch('/task/:id', function(req, res, next){updateDocuments(req, res, 'task');});
app.patch('/work/:id', function(req, res, next){updateDocuments(req, res, 'work');});
//check 404
app.get('*', function(req, res, next){res.send('Not found :-(', 404);});
