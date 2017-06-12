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
var stream = taskDB.createReadStream()

//list
app.get('/typeOftask/', function (req, res) {
    stream.on('data', function (all) {
      taskList.push(all)
    })
    stream.on('close', function () {
      res.json(taskList)
   })
})

//get
app.get('/typeOftask/:type', function (req, res) {
    stream.on('data', function (all) {
    })
    stream.on('close', function () {
      taskDB.get(req.params.type,function(err,ans){
        res.send(ans)
      })
    })
})

//post
app.post('/typeOftask/', function (req, res) {
    var json = req.body
    taskDB.put(json.typeOf, { id: json.id, description: json.description, completed: json.completed, duration: json.duration }, function (err) {
      res.send('Add new ' + json.typeOf + json.id + ' Completed!')
    })
})

//update
app.post('/typeOftask/:type', function (req, res) {
  taskDB.get(req.params.type,function(err,ans){
    var json = req.body
    taskDB.put(json.typeOf, { id: json.id, description: json.description, completed: json.completed, duration: json.duration }, function (err) {
      res.send('Add new ' + json.typeOf + json.id + ' Completed!')
    })
  })
})

//delete
app.delete('/typeOftask/:typeOf', function (req, res) {
    var json = req.body
    taskDB.del(req.params.typeOf, function(err){
      res.send('Delete ' + req.params.typeOf + ' Completed!');
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
