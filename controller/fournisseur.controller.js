 let D = require('../models/data')
 class Fournisseur {
     static async register(req, res) {
         let _d = req.body;
         let fournisseur_data = {
             ville_id: { front_name: "ville", fac: false, },
             localisation_: { front_name: "localisation", fac: false },
             fourn_name: { front_name: "name", fac: false, },
             fourn_email: { front_name: "email", fac: false, },
             fourn_nif: { front_name: "nif", fac: false, },
             fourn_stat: { front_name: "satate", fac: false, },
             fourn_tel: { front_name: "telephone", fac: false, },
             fourn_pass: { front_name: "Mots de passe", fac: false, },
             fourn_status: { front_name: "status", fac: false, },
             fourn_img_log_middle: { front_name: "imdle image", fac: true, },
             fourn_img_bg: { front_name: "im_bg", fac: true, },
             fourn_img_log_big: { front_name: "img_big_ico", fac: true },
             fourn_date_enreg: { front_name: 'fourn_date_enre', fac: true, format: (a) => new Date() },
         };

         //Vérification du fournisseur
         const _pd_keys = Object.keys(fournisseur_data)
         let _tmp = {}
         let _list_error = []
         try {
             _pd_keys.forEach((v, i) => {
                 _tmp = fournisseur_data[v]
                 if (!_tmp.fac && !_d[_tmp.front_name]) {
                     _list_error.push({ code: _tmp.front_name })
                 }
             })
             if (_list_error.length > 0) {
                 return res.send({ status: false, message: "Certains champs sont vide", data: _list_error })
             }

             let _data = {}
             _pd_keys.forEach((v, i) => {
                 _tmp = fournisseur_data[v]
                 if (_tmp.format != undefined) {
                     _d[_tmp.front_name] = _tmp.format(_d[_tmp.front_name])
                 }
                 _data[v] = _d[_tmp.front_name]
             })
             await D.set('fournisseur', _data)
                 //Ici tous les fonctions sur l'enregistrement d'un fournisseur
             return res.send({ status: true, message: "user bien enregistrer." })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }

     static async conexion(req, res) {
         try {
             let email = req.body.util_email
             let pass = req.body.util_pass

             let _f = await D.exec_params(`select * from fournisseur where util_email = ? and util_pass = ?`, [email, pass])

             if (_f.length > 0) {
                 await D.exec_params(`update fournisseur set util_status='0' where util_email = ? and util_pass = ?`, [email, pass])
             }
             return res.send({ status: true, message: 'Deconnection fait' })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }

     static async setLogin(req, res) {
         try {
             let email = req.body.util_email
             let pass = req.body.util_pass

             let _f = await D.exec_params(`select * from fournisseur where util_email = ? and util_pass = ?`, [email, pass])

             if (_f.length > 0) {
                 await D.exec_params(`update fournisseur set util_status='1' where util_email = ? and util_pass = ?`, [email, pass])
                 return res.send({ status: true, message: 'connection fait' })
             } else {
                 return res.send({ status: false, message: "L'fournisseur n'existe pas" })
             }
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }

     static async getList(req, res) {
         let filters = req.query
         let _obj_pat = {
             util_id: 'util_id',
             util_label: 'util_label',
         }
         let default_sort_by = 'util_id'
         filters.page = (!filters.page) ? 1 : parseInt(filters.page)
         filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
         filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]
         try {
             //A reserver recherche par nom_prenom
             let reponse = await D.exec_params(`select * from fournisseur   order by ${filters.sort_by} limit ? offset ? `, [
                 filters.limit,
                 (filters.page - 1) * filters.limit
             ])

             //Liste total des fournisseur
             let nb_total_fournisseur = (await D.exec('select count(*) as nb from fournisseur'))[0].nb

             return res.send({ status: true, reponse, nb_total_fournisseur })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }
 }

 module.exports = Fournisseur;