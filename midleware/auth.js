const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = async(req, res, next) => {
    const token = req.cookies.access_token
        // console.log(req);
    if (!token) {
        return res.send({ message: "Accune compte n'est trouver", status: 401 })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.send({ message: 'Connexion expirer', status: 401 })
        }
        req.user = user
        return next()
    })
};

module.exports = verifyToken