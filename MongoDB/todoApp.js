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
app.post('/task', function(req, res){
  var json = req.body;
  var doc = {'ID':parseInt(json.id),
              'Description':json.Description,
              'Completed':json.Completed,
              'Duration':json.Duration};
  if(json.id == null||typeof json.Description !== 'string'||typeof json.Completed !== 'boolean'||typeof json.Duration !== 'string'){
    res.send('Something wrong???', 400);
  }
  else {
  db.collection('task').insert(doc, {w:1}, function(err, result){
    db.collection('task').findOne({ ID: parseInt(json.id)},function(err, docs){
        res.send(docs,201);
    });
  });
  }
});

app.post('/work', function(req, res){
  var json = req.body;
  var doc = {'ID':parseInt(json.id),
              'Description':json.Description,
              'Completed':json.Completed,
              'Duration':json.Duration};
  if(json.id == null||typeof json.Description !== 'string'||typeof json.Completed !== 'boolean'||typeof json.Duration !== 'string'){
    res.send('Something wrong???', 400);
  }
  else {
  db.collection('work').insert(doc, {w:1}, function(err, result){
    db.collection('work').findOne({ ID: parseInt(json.id)},function(err, docs){
        res.send(docs,201);
    });
  });
  }
});

//list
app.get('/task', function(req, res){
    db.collection('task').find().toArray(function(err, docs){
      if(docs == ''){
        res.send('Not found :-(', 404);
      } else {
        res.send(docs);}
    });
});

app.get('/work', function(req, res){
    db.collection('work').find().toArray(function(err, docs){
      if(docs == ''){
        res.send('Not found :-(', 404);
      } else {
        res.send(docs);}
    });
});

//get
app.get('/task/:id', function(req, res){
    if(isNaN(parseInt(req.params.id)) == true){
      res.send('Wrong Input!!! (Maybe it is not number)', 400);
    }
    else{
    var myquery = { ID: parseInt(req.params.id)};
    db.collection('task').findOne(myquery,function(err, docs){
      if(docs == null){
        res.send('Not found :-(', 404);
      } else {
        res.send(docs);}
    });
    }
});

app.get('/work/:id', function(req, res){
    if(isNaN(parseInt(req.params.id)) == true){
      res.send('Wrong Input!!! (Maybe it is not number)', 400);
    }
    else{
    var myquery = { ID: parseInt(req.params.id)};
    db.collection('work').findOne(myquery,function(err, docs){
      if(docs == null){
        res.send('Not found :-(', 404);
      } else {
        res.send(docs);}
    });
    }
});

//delete
app.delete('/task/:id', function(req, res){
  if(isNaN(parseInt(req.params.id)) == true){
    res.send('Wrong Input!!! (Maybe it is not number)', 400);
  }
  else{
  var myquery = { ID: parseInt(req.params.id)};
  db.collection('task').remove(myquery, function(err, docs){
    db.collection('task').findOne(myquery,function(err, docs){
        res.send(docs,204);
    });
  });
  }
});

app.delete('/work/:id', function(req, res){
  if(isNaN(parseInt(req.params.id)) == true){
    res.send('Wrong Input!!! (Maybe it is not number)', 400);
  }
  else{
  var myquery = { ID: parseInt(req.params.id)};
  db.collection('work').remove(myquery, function(err, docs){
    db.collection('work').findOne(myquery,function(err, docs){
        res.send(docs,204);
    });
  });
  }
});

//update
app.patch('/task/:id', function(req, res){
  var json = req.body;
  if(isNaN(parseInt(req.params.id)) == true){
    res.send('Wrong Input!!! (Maybe it is not number)', 400);
  } else {
  var myquery = { ID: parseInt(req.params.id)};
  var newquery = {$set: {Description: json.Description,
                        Completed: json.Completed,
                        Duration: json.Duration}}
    if(typeof json.Description !== 'string'||typeof json.Completed !== 'boolean'||typeof json.Duration !== 'string'){
      res.send('Something wrong???', 400);}
    else{
      db.collection('task').findOne(myquery,function(err, docs){
        if(docs == null){
          res.send('Not found :-(', 404);
        }
        else{
          db.collection('task').findOneAndUpdate(myquery,newquery,{upsert: true},function(err,docs){
            db.collection('task').findOne(myquery,function(err, docs){
              res.send(docs);
            });
          });
        }
      });
    }
    }
});

app.patch('/work/:id', function(req, res){
  var json = req.body;
  if(isNaN(parseInt(req.params.id)) == true){
    res.send('Wrong Input!!! (Maybe it is not number)', 400);
  } else {
  var myquery = { ID: parseInt(req.params.id)};
  var newquery = {$set: {Description: json.Description,
                        Completed: json.Completed,
                        Duration: json.Duration}}
    if(typeof json.Description !== 'string'||typeof json.Completed !== 'boolean'||typeof json.Duration !== 'string'){
      res.send('Something wrong???', 400);}
    else{
      db.collection('work').findOne(myquery,function(err, docs){
        if(docs == null){
          res.send('Not found :-(', 404);
        }
        else{
          db.collection('work').findOneAndUpdate(myquery,newquery,{upsert: true},function(err,docs){
            db.collection('work').findOne(myquery,function(err, docs){
              res.send(docs);
            });
          });
        }
      });
    }
    }
});

app.get('*', function(req, res){
  res.send('Not found :-(', 404);
});
