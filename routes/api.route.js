let router = require('express').Router();

//Message de Vérification
router.get('/', (req, res) => {
    res.send({ message: "API 1.0 Fonctionnel" })
});

router.post('/login', require('../controller/auth.controller').login)
router.get('/logout', require('../controller/auth.controller').logout)

// check fournisseur state
router.get('/state', require('../controller/auth.controller').getState_);


//Gestion des fournisseur 
router.post('/fournisseur', require('../controller/fournisseur.controller').register);
router.get('/fournisseur', require('../controller/fournisseur.controller').getList);

// router.get('/users', require('../controller/utilisateur.controller').getList);
// router.post('/dec_user', require('../controller/utilisateur.controller').setAccess);
// router.post('/log_user', require('../controller/utilisateur.controller').setLogin);


// //Gestion des utilisateur
// router.post('/emp', require('../controller/employe.controller').register);
// router.post('/up_emp', require('../controller/employe.controller').update);
// router.delete('/emp/:emp_im', require('../controller/employe.controller').delete);
// router.get('/emp', require('../controller/employe.controller').getList);
// router.get('/emp_', require('../controller/employe.controller').getListDisp);
// router.get('/user/:id', require('../controller/employe.controller').getDetailsUser);
// router.put('/user', require('../controller/employe.controller').update);
// router.post('/emps', require('../controller/employe.controller').findList);


// //Gestion des Presence
// router.post('/presence', require('../controller/presence.controller').register);
// router.delete('/emp/:id_pres', require('../controller/presence.controller').delete);
// router.get('/presence', require('../controller/presence.controller').getList);
// router.get('/presence_days', require('../controller/presence.controller').getDays);
// router.put('/presence', require('../controller/presence.controller').update);

// router.post('/presencee', require('../controller/presence.controller').findList);


// //Gestion des conge
// router.post('/conge', require('../controller/conge.controller').register);
// router.delete('/conge/:id_pres', require('../controller/conge.controller').delete);
// router.put('/conge', require('../controller/conge.controller').update);

// router.post('/congee', require('../controller/conge.controller').findList);
// router.get('/congeList', require('../controller/conge.controller').find_all_conge);
// router.post('/congeUp', require('../controller/conge.controller').update);

// //Gestion des abscence
// router.post('/abs', require('../controller/abscence.controller').findList);

// //Gestion des dashboard
// router.post('/dashboard', require('../controller/dashboard.controller').getList);



//------
module.exports = router