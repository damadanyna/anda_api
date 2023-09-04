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

// router.post('/logout', require('../controller/fournisseur/fournisseur.controller').logout)
// router.get('/fournisseur', auth, require('../controller/fournisseur/fournisseur.controller').getList);
// router.put('/fournisseur', auth, require('../controller/fournisseur/fournisseur.controller').update);
// router.post('/img', auth, upload2.single('usr-img'), require('../controller/fournisseur/fournisseur.controller').uploaImg);
// router.post('/imgBg', auth, upload2.single('usr-img'), require('../controller/fournisseur/fournisseur.controller').uploaImgBg);

// // PROUDUIT
// router.get('/categorie', auth, require('../controller/fournisseur/categorie.controller').get_all_prod);
// router.get('/categorie/:cat_id', auth, require('../controller/fournisseur/categorie.controller').get_this_prod);
// router.get('/sous_categorie/:sous_cat_id', auth, require('../controller/fournisseur/sous_categorie.controller').get_this_prod);
// router.get('/sous_categorie', auth, require('../controller/fournisseur/sous_categorie.controller').get_all_prod);
// router.get('/produit/:fourn_id', auth, require('../controller/fournisseur/product.controller').getList);
// router.post('/produit/:fourn_id', auth, require('../controller/fournisseur/product.controller').getList);

// router.post('/prod_img/:fourn_id', auth, upload2.single('usr-img'), require('../controller/fournisseur/img_prod.controller').uploaImg);
// router.put('/prod_img/:img_id', auth, upload2.single('usr-img'), require('../controller/fournisseur/img_prod.controller').update_it);
// router.post('/produit', auth, require('../controller/fournisseur/product.controller').save_prod);
// router.put('/produit/:prod_id', auth, require('../controller/fournisseur/product.controller').update);
// router.delete('/produit/:prod_id', auth, require('../controller/fournisseur/product.controller').delete);
// router.get('/my_category/:fourn_id', auth, require('../controller/product.controller').get_my_category);

// CLIENT
router.post('/registerClient', require('../controller/client.controller').register);
router.post('/login', require('../controller/client.controller').login);
router.get('/check', auth, require('../controller/client.controller').check_if_logged);

// PRODUIT
router.get('/prodList/:offset',auth, require('../controller/product.controller').getProdList);
router.get('/produit/:fourn_id',auth, require('../controller/product.controller').getFournList);
router.get('/categorie/:client_id',auth, require('../controller/categorie.controller').get_this_prod);
router.get('/cat_sous_cat',auth, require('../controller/sous_categorie.controller').get_this_prod);
router.post('/tendance/:client_id',auth, require('../controller/sous_categorie.controller').set_client_tendance);

// FOURNISSEUR
router.get('/fournList',auth, require('../controller/client.controller').getList);
router.get('/pers_categorie/:fourn_id',auth, require('../controller/categorie.controller').get_all_cat_from);
// router.get('/insertAuto', require('../controller/fournisseur/fournisseur.controller').setAutoImg); 

module.exports = router