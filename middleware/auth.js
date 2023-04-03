const jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{

    try {
        console.log('token',  token)
        var token =req.header('Authorization');
        var checkToken = token.split(" ")[1];
        var decode = jwt.verify(checkToken, 'secret');
        req.userData = decode;
        next();
        
    } catch (error) {
        res.status(401).json({
            error:"Unauthorized"
        })
    }
  }
  