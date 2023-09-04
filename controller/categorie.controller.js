 const Aut_jwt = require('../models/app_auth');
 var D = require('../models/data')

 
 class categorie { 
     static async get_this_prod(req, res) {
         var client_id = req.params.client_id
         try {
             var reponse = await D.exec_params(`select * from tendance where  ? `,[{client_id}]);
            //  req.io.emit('sous_categorie', { reponse });
             res.send(reponse);
         } catch (e) { 
            console.log(e);
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         } 
        return {}
     }


     static async get_all_prod(req, res) {
         var filters = req.query
         var _obj_pat = {
             cat_id: 'cat_id',
         }
         var default_sort_by = 'cat_id'
         filters.page = (!filters.page) ? 1 : parseInt(filters.page)
         filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
         filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]
         try {
             var reponse = await D.exec_params(`select * from categorie   order by ${filters.sort_by} limit ? offset ? `, [
                 filters.limit,
                 (filters.page - 1) * filters.limit
             ])
             req.io.emit('categorie', { reponse })

             return res.send()
                 //  return res.send({ status: true, reponse, nb_total_categorie })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }

     static async get_all_cat_from(req, res) {
         var filters = req.params
         var _obj_pat = {
             cat_id: 'cat_id',
         }
 
         var default_sort_by = 'cat_id'
         filters.page = (!filters.page) ? 1 : parseInt(filters.page)
         filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
         filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]
          
         try {
             var reponse = await D.exec_params(`SELECT produit.sous_cat_id,sous_categorie.sous_cat_label  FROM
             produit INNER JOIN fournisseur INNER JOIN sous_categorie  on 
             produit.fourn_id=fournisseur.fourn_id and sous_categorie.sous_cat_id=produit.sous_cat_id and fournisseur.fourn_id=? 
             GROUP BY produit.sous_cat_id LIMIT ?
                `, [ filters.fourn_id,   filters.limit, 
             ])
            //  req.io.emit('sous_categorie', { reponse })
            //  console.log(reponse);
             return res.send(reponse)
                 //  return res.send({ status: true, reponse, nb_total_categorie })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }
 }
 module.exports = categorie;