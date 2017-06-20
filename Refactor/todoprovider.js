var MiddleWare = require('./middleware');
var app = require('./app')

module.exports = {
//insert
insertDocuments: function(req, res, urlx) {
  var json = req.body;
  var db = app.db;
  var doc = { 'ID':parseInt(json.id),
              'Description':json.Description,
              'Completed':json.Completed,
              'Duration':json.Duration};
  if( json.id == null ||
      json.id == '' ||
      MiddleWare.checkInput(req, res, json) == false){
    res.send('Something wrong???', 400);}
  else {
    db.collection(urlx).insert(doc, {w:1}, function(err, result){
        res.send(result.ops[0],201);
    });
  }
},

//list
listDocuments: function(req, res, urlx) {
  var db = app.db;
  db.collection(urlx).find().toArray(function(err, docs){
    if(MiddleWare.checkResult(req, res, docs) == false) {
      res.send('Not found :-(', 404);}
    else {
      res.send(docs);}
  });
},

//get
getDocuments: function(req, res, urlx) {
  var db = app.db;
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
},

//delete
deleteDocuments: function(req, res, urlx) {
    var db = app.db;
    if(MiddleWare.checkNum(req, res) == false) {
      res.send('Wrong Input!!! (Maybe it is not number)', 400);}
    else {
    var myquery = { ID: parseInt(req.params.id)};
    db.collection(urlx).remove(myquery, function(err, docs){
        res.send(docs,204);
    });
  }
},

//update
updateDocuments: function(req, res, urlx) {
  var db = app.db;
  var json = req.body;
  if(MiddleWare.checkNum(req, res) == false) {res.send('Wrong Input!!! (Maybe it is not number)', 400);}
  else {
    var myquery = { ID: parseInt(req.params.id)};
    var newquery = {$set: { Description: json.Description,
                            Completed: json.Completed,
                            Duration: json.Duration}}
      if(MiddleWare.checkInput(req, res, json) == false) {
        res.send('Something wrong???', 400);}
      else {
        db.collection(urlx).findOneAndUpdate(myquery,newquery,{returnOriginal:false},function(err,docs){
          res.send(docs.value);
        });
      }
    }
}
}
