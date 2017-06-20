var checkResult = function(req, res, docs){
  if(docs == '' || docs == null){
    return false;}
}

var checkNum = function(req, res){
  if(isNaN(parseInt(req.params.id)) == true){
    return false;}
}

var checkInput = function(req, res, json){
  if( typeof json.Description !== 'string'||
      typeof json.Completed !== 'boolean'||
      typeof json.Duration !== 'string'){return false;}
}

module.exports.checkResult = checkResult;
module.exports.checkNum = checkNum;
module.exports.checkInput = checkInput;
