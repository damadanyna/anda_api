let router = require('express').Router();
const multer = require('multer');
const storage2 = multer.diskStorage({})
const upload2 = multer({ storage: storage2 })

// pour la gestion d'authentification
let auth = require('./../midleware/auth')

//Message de Vérification
// router.get('/',auth,(req,resp)=>{
//     return resp.send({message:'io',status:true})
// });

// FOURNISSEUR
router.post('/register', require('../controller/fournisseur/fournisseur.controller').register)
router.post('/login', require('../controller/fournisseur/fournisseur.controller').login)
router.post('/logout', require('../controller/fournisseur/fournisseur.controller').logout)
router.get('/check', auth, require('../controller/fournisseur/fournisseur.controller').check_if_logged)
router.get('/fournisseur', auth, require('../controller/fournisseur/fournisseur.controller').getList);
router.put('/fournisseur', auth, require('../controller/fournisseur/fournisseur.controller').update);
router.post('/img', auth, upload2.single('usr-img'), require('../controller/fournisseur/fournisseur.controller').uploaImg);
router.post('/imgBg', auth, upload2.single('usr-img'), require('../controller/fournisseur/fournisseur.controller').uploaImgBg);

// PROUDUIT
router.get('/categorie', auth, require('../controller/fournisseur/categorie.controller').get_all_prod);
router.get('/categorie/:cat_id', auth, require('../controller/fournisseur/categorie.controller').get_this_prod);
router.get('/sous_categorie/:sous_cat_id', auth, require('../controller/fournisseur/sous_categorie.controller').get_this_prod);
router.get('/sous_categorie', auth, require('../controller/fournisseur/sous_categorie.controller').get_all_prod);
router.get('/produit/:fourn_id', auth, require('../controller/fournisseur/product.controller').getList);
router.post('/produit/:fourn_id', auth, require('../controller/fournisseur/product.controller').getList);

router.post('/prod_img/:fourn_id', auth, upload2.single('usr-img'), require('../controller/fournisseur/img_prod.controller').uploaImg);
router.put('/prod_img/:img_id', auth, upload2.single('usr-img'), require('../controller/fournisseur/img_prod.controller').update_it);
router.post('/produit', auth, require('../controller/fournisseur/product.controller').save_prod);
router.put('/produit/:prod_id', auth, require('../controller/fournisseur/product.controller').update);
router.delete('/produit/:prod_id', auth, require('../controller/fournisseur/product.controller').delete);
// router.get('/my_category/:fourn_id', auth, require('../controller/product.controller').get_my_category);

// CLIENT
router.get('/fournList', require('../controller/fournisseur/fournisseur.controller').getList);
router.get('/prodList', require('../controller/fournisseur/product.controller').getProdList);
router.get('/insertAuto', require('../controller/fournisseur/fournisseur.controller').setAutoImg);



module.exports = router