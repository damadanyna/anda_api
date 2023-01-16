let utils = require('../utils/utils')
let D = require('../models/data')

class Abscence {


    static async findList(req, res) {

        // let find_val =req.body.find
        let filters = req.query
        let _obj_pat = {
            id_pres: 'id_pres',
            util_label: 'emp_nom_prenom',
        }
        let default_sort_by = 'id_pres'
        console.log(req.body);

        filters.page = (!filters.page) ? 1 : parseInt(filters.page)
        filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]

        try {
            let reponse = await D.exec_params(`select presence.*, employe.* 
             from  
             presence left join employe on employe.emp_im=presence.im_emp where 
             employe.emp_nom_prenom like ?  and  presence.pres_date_enreg=? and presence.statut_pres=? order by ${filters.sort_by} limit ? offset ? `, [
                    '%' + req.body.find + '%',
                    req.body.date_,
                    req.body.day_type,
                    filters.limit,
                    (filters.page - 1) * filters.limit
                ])
                //Liste total des presence
            let nb_total_presence = (await D.exec('select count(*) as nb from presence'))[0].nb

            return res.send({ status: true, reponse, nb_total_presence })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

}

module.exports = Abscence