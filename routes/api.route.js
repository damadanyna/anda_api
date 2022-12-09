let router = require('express').Router();

let D = require('../models/data');


//Pour la gestion d'authentification 
let auth = require('./../middleware/auth');
router.use(auth);

//les requires utils


//Message de Vérification
router.get('/',(req,res)=>{
    res.send({message:"API 1.0 Fonctionnel"})
});

//Gestion des utilisateur
router.post('/users',require('../controller/utilisateur.controller').register);
router.delete('/user',require('../controller/utilisateur.controller').delete);
router.get('/users',require('../controller/utilisateur.controller').getList);
router.put('/user/access/:util_id',require('../controller/utilisateur.controller').setAccess);
router.get('/user/:id',require('../controller/utilisateur.controller').getDetailsUser);
router.put('/user',require('../controller/utilisateur.controller').update);



//------
module.exports = router