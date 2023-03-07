 const Aut_jwt = require('../models/app_auth');
 var D = require('../models/data')
 const path = require('path')
 const sharp = require('sharp')

 var images_data = {
     img_id: { front_name: "img_id:", fac: true, },
     prod_id: { front_name: "prod_id:", fac: false, },
     img_midle: { front_name: "img_midle", fac: false, },
     img_big: { front_name: "img_big", fac: false },

 };
 class images {
     static async uploaImg(req, res) {
         var name_ = new Date().getTime() + '.jpg'
         var compImgFileSavePath = path.join(__dirname, '../../', 'img', 'compressed', 'anda_img_' + name_)
         var compImgFileSavePath2 = path.join(__dirname, '../../', 'img', 'anda_img_' + name_)

         var temp = compImgFileSavePath.split('/');
         var big_name = temp[temp.length - 1];
         var smal_name = temp[temp.length - 1];

         var _data = {
             prod_id: req.params.fourn_id,
             img_midle: smal_name,
             img_big: big_name
         }

         sharp(req.file.path).jpeg({
             quality: 60
         }).toFile(compImgFileSavePath2, (e, info) => {
             if (e) {
                 res.send(e)
             } else {
                 sharp(req.file.path).resize(500, 500).jpeg({
                     quality: 20,
                     chromaSubsampling: '4:4:4'
                 }).toFile(compImgFileSavePath, async(e, info) => {
                     if (e) {
                         res.send(e)
                     } else {

                         await D.set('images', _data)
                         res.send({ status: true, message: 'success' })
                     }
                 })
             }
         })
     }

     static async update_it(req, res) {
         var name_ = new Date().getTime() + '.jpg'
         var compImgFileSavePath = path.join(__dirname, '../../', 'img', 'compressed', 'anda_img_' + name_)
         var compImgFileSavePath2 = path.join(__dirname, '../../', 'img', 'anda_img_' + name_)

         var temp = compImgFileSavePath.split('/');
         var big_name = temp[temp.length - 1];
         var smal_name = temp[temp.length - 1];
         sharp(req.file.path).jpeg({
             quality: 60
         }).toFile(compImgFileSavePath2, (e, info) => {
             if (e) {
                 res.send(e)
             } else {
                 sharp(req.file.path).resize(500, 500).jpeg({
                     quality: 20,
                     chromaSubsampling: '4:4:4'
                 }).toFile(compImgFileSavePath, async(e, info) => {
                     if (e) {
                         res.send(e)
                     } else {
                         await D.updateWhere('images', { img_midle: smal_name, img_big: big_name }, { img_id: req.params.img_id })

                         res.send({ status: true, message: 'success' })
                     }
                 })
             }
         })
     }

     static async update(req, res) {
         var _data_body = req.body;
         var four_model = images_data;
         var data_temp = {}
         var _list_error = []
             //  variable four_ = images dans le cookie
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
             await D.updateWhere('images', four_model, { fourn_id: fourn_.fourn_id })
             var token = Aut_jwt.create_token(four_model)
             req.io.emit('check_', Aut_jwt.decode_token(token).payload)
             return res.cookie('access_token', token)
                 .send({ status: true, message: 'Mise à jour Scuccess', data: four_model })
         } catch (e) {
             console.error(e)
             return res.send({ status: false, message: "Erreur dans la base de donnée" })
         }
     }
 }
 module.exports = images;