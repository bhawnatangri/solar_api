const { to, ReE, ReS } = require('../services/util.service');
var jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
var headerToken=req.headers;
//console.log(headerToken)
  try{

    var token=headerToken.authorization.split(" ")[1];
    console.log(token)
    var decode=jwt.verify(token, 'secret');
    req.userData=decode;
    next();
   }
    catch(err){
    return ReE(res,"Invalid Token")
   }   
    
}