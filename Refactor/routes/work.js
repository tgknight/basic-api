var todoProvider = require('../todoprovider');

module.exports = {
  list: function(req, res, next){
    todoProvider.listDocuments(req, res, 'work');
  },

  get:  function(req, res, next){
    todoProvider.getDocuments(req, res, 'work');
  },

  post: function(req, res, next){
    todoProvider.insertDocuments(req, res, 'work');
  },

  delete: function(req, res, next){
    todoProvider.deleteDocuments(req, res, 'work');
  },

  patch:  function(req, res, next){
    todoProvider.updateDocuments(req, res, 'work');
  }
};
