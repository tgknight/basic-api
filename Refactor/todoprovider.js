var MiddleWare = require('./middleware');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT+'/blog';
var db;

MongoClient.connect(url, function(err, database){
  if(err){console.log('failed to connect: ' + err); return;}
  db = database;
});

//insert
var insertDocuments = function(req, res, urlx) {
  var json = req.body;
  var doc = { 'ID':parseInt(json.id),
              'Description':json.Description,
              'Completed':json.Completed,
              'Duration':json.Duration};
  if(json.id == null || json.id == '' || MiddleWare.checkInput(req, res, json) == false) {
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
    if(MiddleWare.checkResult(req, res, docs) == true) {
      res.send('Not found :-(', 404);}
    else {
      res.send(docs);}
  });
}

//get
var getDocuments = function(req, res, urlx) {
  if(MiddleWare.checkNum(req, res) == false) {
    res.send('Wrong Input!!! (Maybe it is not number)', 400);}
  else {
    var myquery = { ID: parseInt(req.params.id)};
    db.collection(urlx).findOne(myquery,function(err, docs){
      if(MiddleWare.checkResult(req, res, docs) == false) {
        res.send('Not found :-(', 404);}
      else {
        res.send(docs);}
    });
  }
}

//delete
var deleteDocuments = function(req, res, urlx) {
    if(MiddleWare.checkNum(req, res) == false) {
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
  if(MiddleWare.checkNum(req, res) == false) {
    res.send('Wrong Input!!! (Maybe it is not number)', 400);}
  else {
    var myquery = { ID: parseInt(req.params.id)};
    var newquery = {$set: { Description: json.Description,
                            Completed: json.Completed,
                            Duration: json.Duration}}
      if(MiddleWare.checkInput(req, res, json) == false) {
        res.send('Something wrong???', 400);}
      else {
        db.collection(urlx).findOneAndUpdate(myquery,newquery,{returnOriginal:false},function(err,docs){
          res.send(docs);
        });
      }
    }
}

module.exports.insertDocuments = insertDocuments;
module.exports.listDocuments = listDocuments;
module.exports.getDocuments = getDocuments;
module.exports.deleteDocuments = deleteDocuments;
module.exports.updateDocuments = updateDocuments;
