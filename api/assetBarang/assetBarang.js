const express = require('express');
const router = express.Router();
const validator = require('./assetBarangValidator');
const assetBarangModel = require('./assetBarangModel');
const connString = require('../../includes/connString');
const Axios = require('axios');

function isPromise(object){
    if(Promise && Promise.resolve){
      return Promise.resolve(object) == object;
    }else{
      throw "Promise not supported in your environment"
    }
  }

function checkValid(link){
    return new Promise((resolve,reject) => {
        Axios.get(link).then((response) => {
            var msg = {
                attachment:{
                    type:"link",
                    attachment:link
                },
                message:"Link Valid",
                status:200
            };
            resolve(msg);
        }).catch((err) => {
            var msg = {
                message:'Link Tidak Valid dengan Error'+err.status,
                param:"attachment",
                status:422
            }
            //console.log(err.status);
            resolve(msg);
        });
    });
}

router.get('/', validator.validate('barang_get'), validator.verify, (req, res, next) => {
    const allowed = ['id_barang', 'kode_barang', 'nama', 'id_kategori', 'id_merk', 'spesifikasi', 'id_supplier', 'attachment', 'id_referensi', 'id_sub_sub_rincian_objek'];
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})
    new assetBarangModel().getBarang(filtered).then(x => {
        if(x == ''){
            res.status(200).send({
                data:x,
                message:'Data Kosong'
            });
        }else{
            res.status(200).send({
                data:x,
                message:'Sukses ambil data'
            });
        }
    }).catch((err) => {
        console.log(err);
    })
})

router.get('/:page?', validator.validate('barang_get'), validator.verify, (req, res, next) => {
    const allowed = ['id_barang', 'kode_barang', 'nama', 'id_kategori', 'id_merk', 'spesifikasi', 'id_supplier', 'attachment', 'id_referensi', 'id_sub_sub_rincian_objek'];
    var perPage = 5 ;
    var page = req.params.page || 1;
    var start = (page > 1) ? (page * perPage) - perPage : 0;    
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})
    new assetBarangModel().getBarang(filtered, perPage, start).then(x => {
        if(x == ''){
            res.status(200).send({
                data:x,
                message:'Data Kosong'
            });
        }else{
            res.status(200).send({
                data:x,
                perPage:5,
                nowOn:start,
                page:page
                //pages: //untuk membuat pagination button
            });
        }
    }).catch((err) => {
        console.log(err);
    })
})

router.post('/', validator.validate('barang_post'), validator.verify, (req, res, next) => {
    const allowed = ['kode_barang','nama', 'id_merk', 'spesifikasi', 'id_supplier', 'attachment', 'id_sub_sub_rincian_objek'];
    if(req.files){
        var attachment = req.files.attachment;
    }
    if(req.body){
        var link = req.body.attachment;
    }   
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    },{});
    if(!attachment){
        if(link){
            if(link.match(connString.http)){
                var msg = checkValid(link);
            }else{
                var msg = {
                    message:'No Valid Link Format',
                    param:"attachment",
                    status:422
                }
            }
        }else{
            var msg = {
                message:"no attachment",
                param:"attachment",
                status:200
            }
        }
    }else{
        if(attachment && attachment.size <= 10000000 ){
            attachment.mv("./upload/attachment/" + attachment.name);
            var msg = {
                attachment:{
                    name:attachment.name,
                    type:attachment.mimetype
                },
                status:200
            };
        }else{
            var msg = {
                msg: "Ukuran File Tidak Boleh Lebih Dari 10MB",
                param: "attachment",
                status:422
            }
        }
    }
    if(isPromise(msg)){
        msg.then((msg => {
            console.log(msg);
            if(msg.status == 200){
                filtered['attachment'] = msg.attachment;
                new assetBarangModel().postDataBarang(filtered).then(x => {
                    res.status(201).send({
                        message:"Data berhasil diinput"
                    })
                }).catch((err)=> {
                    console.log(err);
                    res.status(500).send({
                        message:"Error pada data"
                    })
                })
            }else if(msg.status == 422){
                res.status(422).send({
                    error:msg,
                    message:'Invalid attachment type'
                })
            }
        }));
    }else{
        console.log(msg);
        if(msg.status == 200){
            filtered['attachment'] = msg.attachment;
            console.log(filtered);
            new assetBarangModel().postDataBarang(filtered).then(x => {
                res.status(201).send({
                    message:"Data berhasil diinput"
                })
            }).catch((err)=> {
                console.log(err);
                res.status(500).send({
                    message:"Error pada data"
                })
            })
        }else if(msg.status == 422){
            res.status(422).send({
                error:msg,
                message:'Invalid attachment type'
            })
        }
    }
})

router.patch('/:id_barang', validator.validate('barang_update'), validator.verify, (req, res, next) =>{
    var query = {
        id_barang: req.params.id_barang
    };
    const allowed = ['nama', 'id_kategori', 'id_merk', 'spesifikasi', 'id_supplier', 'attachment', 'id_referensi', 'id_sub_sub_rincian_objek'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new assetBarangModel().updateBarang(query, filtered).then(x => {
        res.status(201).send({
            message:'Sukses Update Data'
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                message:"Error pada data"
            })
        })
    })
})

router.delete('/:id_barang', validator.validate('barang_update'), validator.verify, (req, res, next) => {
    var query = {
        id_barang: req.params.id_barang
    };

    new assetBarangModel().updateBarang(query, {soft_delete:1}).then(x => {
        res.status(201).send({
            message:'Sukses Delete Data'
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                message:"Error pada data"
            })
        })
    })
});


module.exports = router;