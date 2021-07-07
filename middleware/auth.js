const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){      
    //Get token from request header
    const token = req.header('auth-token');

    if(!token){
        return res.status(401).json({msg:'Token not found, authorization failed'});
    }

    try {
        //verify token & extract payload
        const decoded = jwt.verify(token,config.get('jwtSecret'));  
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is invalid'});
    }
}