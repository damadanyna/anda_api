var D = require('../models/data')
var moment = require('moment')
moment.locale('fr')

 
class produit { 
    static async getList(req, res) {
        var fourn = req.params
        try {
            var reponse_ = await D.exec_params(`
                 select distinct categorie.* from produit left join categorie on produit.cat_id=categorie.cat_id where produit.fourn_id=? `, [fourn.fourn_id])
            req.io.emit('all_cat', { reponse_: reponse_, count: reponse_.length > 0 ? reponse_.length : null })
            var reponse = !req.body.cat_id ? await D.exec_params(`select * from produit where fourn_id=? order by prod_date_enreg desc`, [fourn.fourn_id]) : await D.exec_params(`select * from produit where fourn_id=? and cat_id=?  order by prod_date_enreg desc`, [fourn.fourn_id, req.body.cat_id])
            for (let i = 0; i < reponse.length; i++) {
                const element = reponse[i];
                var img_ = await D.exec_params(`select * from images where ?`, [{ prod_id: element.prod_id }])
                reponse[i].images = img_
            }
            var nb_total = await D.exec_params(`select count(*) as nb from produit where fourn_id= ?`, [fourn.fourn_id])
            for (const iterator of reponse) {
                iterator['prod_date_enreg'] = moment(iterator['prod_date_enreg']).fromNow();
            }
            req.io.emit('all_product', { reponse, nb_total })
            return res.send({ reponse, nb_total })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }
    static async getProdList(req, res) {
        var offset = req.params.offset;
        try {

            var reponse = await D.exec_params(`SELECT * FROM produit p JOIN
            fournisseur f ON p.fourn_id = f.fourn_id and p.prod_disp=1
            ORDER BY
            RAND(), p.prod_date_enreg DESC
            LIMIT
            10 OFFSET ${offset};
             ` ) ;
            for (let i = 0; i < reponse.length; i++) {
                const element = reponse[i];
                var img_ = await D.exec_params(`select * from images where ?`, [{ prod_id: element.prod_id }])
                reponse[i].images = img_
            }
            var nb_total = await D.exec_params(`select count(*) as nb from produit `)
            for (const iterator of reponse) {
                iterator['prod_date_enreg'] = moment(iterator['prod_date_enreg']).fromNow();
            }
            //  req.io.emit('all_product', { status: true, reponse, nb_total: nb_total[0].nb }) 
            return res.send({ status: true, reponse, nb_total: nb_total[0].nb })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async getFournList(req, res) {
        try {

            var reponse = await D.exec_params(`SELECT *
             FROM produit
             INNER JOIN fournisseur ON fournisseur.fourn_id = produit.fourn_id
             WHERE fournisseur.fourn_id=? and produit.prod_disp='1' limit 4
             `, [req.params.fourn_id]);
            for (let i = 0; i < reponse.length; i++) {
                const element = reponse[i];
                var img_ = await D.exec_params(`select * from images where ?`, [{ prod_id: element.prod_id }])
                reponse[i].images = img_
            }
            var nb_total = await D.exec_params(`select count(*) as nb from produit where fourn_id=? and prod_disp='1'`, [req.params.fourn_id])
            for (const iterator of reponse) {
                iterator['prod_date_enreg'] = moment(iterator['prod_date_enreg']).fromNow();
            }
            //  req.io.emit('all_product', { status: true, reponse, nb_total: nb_total[0].nb })
            return res.send({ status: true, reponse, nb_total: nb_total[0].nb })
            // console.log(req.params);
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }
 
}
module.exports = produit;