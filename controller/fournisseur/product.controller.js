 var D = require('../../models/data')
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
                console.log({ status: false, message: "Certains champs sont vide", data: _list_error });
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
             await D.set('produit', _data)

             return res.send({ status: true })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }


     static async getList(req, res) {
         var fourn = req.params
         try {
             var reponse_ = await D.exec_params(`
                 select distinct categorie.* from produit left join categorie on produit.cat_id=categorie.cat_id where produit.fourn_id=? `, [fourn.fourn_id])
             req.io.emit('all_cat', { reponse_: reponse_, count: reponse_.length > 0 ? reponse_.length : null })
             var reponse = !req.body.cat_id ? await D.exec_params(`select * from produit where fourn_id=? order by prod_date_enreg desc`, [fourn.fourn_id]) : await D.exec_params(`select * from produit where fourn_id=? and cat_id=?  order by prod_date_enreg desc`, [fourn.fourn_id, req.body.cat_id])
             for (let i = 0; i < reponse.length; i++) {
                 const element = reponse[i];
                 var img_ = await D.exec_params(`select * from images where ?`, [{ prod_id: element.prod_id }])
                 reponse[i].images = img_
             }
             var nb_total = await D.exec_params(`select count(*) as nb from produit where fourn_id= ?`, [fourn.fourn_id])
             for (const iterator of reponse) {
                 iterator['prod_date_enreg'] = moment(iterator['prod_date_enreg']).fromNow();
             }
             req.io.emit('all_product', {reponse,nb_total})
             return res.send({reponse,nb_total})
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }
     static async getProdList(req, res) { 
         var fourn = req.params
         try {
             var reponse_ = await D.exec_params(`
                 select distinct categorie.* from produit left join categorie on produit.cat_id=categorie.cat_id  `)
             req.io.emit('all_cat', { reponse_: reponse_, count: reponse_.length > 0 ? reponse_.length : null })

             var reponse = !req.body.cat_id ? await D.exec_params(`SELECT *
             FROM produit
             INNER JOIN fournisseur ON fournisseur.fourn_id = produit.fourn_id
             ORDER BY (SELECT RAND()) , fournisseur.fourn_id
             ` ) : await D.exec_params(`select * from produit where  cat_id=?  order by prod_date_enreg desc`)
             for (let i = 0; i < reponse.length; i++) {
                 const element = reponse[i];
                 var img_ = await D.exec_params(`select * from images where ?`, [{ prod_id: element.prod_id }])
                 reponse[i].images = img_
             }
             var nb_total = await D.exec_params(`select count(*) as nb from produit `)
             for (const iterator of reponse) {
                 iterator['prod_date_enreg'] = moment(iterator['prod_date_enreg']).fromNow();
             }
             req.io.emit('all_product', { status: true, reponse, nb_total: nb_total[0].nb })
             return res.send({ status: true, reponse, nb_total: nb_total[0].nb })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }

     static async update(req, res) {
         var prod_model = req.body
         try {
             await D.updateWhere('produit', prod_model, { prod_id: req.params.prod_id })
             req.io.emit('update_produit', { status: true, message: 'Mise à jour fait', data: prod_model })

             return res.send()
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }
     static async delete(req, res) {
         var array = req.body.images
         var prod_model = req.params
         try {
             for (let i = 0; i < array.length; i++) {
                 const element = array[i].img_id;
                 await D.exec_params(`delete from images where ? `, [{ img_id: element }])
             }
             await D.exec_params(`delete from produit where ? `, [prod_model])

             //  var reponse = await D.exec_params(`select * from produit where fourn_id=? order by prod_date_enreg desc`, [req.user.fourn_id])
             //  var nb_total = await D.exec_params(`select count(*) as nb from produit where fourn_id= ?`, [req.user.fourn_id])
             //  req.io.emit('all_product', { status: true, reponse, nb_total: nb_total[0].nb })
             req.io.emit('delete_produit', { status: true, message: 'Suppression success', data: prod_model })

             return res.send()
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }
 }
 module.exports = produit;