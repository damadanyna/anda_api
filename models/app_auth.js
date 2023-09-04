 const jwt = require('jsonwebtoken')
 require('dotenv').config()
 
 class Aut_jwt {
     static create_token(user) {
         return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
     }
     static decode_token(token) {
         const decoded = jwt.decode(token, { complete: true })
         if (!decoded) {
             return "Pas de Token"
         }
         return decoded;
     }
 }

 module.exports = Aut_jwt