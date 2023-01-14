let D = require('../models/data')

class Dashboard {

    //Récupération des détails des employes
    static async getDetailsUser(req, res) {
        try {

            let { id } = req.params

            //Récupération d'un simple employe
            let user = (await D.exec_params('select * from employe where emp_im = ?', id))[0]

            //Récupération accès modules
            let user_access = await D.exec_params(`select * from module
            left join util_access on module_id = ua_module_id 
            left join employe on emp_im = ?`, id)



            //à venir : récupération des historiques de l'employe
            let module_list = await D.exec('select * from module')


            // console.log(user);

            return res.send({ status: true, user, user_access, module_list })

        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async setAccess(req, res) {

        try {
            let email = req.body.util_email
            let pass = req.body.util_pass

            let _f = await D.exec_params(`select * from employe where util_email = ? and util_pass = ?`, [email, pass])

            if (_f.length > 0) {
                await D.exec_params(`update employe set util_status='0' where util_email = ? and util_pass = ?`, [email, pass])
            }
            return res.send({ status: true, message: 'Deconnection fait' })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async getList(req, res) {

        let filters = req.query
        let _obj_pat = {
            emp_im: 'emp_im',
            util_label: 'emp_nom_prenom',
        }
        let default_sort_by = 'emp_im'

        filters.page = (!filters.page) ? 1 : parseInt(filters.page)
        filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]

        try {
            //A reserver recherche par nom_prenom
            let reponse = await D.exec_params(`select * from employe   order by ${filters.sort_by} limit ? offset ? `, [
                filters.limit,
                (filters.page - 1) * filters.limit
            ])

            //Liste total des employe
            let nb_total_employe = (await D.exec('select count(*) as nb from employe'))[0].nb

            return res.send({ status: true, reponse, nb_total_employe })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }


}

module.exports = Dashboard