var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var level = require('level')

var taskDB = level('./typeOftaskDB',{valueEncoding: 'json'})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var taskList = []


//list
app.get('/typeOftask', function (req, res) {
  var stream = taskDB.createReadStream()
    stream.on('data', function (all) {
      taskList.push(all)
    })
    stream.on('close', function () {
      res.json(taskList)
   })
})

//get
app.get('/typeOftask/:type', function (req, res) {
  var stream = taskDB.createReadStream()
    stream.on('data', function (all) {
    })
    stream.on('close', function () {
      taskDB.get(req.params.type,function(err,ans){
        res.send(ans)
      })
    })
})

//post
app.post('/typeOftask', function (req, res) {
    var json = req.body
    taskDB.put(json.typeOf,
      { id: json.id,
        description: json.description,
        completed: json.completed,
        duration: json.duration },
      function (err) {
      taskDB.get(json.typeOf,function(err,ans){res.send(ans)})
    })
})

//update
app.post('/typeOftask/:type', function (req, res) {
  taskDB.get(req.params.type,function(err,ans){
    var json = req.body
    taskDB.put(json.typeOf,
      { id: json.id,
        description: json.description,
        completed: json.completed,
        duration: json.duration },
      function (err) {
        taskDB.get(req.params.type,function(err,ans){res.send(ans)})
    })
  })
})

//delete
app.delete('/typeOftask/:typeOf', function (req, res) {
    var json = req.body
    taskDB.del(req.params.typeOf, function(err){
      taskDB.get(req.params.type,function(err,ans){res.send(ans)})
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
