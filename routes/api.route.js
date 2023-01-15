let router = require('express').Router();

let D = require('../models/data');


//Pour la gestion d'authentification 
let auth = require('./../middleware/auth');
router.use(auth);

//les requires utils


//Message de Vérification
router.get('/', (req, res) => {
    res.send({ message: "API 1.0 Fonctionnel" })
});

//Gestion des utilisateur
router.post('/users', require('../controller/utilisateur.controller').register);
router.get('/users', require('../controller/utilisateur.controller').getList);
router.post('/dec_user', require('../controller/utilisateur.controller').setAccess);
router.post('/log_user', require('../controller/utilisateur.controller').setLogin);


//Gestion des utilisateur
router.post('/emp', require('../controller/employe.controller').register);
router.delete('/emp/:emp_im', require('../controller/employe.controller').delete);
router.get('/emp', require('../controller/employe.controller').getList);
router.get('/user/:id', require('../controller/employe.controller').getDetailsUser);
router.put('/user', require('../controller/employe.controller').update);
router.post('/emps', require('../controller/employe.controller').findList);


//Gestion des Presence
router.post('/presence', require('../controller/presence.controller').register);
router.delete('/emp/:id_pres', require('../controller/presence.controller').delete);
router.get('/presence', require('../controller/presence.controller').getList);
router.get('/presence_days', require('../controller/presence.controller').getDays);
router.put('/presence', require('../controller/presence.controller').update);

router.post('/presencee', require('../controller/presence.controller').findList);


//Gestion des conge
router.post('/conge', require('../controller/conge.controller').register);
router.delete('/conge/:id_pres', require('../controller/conge.controller').delete);
router.put('/conge', require('../controller/conge.controller').update);

router.post('/congee', require('../controller/conge.controller').findList);


//Gestion des dashboard
router.post('/dashboard', require('../controller/dashboard.controller').getList);



//------
module.exports = router