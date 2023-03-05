 const Aut_jwt = require('../models/app_auth');
 var D = require('../models/data')
 var moment = require('moment')
 moment.locale('fr')

 var produit_data = {
     prod_id: { front_name: "prod_id", fac: false, },
     fourn_id: { front_name: "fourn_id", fac: false, },
     cat_id: { front_name: "cat_id", fac: false, },
     sous_cat_id: { front_name: "sous_cat_id", fac: false, },
     prod_label: { front_name: "prod_label", fac: false },
     prod_description: { front_name: "prod_description", fac: false, },
     prod_prix: { front_name: "prod_prix", fac: false, },
     prod_disp: { front_name: "prod_disp", fac: false, },
 };

 class produit {
     static async save_prod(req, res) {
         var _d = req.body;

         //Vérification du produit
         const _pd_keys = Object.keys(produit_data)
         var _tmp = {}
         var _list_error = []
         try {

             _pd_keys.forEach((v) => {
                 _tmp = produit_data[v]

                 if (!_tmp.fac && !_d[_tmp.front_name]) {
                     _list_error.push({ code: _tmp.front_name })
                 }
             })

             if (_list_error.length > 0) {
                 return res.send({ status: false, message: "Certains champs sont vide", data: _list_error })
             }

             //Si la vérification c'est bien passé, 
             // on passe à l'insertion du utilisateur
             var _data = {}
             _pd_keys.forEach((v, i) => {
                 _tmp = produit_data[v]


                 if (_tmp.format != undefined) {
                     _d[_tmp.front_name] = _tmp.format(_d[_tmp.front_name])
                 }

                 _data[v] = _d[_tmp.front_name]
             })

             //Hashage de mot de passe
             // _data['util_pass'] = await utils.hash(_data['util_pass'])

             //l'objet utilisateur est rempli maintenant
             // on l'insert dans la base de donnée

             await D.set('produit', _data)
             console.log('enregister');
             return res.send({ status: true, message: 'Enregistrer' })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }


     static async getList(req, res) {

         var fourn = req.params
         try {
             var reponse = !req.body.cat_id ? await D.exec_params(`select * from produit where fourn_id=? order by prod_date_enreg desc`, [fourn.fourn_id]) : await D.exec_params(`select * from produit where fourn_id=? and cat_id=?  order by prod_date_enreg desc`, [fourn.fourn_id, req.body.cat_id])
             for (let i = 0; i < reponse.length; i++) {
                 const element = reponse[i];
                 var img_ = await D.exec_params(`select * from images where ? `, [{ prod_id: element.prod_id }])
                 reponse[i].images = img_
             }
             var nb_total_produit = (await D.exec('select count(*) as nb from produit'))[0].nb
             for (const iterator of reponse) {
                 iterator['prod_date_enreg'] = moment(iterator['prod_date_enreg']).fromNow();
             }

             req.io.emit('all_product', { status: true, reponse, nb_total_produit })
             res.send()
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }
     static async get_my_category(req, res) {
         var fourn = req.params
         try {
             var reponse = await D.exec_params(`
             select distinct categorie.* from produit left join categorie on produit.cat_id=categorie.cat_id where produit.fourn_id=? `, [fourn.fourn_id])

             req.io.emit('all_cat', { reponse })
             res.send()
         } catch (error) {

             return res.send({ status: true, error, message: 'erreur de la base de donnée' })
         }
     }

     static async update(req, res) {
         var _data_body = req.body;
         var four_model = produit_data;
         var data_temp = {}
         var _list_error = []
             //  variable four_ = produit dans le cookie
         var fourn_ = null
         var array = req.headers.cookie.split(';');
         for (var i = 0; i < array.length; i++) {
             const element = array[i];
             if (element.split('=')[0] == 'access_token' || element.split('=')[0] == ' access_token') {
                 fourn_ = Aut_jwt.decode_token(element.split('=')[1]).payload;
             }
         }
         for (const key in _data_body) {
             data_temp[key] = four_model[key]
             if (!data_temp.fac && _data_body[key] == "") {
                 _list_error.push({ code: data_temp[key].front_name })
             }
         }
         if (_list_error.length > 0) {
             return res.send({ status: false, message: "Certains champs sont vide", data: _list_error })
         }
         for (const key in four_model) {
             four_model[key] = fourn_[key]
         }
         for (const key in _data_body) {
             four_model[key] = _data_body[key]
         }
         try {
             await D.updateWhere('produit', four_model, { fourn_id: fourn_.fourn_id })
             var token = Aut_jwt.create_token(four_model)
             req.io.emit('check_', Aut_jwt.decode_token(token).payload)
             return res.cookie('access_token', token)
                 .send({ status: true, message: 'Mise à jour Scuccess', data: four_model })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }
 }
 module.exports = produit;