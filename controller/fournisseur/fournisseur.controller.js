const Aut_jwt = require('../../models/app_auth');
var D = require('../../models/data')
const path = require('path')
const sharp = require('sharp')

var fournisseur_data = {
    fourn_id: { front_name: "fourn_id:", fac: true, },
    ville_id: { front_name: "ville_id", fac: false, },
    localisation_: { front_name: "localisation_", fac: false },
    fourn_name: { front_name: "fourn_name", fac: false, },
    fourn_email: { front_name: "fourn_email", fac: false, },
    fourn_nif: { front_name: "fourn_nif", fac: false, },
    fourn_stat: { front_name: "fourn_stat", fac: false, },
    fourn_tel: { front_name: "fourn_tel", fac: false, },
    fourn_pass: { front_name: "fourn_pass", fac: false, },
    fourn_status: { front_name: "fourn_status", fac: false, },
    fourn_img_log_middle: { front_name: "fourn_img_log_middle", fac: true, },
    fourn_img_bg: { front_name: "fourn_img_bg", fac: true, },
    fourn_img_log_big: { front_name: "fourn_img_log_big", fac: true },
};

class Fournisseur {
    static async register(req, res) {
        var _d = req.body;

        //Vérification du fournisseur
        const _pd_keys = Object.keys(fournisseur_data)
        var _tmp = {}
        var _list_error = []
        try {

            _pd_keys.forEach((v) => {
                _tmp = fournisseur_data[v]

                if (!_tmp.fac && !_d[_tmp.front_name]) {
                    _list_error.push({ code: _tmp.front_name })
                }
            })

            if (_list_error.length > 0) {
                return res.send({ status: false, message: "Certains champs sont vide", data: _list_error })
            }

            //Si la vérification c'est bien passé, 
            // on passe à l'insertion du utilisateur
            var _data = {}
            _pd_keys.forEach((v, i) => {
                _tmp = fournisseur_data[v]


                if (_tmp.format != undefined) {
                    _d[_tmp.front_name] = _tmp.format(_d[_tmp.front_name])
                }

                _data[v] = _d[_tmp.front_name]
            })

            //l'objet utilisateur est rempli maintenant
            // on l'insert dans la base de donnée

            await D.set('fournisseur', _data)
            console.log(D);
            try {
                const token = Aut_jwt.create_token(_data)
                req.io.emit('check_', Aut_jwt.decode_token(token).payload)
                return res.cookie('access_token', token, { sameSite: 'none', secure: true }).send({ status: true, message: 'Inscription Scuccess', data: _data, reload: true })
            } catch (error) {
                console.log('erreur', error);
            }
        } catch (e) {
            return res.send({ status: false, message: e.message })
        }
    }

