let utils = require('../utils/utils')
let D = require('../models/data')

class Conge {
    static async register(req, res) {

        let _d = req.body;

        let conge_data = {
            id_conge: { front_name: 'id_conge', fac: true },
            im_emp: { front_name: "im_emp", fac: false },
            type_conge: { front_name: "type_conge", fac: false, },
            motif_conge: { front_name: "motif_conge", fac: false, },
            nbr_jour: { front_name: "nbr_jour", fac: false, },
            etat_conge: { front_name: "etat_conge", fac: false, },
            conge_date_enreg: { front_name: 'conge_date_enreg', fac: true, format: (a) => new Date() },
        };

        //Vérification du conge
        const _pd_keys = Object.keys(conge_data)
        let _tmp = {}
        let _list_error = []
        try {
            _pd_keys.forEach((v, i) => {
                _tmp = conge_data[v]
                if (!_tmp.fac && !_d[_tmp.front_name]) {
                    _list_error.push({ code: _tmp.front_name })
                }
            })



            if (_list_error.length > 0) {
                return res.send({ status: false, message: "Certains champs sont vide ", data: _list_error })
            }

            //Si la vérification c'est bien passé, 
            // on passe à l'insertion du conge
            let _data = {}
            _pd_keys.forEach((v, i) => {
                _tmp = conge_data[v]

                if (_tmp.format != undefined) {
                    _d[_tmp.front_name] = _tmp.format(_d[_tmp.front_name])
                }

                _data[v] = _d[_tmp.front_name]
            })

            //Hashage de mot de passe
            // _data['util_pass'] = await utils.hash(_data['util_pass'])

            //l'objet conge est rempli maintenant
            // on l'insert dans la base de donnée

            await D.set('conge', _data)
                //Ici tous les fonctions sur l'enregistrement d'un conge
            return res.send({ status: true, message: "user bien enregistrer." })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }


    }

    static async delete(req, res) {
        try {
            await D.del('conge', req.params)
                //Ici tous les fonctions sur l'enregistrement d'un conge
            return res.send({ status: true, message: "user supprimé." })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }

    }

    //Récupération des détails des conges
    static async getDetailsUser(req, res) {
        try {

            let { id } = req.params

            //Récupération d'un simple conge
            let user = (await D.exec_params('select * from conge where id_conge = ?', id))[0]

            //Récupération accès modules
            let user_access = await D.exec_params(`select * from module
            left join util_access on module_id = ua_module_id 
            left join conge on id_conge = ?`, id)



            //à venir : récupération des historiques de l'conge
            let module_list = await D.exec('select * from module')


            // console.log(user);

            return res.send({ status: true, user, user_access, module_list })

        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    //Récupération des détails des conges
    static async setLogout(req, res) {
        try {

            let { id } = req.params

            //Récupération d'un simple conge
            let user = (await D.exec_params('select * from conge where id_conge = ?', id))[0]

            //Récupération accès modules
            let user_access = await D.exec_params(`select * from module
            left join util_access on module_id = ua_module_id 
            left join conge on id_conge = ?`, id)



            //à venir : récupération des historiques de l'conge
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

            let _f = await D.exec_params(`select * from conge where util_email = ? and util_pass = ?`, [email, pass])

            if (_f.length > 0) {
                await D.exec_params(`update conge set util_status='0' where util_email = ? and util_pass = ?`, [email, pass])
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

            let _f = await D.exec_params(`select * from conge where util_email = ? and util_pass = ?`, [email, pass])

            if (_f.length > 0) {
                await D.exec_params(`update conge set util_status='1' where util_email = ? and util_pass = ?`, [email, pass])
                return res.send({ status: true, message: 'connection fait' })
            } else {
                return res.send({ status: false, message: "L'conge n'existe pas" })
            }
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }


    static async getList(req, res) {
        let type = req.body.type
        let filters = req.query
        let _obj_pat = {
            id_conge: 'id_conge',
            util_label: 'emp_nom_prenom',
        }
        let default_sort_by = 'id_conge'

        filters.page = (!filters.page) ? 1 : parseInt(filters.page)
        filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]

        try {
            //A reserver recherche par nom_prenom
            let reponse = await D.exec_params(`select * from conge  where type_conge= ?  order by ${filters.sort_by} limit ? offset ? `, [
                    type,
                    filters.limit,
                    (filters.page - 1) * filters.limit
                ])
                //Liste total des conge
            let nb_total_conge = (await D.exec('select count(*) as nb from conge'))[0].nb

            return res.send({ status: true, reponse, nb_total_conge })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async findList(req, res) {

        // let find_val =req.body.find
        let filters = req.query
        let _obj_pat = {
            id_conge: 'id_conge',
            emp_nom_prenom: 'emp_nom_prenom',
        }
        let default_sort_by = 'id_conge'
        filters.page = (!filters.page) ? 1 : parseInt(filters.page)
        filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]
        try {
            let reponse = await D.exec_params(`select conge.*, employe.* 
             from  
             conge left join employe on employe.emp_im=conge.im_emp where conge.etat_conge=1 and
             employe.emp_nom_prenom like ? and conge.type_conge=? order by ${'conge.'+filters.sort_by} limit ? offset ? `, [
                    '%' + req.body.find + '%',
                    req.body.type_,
                    filters.limit,
                    (filters.page - 1) * filters.limit
                ])
                //Liste total des conge
            let nb_total_conge = (await D.exec('select count(*) as nb from conge'))[0].nb

            return res.send({ status: true, reponse, nb_total_conge })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async find_all_conge(req, res) {

        // let find_val =req.body.find
        let filters = req.query
        let _obj_pat = {
            id_conge: 'id_conge',
            emp_nom_prenom: 'emp_nom_prenom',
        }
        let default_sort_by = 'id_conge'
        filters.page = (!filters.page) ? 1 : parseInt(filters.page)
        filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]
        try {
            let reponse = await D.exec_params(`select * from conge where etat_conge=1;`)
                //Liste total des conge
            let nb_total_conge = (await D.exec('select count(*) as nb from conge'))[0].nb

            return res.send({ status: true, reponse, nb_total_conge })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async update(req, res) {
        try {
            await D.updateWhere('conge', { etat_conge: req.body.etat_conge }, { id_conge: req.body.id_conge })
            return res.send({ status: true, message: "Mise à jour, fait" })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }
}

module.exports = Conge