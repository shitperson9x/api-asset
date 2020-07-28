const express = require('express');
const router = express.Router();
const validator = require('./peminjamanAlokasiValidator');
const peminjamanAlokModel = require('./peminjamanAlokasiModel');

router.get('/', (req, res, next) => {
    const allowed = ['id_peminjaman_alokasi', 'id_peminjaman', 'id_alokasi', 'tgl_pengembalian', 'status'];
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})

    new peminjamanAlokModel().getPeminjamanAlok(filtered).then(x => {
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
});

router.get('/:page?', (req, res, next) => {
    const allowed = ['id_peminjaman_alokasi', 'id_peminjaman', 'id_alokasi', 'tgl_pengembalian', 'status'];
    var perPage = 5 ;
    var page = req.params.page || 1;
    var start = (page > 1) ? (page * perPage) - perPage : 0; 
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})

    new peminjamanAlokModel().getPeminjamanAlok(filtered, perPage, start).then(x => {
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
});

router.post('/', validator.validate('peminjamanAlok_post'), validator.verify, (req, res, next) => {
    const allowed = ['id_peminjaman', 'id_alokasi', 'tgl_pengembalian', 'status'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new peminjamanAlokModel().postDataPeminjamanAlok(filtered).then(x => {
        res.status(201).send({
            message:"Data berhasil diinput"
        })
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({
            message:"Error pada data"
        })
    })
});

router.patch('/:id_peminjaman_alokasi', validator.validate('peminjamanAlok_update'), validator.verify, (req, res, next) => {
    var query = {
        id_peminjaman_alokasi: req.params.id_peminjaman_alokasi
    };
    const allowed = ['id_peminjaman', 'id_alokasi', 'tgl_pengembalian', 'status'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new peminjamanAlokModel().updateDataPeminjamanAlok(query, filtered).then(x => {
        res.status(201).send({
            message:"Data berhasil di update"
        })
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({
            message:"Error pada data"
        })
    })
});


module.exports = router;