    static async login(req, res) {
        try {
            var tel = req.body.fourn_tel
            var pass = req.body.fourn_pass

            var _f = await D.exec_params(`select * from fournisseur where fourn_tel = ? and fourn_pass = ?`, [tel, pass])
            if (_f.length > 0) {
                const token = Aut_jwt.create_token(_f[0])
                //  console.log(Aut_jwt.decode_token(token).payload);
                req.io.emit('check_', Aut_jwt.decode_token(token).payload)
                return res.cookie('access_token', token, { sameSite: 'none', secure: true })
                    .send({ status: true, message: 'Félicitation', data: _f[0], reload: true })
            } else {
                return res.send({ status: false, message: 'Mots de passe incorrect' })

            }
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async logout(req, res) {
        return res.clearCookie('access_token', { sameSite: 'none', secure: true })
            .send({ status: true, message: 'deconnecter', reload: true })
    }

    static async check_if_logged(req, res) {
        var array = req.headers.cookie ? req.headers.cookie.split(';') : [];
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            if (element.split('=')[0] == 'access_token' || element.split('=')[0] == ' access_token') {
                //  req.io.emit('check_', Aut_jwt.decode_token(element.split('=')[1]).payload)
                return res.send({ status: true, data: Aut_jwt.decode_token(element.split('=')[1]).payload })
            }
        }
        return res.send({ status: false, message: 'Non concecter' })
    }

    static async getList(req, res) {
        var filters = req.query
        var _obj_pat = {
            fourn_id: 'fourn_id',
        }
        var default_sort_by = 'fourn_id'
        filters.page = (!filters.page) ? 1 : parseInt(filters.page)
        filters.limit = (!filters.limit) ? 100 : parseInt(filters.limit)
        filters.sort_by = (!filters.sort_by) ? _obj_pat[default_sort_by] : _obj_pat[filters.sort_by]
        try {
            var reponse = await D.exec_params(`select * from fournisseur   order by ${filters.sort_by} limit ? offset ? `, [
                filters.limit,
                (filters.page - 1) * filters.limit
            ])
            req.io.emit('getFournList', reponse)
            var nb_total_fournisseur = (await D.exec('select count(*) as nb from fournisseur'))[0].nb

            return res.send({ status: true, reponse, nb_total_fournisseur })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static async uploaImg(req, res) {
        var compImgFileSavePath = path.join(__dirname, '../../../', 'img', 'compressed', 'anda_img_' + new Date().getTime() + '.jpg')
        var compImgFileSavePath2 = path.join(__dirname, '../../../', 'img', 'anda_img_' + new Date().getTime() + '.jpg')

        var temp = compImgFileSavePath.split('/');
        var big_name = temp[temp.length - 1];
        var smal_name = temp[temp.length - 1];
        var fourn_ = null;
        var array = req.headers.cookie.split(';');
        for (var i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.split('=')[0] == 'access_token' || element.split('=')[0] == ' access_token') {
                fourn_ = Aut_jwt.decode_token(element.split('=')[1]).payload;
            }
        }

        sharp(req.file.path).jpeg({
            quality: 60
        }).toFile(compImgFileSavePath2, (e, info) => {
            if (e) {
                console.log('Erreur 158: '+e);
                res.send(e)
            } else {
                sharp(req.file.path).resize(500, 500).jpeg({
                    quality: 20,
                    chromaSubsampling: '4:4:4'
                }).toFile(compImgFileSavePath, async (e, info) => {
                    if (e) {
                        console.log('io fa mbola erreur: '+e);
                        res.send(e)
                    } else {
                        await D.updateWhere('fournisseur', { fourn_img_log_middle: smal_name, fourn_img_log_big: big_name }, { fourn_id: fourn_.fourn_id })
                        res.send({ status: true, message: 'success' })
                    }
                })
            }
        })
    }

    static async uploaImgBg(req, res) {
        var compImgFileSavePath = path.join(__dirname, '../../../', 'img', 'compressed', 'anda_img_' + new Date().getTime() + '.jpg')

        var temp = compImgFileSavePath.split('/');
        var smal_name = temp[temp.length - 1];
        var fourn_ = null;
        var array = req.headers.cookie.split(';');
        for (var i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.split('=')[0] == ' access_token' || element.split('=')[0] == 'access_token') {
                fourn_ = Aut_jwt.decode_token(element.split('=')[1]).payload;
            }
        }
        sharp(req.file.path).jpeg({
            quality: 60,
            //  chromaSubsampling: '4:4:4'
        }).toFile(compImgFileSavePath, async (e, info) => {
            if (e) {
                res.send(e)
            } else {
                await D.updateWhere('fournisseur', { fourn_img_bg: smal_name }, { fourn_id: fourn_.fourn_id })
                res.send({ status: true, message: 'success' })
            }
        })

    }

    static async update(req, res) {
        var _data_body = req.body;
        var four_model = fournisseur_data;
        var data_temp = {}
        var _list_error = []
        //  variable four_ = fournisseur dans le cookie
        var fourn_ = null
        var array = req.headers.cookie.split(';');
        for (var i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.split('=')[0] == 'access_token' || element.split('=')[0] == ' access_token') {
                fourn_ = Aut_jwt.decode_token(element.split('=')[1]).payload;
            }
        }
        for (const key in _data_body) {
            data_temp[key] = four_model[key]
            if (!data_temp.fac && _data_body[key] == "") {
                _list_error.push({ code: data_temp[key].front_name })
            }
        }
        if (_list_error.length > 0) {
            return res.send({ status: false, message: "Certains champs sont vide", data: _list_error })
        }
        for (const key in four_model) {
            four_model[key] = fourn_[key]
        }
        for (const key in _data_body) {
            four_model[key] = _data_body[key]
        }
        try {
            await D.updateWhere('fournisseur', four_model, { fourn_id: fourn_.fourn_id })
            var token = Aut_jwt.create_token(four_model)
            req.io.emit('check_', Aut_jwt.decode_token(token).payload)
            return res.cookie('access_token', token, { sameSite: 'none', secure: true })
                .send({ status: true, message: 'Mise à jour Scuccess', data: four_model })
        } catch (e) {
            console.error(e)
            return res.send({ status: false, message: "Erreur dans la base de donnée" })
        }
    }

    static setAutoImg(req,res) {
        const listImages = require('../autoCreateFourn');
        const url_= '../../../images/all/img3';
        const folderPath = path.resolve(__dirname, url_);

        listImages(folderPath)
            .then((imageNames) => {
                console.log('Liste des images dans le dossier :');
                var liste=[];
                imageNames.forEach((imageName) => { 
                    liste.push(imageName)
                }); 

                req.io.emit('insertAll',liste)
                return res.send({data:liste})
            })
            .catch((err) => {
                console.error('Une erreur s\'est produite lors de la liste des images :', err);
                
            return res.send({ status: false, message: err })
            }); 

    }
    static cutStr(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength - 3) + '...';
        }
        return str;
    }
}
module.exports = Fournisseur;