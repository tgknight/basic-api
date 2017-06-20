
var task = require('./routes/task');
var work = require('./routes/work');

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

exports.data = data;
