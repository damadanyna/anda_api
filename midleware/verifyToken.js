const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    req.isAuthenticated = false; // Indiquer que l'utilisateur n'est pas connecté
    return next();
  }


  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedToken) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        req.isAuthenticated = false;
        return res.send({ message: 'La connexion est expirée', status: 403 });
      } else {
        // Gérer d'autres erreurs possibles (par exemple, une signature invalide)
        req.isAuthenticated = false;
        return res.send({ message: 'Erreur lors de la vérification du jeton', status: 401 });
      }
    }
  
    // Vérification de la date d'expiration du jeton
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimestamp) {
      req.isAuthenticated = false;
      return res.send({ message: 'La connexion est expirée', status: 403 });
    }
  
    // Le jeton est valide et non expiré
    req.user = decodedToken;
    req.isAuthenticated = true;
    return next();
  });

  
  


    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    //   if (error) {
    //     req.isAuthenticated = false; // Indiquer que l'utilisateur n'est pas connecté
    //     return res.send({ message: 'La connexion est expirée', status: 403 });
    //   }

    //   req.user = user;
    //   req.isAuthenticated = true; // Indiquer que l'utilisateur est connecté
    //   return next();
    // });
};

module.exports = verifyToken;
