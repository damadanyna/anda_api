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
router.post('/prod_img/:fourn_id', auth, upload2.single('usr-img'), require('../controller/img_prod.controller').uploaImg);
router.post('/produit', auth, require('../controller/product.controller').save_prod);
router.get('/produit', auth, require('../controller/product.controller').getList);
router.post('/my_category/:fourn_id', auth, require('../controller/product.controller').get_my_category);


module.exports = router