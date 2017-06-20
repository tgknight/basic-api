var express = require('express');
var MiddleWare = require('./middleware');
var bodyParser = require('body-parser');
var task = require('./routes/task');
var work = require('./routes/work');
var Router = express.Router();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true}));

const data = {
  //task
  taskGet: {
    path: '/task/:id',
    method: task.get,
    action: 'get'
  },
  taskList: {
    path: '/task',
    method: task.list,
    action: 'get'
  },
  taskInsert: {
    path: '/task',
    method: task.post,
    action: 'post'
  },
  taskDelete: {
    path: '/task/:id',
    method: task.delete,
    action: 'delete'
  },
  taskUpdate: {
    path: '/task/:id',
    method: task.patch,
    action: 'patch'
  },
  //work
  workGet: {
    path: '/work/:id',
    method: work.get,
    action: 'get'
  },
  workList: {
    path: '/work',
    method: work.list,
    action: 'get'
  },
  workInsert: {
    path: '/work',
    method: work.post,
    action: 'post'
  },
  workDelete: {
    path: '/work/:id',
    method: work.delete,
    action: 'delete'
  },
  workUpdate: {
    path: '/work/:id',
    method: work.patch,
    action: 'patch'
  }
}

for (let func in data) {
  Router[data[func].action](data[func].path, data[func].method)
}


app.use('/', Router)
app.listen(8082);
