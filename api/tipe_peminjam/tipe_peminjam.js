const express = require('express');
const router = express.Router();
const validator = require('./tipe_peminjamValidator');
const tipePeminjamModel = require('./tipe_peminjamModel');

router.get('/',(req, res, next) => {
    const allowed = ['id_tipe', 'nama'];
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})
    new tipePeminjamModel().getTipe_Peminjam(filtered).then(x => {
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

router.get('/:page?',(req, res, next) => {
    const allowed = ['id_tipe', 'nama'];
    var perPage = 5 ;
    var page = req.params.page || 1;
    var start = (page > 1) ? (page * perPage) - perPage : 0; 
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})
    new tipePeminjamModel().getTipe_Peminjam(filtered, perPage, start).then(x => {
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

router.post('/', validator.validate('tipe_peminjam_post'), validator.verify, (req, res, next) => {
    const allowed = ['nama'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new tipePeminjamModel().postTipe_Peminjam(filtered).then(x => {
        res.status(201).send({
            message:"Data berhasil diinput"
        })
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({
            message:"Error pada data"
        })
    })
})

router.patch('/:id_tipe', validator.validate('tipe_peminjam_update'), validator.verify, (req, res, next) =>{
    var query = {
        id_tipe: req.params.id_tipe
    };
    const allowed = ['nama'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new tipePeminjamModel().updateTipe_Peminjam(query, filtered).then(x => {
        res.status(201).send({
            message:"Data berhasil diupdate"
        })
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({
            message:"Error pada data"
        })
    })
})



module.exports = router;