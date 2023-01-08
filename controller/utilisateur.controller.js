let utils = require('../utils/utils')
let D = require('../models/data')

class Utilisateur{
    static async register(req,res){ 
        
        let _d= req.body;
        
        let utilisateur_data={
            util_id:{front_name:'util_id',fac:true}, 
            util_name :{front_name:"name",fac:false},
            util_email :{front_name:"email",fac:false,},
            util_pass :{front_name:"pass",fac:false},
            util_status :{front_name:"stat",fac:false},
            util_date_enreg :{front_name:'util_date_enreg',fac:true,format:(a) => new Date()},
        };

        //Vérification du utilisateur
        const _pd_keys = Object.keys(utilisateur_data)
        let _tmp = {}
        let _list_error = [] 
         try {
            _pd_keys.forEach((v,i)=>{
                _tmp = utilisateur_data[v]
                if(!_tmp.fac && !_d[_tmp.front_name]){ 
                    _list_error.push({code:_tmp.front_name})
                }
            })
    
             

            if(_list_error.length> 0){
                return res.send({status:false,message:"Certains champs sont vide",data:_list_error})
            }
    
            //Si la vérification c'est bien passé, 
            // on passe à l'insertion du utilisateur
            let _data = {}
            _pd_keys.forEach((v,i)=>{
                _tmp = utilisateur_data[v]

                if(_tmp.format != undefined){
                    _d[_tmp.front_name] = _tmp.format(_d[_tmp.front_name])
                }
            
                _data[v] = _d[_tmp.front_name]
            })

            //Hashage de mot de passe
            // _data['util_pass'] = await utils.hash(_data['util_pass'])
            
            //l'objet utilisateur est rempli maintenant
            // on l'insert dans la base de donnée

            await D.set('utilisateur',_data)
            //Ici tous les fonctions sur l'enregistrement d'un utilisateur
            return res.send({status:true,message:"user bien enregistrer."})
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }

 
    }
 
    static async setAccess(req,res){
         
        try {
            let email = req.body.util_email 
            let pass = req.body.util_pass 

            let _f = await D.exec_params(`select * from utilisateur where util_email = ? and util_pass = ?`,[email,pass])
            
            if(_f.length > 0){
                await D.exec_params(`update utilisateur set util_status='0' where util_email = ? and util_pass = ?`,[email,pass])
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

            let _f = await D.exec_params(`select * from utilisateur where util_email = ? and util_pass = ?`,[email,pass])
             
            if(_f.length > 0){
                await D.exec_params(`update utilisateur set util_status='1' where util_email = ? and util_pass = ?`,[email,pass])
                return res.send({status:true,message:'connection fait'})
            }else{
                return res.send({status:false,message:"L'utilisateur n'existe pas"})
            }
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    }
    
    static async getList(req,res){


        let filters = req.query
        let _obj_pat = {
            util_id:'util_id',
            util_label:'util_label',
        } 
        let default_sort_by = 'util_id'

        filters.page = (!filters.page )?1:parseInt(filters.page)
        filters.limit = (!filters.limit)?100:parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by)?_obj_pat[default_sort_by]:_obj_pat[filters.sort_by]

        try { 
            //A reserver recherche par nom_prenom
            let reponse = await D.exec_params(`select * from utilisateur   order by ${filters.sort_by} limit ? offset ? `,[
                filters.limit,
                (filters.page-1)*filters.limit
            ])

            //Liste total des utilisateur
            let nb_total_utilisateur = (await D.exec('select count(*) as nb from utilisateur'))[0].nb

            return res.send({status:true,reponse,nb_total_utilisateur})
        } catch (e) {
            console.error(e)
            return res.send({status:false,message:"Erreur dans la base de donnée"})
        }
    } 
    
    
}

module.exports = Utilisateur