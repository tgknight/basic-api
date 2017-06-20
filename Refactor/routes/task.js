var todoProvider = require('../todoprovider');

module.exports = {
  list: function(req, res, next){
    todoProvider.listDocuments(req, res, 'task');
  },

  get:  function(req, res, next){
    todoProvider.getDocuments(req, res, 'task');
  },

  post: function(req, res, next){
    todoProvider.insertDocuments(req, res, 'task');
  },

  delete: function(req, res, next){
    todoProvider.deleteDocuments(req, res, 'task');
  },

  patch:  function(req, res, next){
    todoProvider.updateDocuments(req, res, 'task');
  }
};
