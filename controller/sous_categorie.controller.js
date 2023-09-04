const Aut_jwt = require('../models/app_auth');
var D = require('../models/data')

 

class sous_categorie { 
    static async get_this_prod(req, res) { 
        try {
            var reponse = await D.exec_params(`select * from  categorie `)  
            res.send({ status: true, data: reponse })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async set_client_tendance(req, res) { 
        try { 
            for (let i = 0; i < req.body.length; i++) {
                const element = req.body[i];
                await D.set('tendance', {client_id:req.params.client_id,cat_id:element})
            }
            res.send({ status: true, message:'Tendance ajouter avec succés' })
        } catch (e) { 
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async get_all_prod(req, res) {
        var filters = req.query
        var _obj_pat = {
            sous_cat_id: 'sous_cat_id',
        }
        var default_sort_by = 'sous_cat_id'
        filters.page = (!filters.page) ? 1 : parseInt(filters.page)
        filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]
        try {
            var reponse = await D.exec_params(`select * from sous_categorie   order by ${filters.sort_by} limit ? offset ? `, [
                filters.limit,
                (filters.page - 1) * filters.limit
            ])
            req.io.emit('sous_categorie', { reponse })
            //  return res.send({ status: true, reponse, nb_total_sous_categorie })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }
}
module.exports = sous_categorie;