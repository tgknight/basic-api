module.exports = {
  checkResult: function(req, res, docs){
    if(docs == '' || docs == null){return false;}
  },

  checkNum: function(req, res){
    if(isNaN(parseInt(req.params.id)) == true){return false;}
  },

  checkInput: function(req, res, json){
    if( typeof json.Description !== 'string'||
        typeof json.Completed !== 'boolean'||
        typeof json.Duration !== 'string'){return false;}
  }
}
