 const Aut_jwt = require('../models/app_auth');
 var D = require('../models/data')

 var categorie_data = {
     cat_id: { front_name: "cat_id:", fac: true, },
     cat_label: { front_name: "cat_label", fac: false, },
     cat_date_enreg: { front_name: "cat_date_enreg", fac: true },
 };

 class categorie {
     static async register(req, res) {
         var _d = req.body;
         const _pd_keys = Object.keys(categorie_data)
         var _tmp = {}
         var _list_error = []
         try {
             _pd_keys.forEach((v) => {
                 _tmp = categorie_data[v]
                 if (!_tmp.fac && !_d[_tmp.front_name]) {
                     _list_error.push({ code: _tmp.front_name })
                 }
             })
             if (_list_error.length > 0) {
                 return res.send({ status: false, message: "Certains champs sont vide", data: _list_error })
             }
             var _data = {}
             _pd_keys.forEach((v, i) => {
                 _tmp = categorie_data[v]
                 if (_tmp.format != undefined) {
                     _d[_tmp.front_name] = _tmp.format(_d[_tmp.front_name])
                 }
                 _data[v] = _d[_tmp.front_name]
             })
             await D.set('categorie', _data)
             try {
                 const token = Aut_jwt.create_token(_data)
                 return res.cookie('access_token', token, { sameSite: 'none', secure: true }).send({ status: true, message: 'Inscription Scuccess', data: _data })
             } catch (error) {
                 console.log('erreur', error);
             }
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }

     static async get_this_prod(req, res) {
         var filters = req.params
         try {
             var reponse = await D.exec_params(`select sous_categorie.sous_cat_id,sous_categorie.sous_cat_label from 
            sous_categorie left join categorie on categorie.cat_id=sous_categorie.cat_id
            where categorie.cat_id=${filters.cat_id}`)
             console.log(reponse);
             req.io.emit('sous_categorie', { reponse })
             res.send()
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
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
 }
 module.exports = categorie;