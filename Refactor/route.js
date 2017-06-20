module.exports = (function() {

var express = require('express');
var bodyParser = require('body-parser');

var Router = express.Router();

const config = require('./config')
var data = config.data;

for (let func in data) {
  Router[data[func].action](data[func].path, data[func].method)
}

return Router;
})();
