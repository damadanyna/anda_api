let router = require('express').Router();
const path = require('path')
const uploadPath = path.join(__dirname, '../../', 'img')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, uploadPath);
    }),
    filename: ((req, file, cb) => {
        cb(null, file.originalname)
    })
})
const storage2 = multer.diskStorage({})
const upload = multer({ storage: storage })
const upload2 = multer({ storage: storage2 })

// pour la gestion d'authentification
let auth = require('./../midleware/auth')

//Message de Vérification
router.get('/', (req, res) => {
    res.send({ message: "API 1.0 Fonctionnel" })
});

// FOURNISSEUR
router.post('/register', require('../controller/fournisseur.controller').register)
router.post('/login', require('../controller/fournisseur.controller').login)
router.post('/logout', require('../controller/fournisseur.controller').logout)
router.get('/check', auth, require('../controller/fournisseur.controller').check_if_logged)
router.get('/fournisseur', auth, require('../controller/fournisseur.controller').getList);
router.put('/fournisseur', auth, require('../controller/fournisseur.controller').update);
router.post('/img', auth, upload2.single('usr-img'), require('../controller/fournisseur.controller').uploaImg);
router.post('/imgBg', auth, upload2.single('usr-img'), require('../controller/fournisseur.controller').uploaImgBg);

// PROUDUIT
router.get('/categorie', auth, require('../controller/categorie.controller').get_all_prod);
router.get('/categorie/:cat_id', auth, require('../controller/categorie.controller').get_this_prod);
router.get('/sous_categorie/:sous_cat_id', auth, require('../controller/sous_categorie.controller').get_this_prod);
router.get('/sous_categorie', auth, require('../controller/sous_categorie.controller').get_all_prod);
router.post('/produit', auth, require('../controller/product.controller').save_prod);
router.post('/prod_img/:fourn_id', auth, upload2.single('usr-img'), require('../controller/img_prod.controller').uploaImg);


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