 const jwt = require('jsonwebtoken')
 require('dotenv').config()

 const oneDay = 1000 * 60 * 60 * 24;
 class Aut_jwt {
     static create_token(user) {
         return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "18s" })
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