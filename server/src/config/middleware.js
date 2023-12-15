const jwt = require('jsonwebtoken');
 const config = require('./config');
 const User = require('../user/user.model')
 
 
 const authMiddleware = (token) => {
    return async function (req, res, next) {
        try{
            if(!token) {
                token = req.headers['authorization'];
                if(!token) {
                    return res.status(400).json(err);
                }
            }
            if(token) {
                let decoded = await jwt.verify(token,config.secret);

                if(decoded.params.id) {
                    let user = await User.findOne({_id: decoded.params.id});
                    
                    if(user.admin) {
                        return next();
                    }else {
                        return res.status(400).json({ message: "User doesn't have a valid permission!"})
                    }
                }else {
                    return res.status(400).json({ message: 'Token is not valid!'})
                }
            }else {
                return res.status(400).json({ message: 'Token is not valid!'})
            }
            
        }catch(err) {
            return res.status(400).json(err);
        }
    }

}

module.exports = authMiddleware;