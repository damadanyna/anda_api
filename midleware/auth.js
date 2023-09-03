const jwt = require('jsonwebtoken')
require('dotenv').config()
    // const oneDay = 1000 * 60 * 60 * 24;

const verifyToken = async(req, res, next) => {
    const token = req.cookies.access_token
        // console.log(req);
    if (!token) {
        return next()
    }
    setTimeout(() => {
        
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(error, user) => {
        if (error) {  
            return res.send({ message: 'La connexion est expiré', status: false }) 
        }
        req.user = user  
        return next()
    })
    }, 500);
};

module.exports = verifyToken