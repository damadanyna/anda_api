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

    static async getList(req, res) {
        try {
            //A reserver recherche par nom_prenom
            let pres_ = await D.exec_params(`select * from presence where pres_date_enreg=?`, [req.body.date_])
                //Liste total des employe
            let nb_total_employe = (await D.exec('select count(*) as nb from employe'))[0].nb

            return res.send({ status: true, pres_, nb_total_employe })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }


}

module.exports = Dashboard