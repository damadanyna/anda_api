let utils = require('../utils/utils')
let D = require('../models/data')

class Presence{
    static async register(req,res){ 
        
        let _d= req.body;
        console.log(_d);
        
        let presence_data={
            id_pres:{front_name:'id_pres',fac:true}, 
            im_emp :{front_name:"im_emp",fac:false},
            statut_pres :{front_name:"statut_pres",fac:false,}, 
            pres_date_enreg :{front_name:'pres_date_enreg',fac:true,format:(a) => new Date().toDateString()},
            pres_heure_enreg :{front_name:'pres_heure_enreg',fac:true,format:(a) => new Date().toTimeString().split(' ')[0]},
        };

        //Vérification du presence
        const _pd_keys = Object.keys(presence_data)
        let _tmp = {}
        let _list_error = [] 
         try {
            _pd_keys.forEach((v,i)=>{
                _tmp = presence_data[v]
                if(!_tmp.fac && !_d[_tmp.front_name]){ 
                    _list_error.push({code:_tmp.front_name})
                }
            })
    
             

            if(_list_error.length> 0){
                return res.send({status:false,message:"Certains champs sont vide ",data:_list_error})
            }
    
            //Si la vérification c'est bien passé, 
            // on passe à l'insertion du presence
            let _data = {}
            _pd_keys.forEach((v,i)=>{
                _tmp = presence_data[v]

                if(_tmp.format != undefined){
                    _d[_tmp.front_name] = _tmp.format(_d[_tmp.front_name])
                }
            
                _data[v] = _d[_tmp.front_name]
            })

            //Hashage de mot de passe
            // _data['util_pass'] = await utils.hash(_data['util_pass'])
            
            //l'objet presence est rempli maintenant
            // on l'insert dans la base de donnée

            await D.set('presence',_data)
            //Ici tous les fonctions sur l'enregistrement d'un presence
            return res.send({status:true,message:"user bien enregistrer."})
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }

 
    }

    static async delete(req,res){ 
        try {   
            await D.del('presence',req.params)
            //Ici tous les fonctions sur l'enregistrement d'un presence
            return res.send({status:true,message:"user supprimé."})
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
 
    }  

    //Récupération des détails des presences
    static async getDetailsUser(req,res){
        try {

            let {id} = req.params

            //Récupération d'un simple presence
            let user = (await D.exec_params('select * from presence where id_pres = ?',id))[0]

            //Récupération accès modules
            let user_access = await D.exec_params(`select * from module
            left join util_access on module_id = ua_module_id 
            left join presence on id_pres = ?`,id)



            //à venir : récupération des historiques de l'presence
            let module_list = await D.exec('select * from module')


            // console.log(user);

            return res.send({status:true,user,user_access,module_list})

        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    }

    //Récupération des détails des presences
    static async setLogout(req,res){
        try {

            let {id} = req.params

            //Récupération d'un simple presence
            let user = (await D.exec_params('select * from presence where id_pres = ?',id))[0]

            //Récupération accès modules
            let user_access = await D.exec_params(`select * from module
            left join util_access on module_id = ua_module_id 
            left join presence on id_pres = ?`,id)



            //à venir : récupération des historiques de l'presence
            let module_list = await D.exec('select * from module')


            // console.log(user);

            return res.send({status:true,user,user_access,module_list})

        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    }

    static async setAccess(req,res){
         
        try {
            let email = req.body.util_email 
            let pass = req.body.util_pass 

            let _f = await D.exec_params(`select * from presence where util_email = ? and util_pass = ?`,[email,pass])
            
            if(_f.length > 0){
                await D.exec_params(`update presence set util_status='0' where util_email = ? and util_pass = ?`,[email,pass])
            }  
            return res.send({status:true,message:'Deconnection fait'})
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    }


    static async setLogin(req,res){
         
        try {
            let email = req.body.util_email 
            let pass =  req.body.util_pass

            let _f = await D.exec_params(`select * from presence where util_email = ? and util_pass = ?`,[email,pass])
             
            if(_f.length > 0){
                await D.exec_params(`update presence set util_status='1' where util_email = ? and util_pass = ?`,[email,pass])
                return res.send({status:true,message:'connection fait'})
            }else{
                return res.send({status:false,message:"L'presence n'existe pas"})
            }
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    }
    

    static async getList(req,res){

        // let find_val =req.body.find
        let filters = req.query
        let _obj_pat = {
            id_pres:'id_pres',
            util_label:'emp_nom_prenom',
        } 
        let default_sort_by = 'id_pres'

        filters.page = (!filters.page )?1:parseInt(filters.page)
        filters.limit = (!filters.limit)?100:parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by)?_obj_pat[default_sort_by]:_obj_pat[filters.sort_by]

        try {
             let reponse= await D.exec_params(`select presence.*, employe.* 
             from  
             presence left join employe on employe.emp_im=presence.im_emp where presence.pres_date_enreg=? order by ${filters.sort_by} limit ? offset ? `,[
                new Date().toDateString(),    
                filters.limit,
                    (filters.page-1)*filters.limit
                ])  

            //Liste total des presence
            let nb_total_presence = (await D.exec('select count(*) as nb from presence'))[0].nb

            return res.send({status:true,reponse,nb_total_presence})
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    }
    
    
    static async getDays(req,res){ 
        try { 
            //A reserver recherche par nom_prenom
            let reponse = await D.exec_params(`select pres_date_enreg from presence group by pres_date_enreg order by pres_date_enreg desc`)
            //Liste total des utilisateur
            let nb_total_utilisateur = (await D.exec('select count(*) as nb from utilisateur'))[0].nb

            return res.send({status:true,reponse,nb_total_utilisateur})
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    } 

    static async findList(req,res){

        // let find_val =req.body.find
        let filters = req.query
        let _obj_pat = {
            id_pres:'id_pres',
            util_label:'emp_nom_prenom',
        } 
        let default_sort_by = 'id_pres'
            console.log(req.body); 

        filters.page = (!filters.page )?1:parseInt(filters.page)
        filters.limit = (!filters.limit)?100:parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by)?_obj_pat[default_sort_by]:_obj_pat[filters.sort_by]

        try {
             let reponse = await D.exec_params(`select presence.*, employe.* 
             from  
             presence left join employe on employe.emp_im=presence.im_emp where 
             employe.emp_nom_prenom like ?  and  presence.pres_date_enreg=? and presence.statut_pres=? order by ${filters.sort_by} limit ? offset ? `,[
                    '%'+req.body.find+'%',
                    req.body.date_,
                    req.body.day_type,
                    filters.limit,
                    (filters.page-1)*filters.limit
                ]) 
            //Liste total des presence
            let nb_total_presence = (await D.exec('select count(*) as nb from presence'))[0].nb

            return res.send({status:true,reponse,nb_total_presence})
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    }

    static async update(req,res){ 
        let {user,mng_pass} = req.body 
        delete user.util_date_enreg

        try { 
            if(mng_pass.change){
                user.util_mdp = await utils.hash(mng_pass.pass)
            }else{
                delete user.util_mdp
            }
            
            await D.updateWhere('presence',user,{util_id:user.util_id})
            //Ici tous les fonctions sur l'enregistrement d'un presence
            return res.send({status:true,message:"Mise à jour, fait"})
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    }
}

module.exports = Presence