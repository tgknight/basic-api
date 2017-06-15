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
  if(err){  console.log('failed to connect: ' + err); return;}
  db = database;
  app.listen(8082);
  console.log("Connected correctly to server!!");
});

//insert
app.post('/task', function(req, res){
  var json = req.body;
  var doc = {'ID':parseInt(json.id),
             'Description':json.Description,
             'Completed':json.Completed,
             'Duration':json.Duration};
    db.collection('task').insert(doc, {w:1}, function(err, result){
    res.send(result);
  });
});

app.post('/work', function(req, res){
  var json = req.body;
  var doc = {'ID':parseInt(json.id),
             'Description':json.Description,
             'Completed':json.Completed,
             'Duration':json.Duration};

    db.collection('work').insert(doc, {w:1}, function(err, result){
    res.send(result);
  });
});

//list
app.get('/task', function(req, res){
    db.collection('task').find().toArray(function(err, docs){
        res.send(docs);
    });
});

app.get('/work', function(req, res){
    db.collection('work').find().toArray(function(err, docs){
        res.send(docs);
    });
});


//get
app.get('/task/:id', function(req, res){
    var query = { ID: parseInt(req.params.id)};
    db.collection('task').find(query).toArray(function(err, docs){
        res.send(docs);
      });
});
app.get('/work/:id', function(req, res){
    var query = { ID: parseInt(req.params.id)};
    db.collection('work').find(query).toArray(function(err, docs){
        res.send(docs);
      });
});

//delete
app.delete('/task/:id', function(req, res) {
  var myquery = { ID: parseInt(req.params.id)};
  db.collection('task').remove(myquery, function(err, docs) {
    db.collection('task').find(myquery).toArray(function(err, docs){
        res.send(docs);
    });
  });
});
app.delete('/work/:id', function(req, res) {
  var myquery = { ID: parseInt(req.params.id)};
  db.collection('work').remove(myquery, function(err, docs) {
    db.collection('work').find(myquery).toArray(function(err, docs){
        res.send(docs);
    });
  });
});

//update
app.patch('/task/:id/:description', function(req, res){
  var myquery = { ID: parseInt(req.params.id)};
  var newquery = {$set: {Description: req.params.description}}
  db.collection('task').findOneAndUpdate(myquery,newquery,{upsert: true},function(err,docs){
      db.collection('task').find(myquery).toArray(function(err, docs){
          res.send(docs);
      });
  });
});
app.patch('/work/:id/:description', function(req, res){
  var myquery = { ID: parseInt(req.params.id)};
  var newquery = {$set: {Description: req.params.description}}
  db.collection('work').findOneAndUpdate(myquery,newquery,{upsert: true},function(err,docs){
      db.collection('work').find(myquery).toArray(function(err, docs){
          res.send(docs);
      });
  });
});
