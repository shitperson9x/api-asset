const express = require('express');
const router = express.Router();
const validator = require('./peminjamanValidator');
const peminjamanModel = require('./peminjamanModel');
const Peminjaman = require('./peminjamanModel');
const {Sequelize, QueryTypes} = require('sequelize');
const connString = require('../../includes/connString');
const sequelize = new Sequelize(connString.assets);

router.get('/', (req, res, next) => {
    const allowed = ['id_peminjaman', 'id_ruangan', 'user_peminjam', 'tipe_peminjam', 'tgl_pinjam', 'tgl_kembali'];
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})

    new peminjamanModel().getPeminjaman(filtered).then(x => {
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

router.get('/peminjamanjoin', async (req, res, next) => {
    // const allowed = ['id_peminjaman', 'id_ruangan', 'user_peminjam', 'tipe_peminjam', 'tgl_pinjam', 'tgl_kembali'];
    // const filtered = Object.keys(req.query)
    // .filter(key => allowed.includes(key))
    // .reduce((obj, key) => {
    //     obj[key] = req.query[key];
    //     return obj;
    // }, {})
    var data = await sequelize.query("select peminjaman.id_peminjaman, peminjaman.id_ruangan, peminjaman.user_peminjam, peminjaman.tgl_pinjam, peminjaman.tgl_kembali,  barang.id_barang, barang.kode_barang, barang.nama from peminjaman_alokasi join peminjaman on peminjaman.id_peminjaman = peminjaman_alokasi.id_peminjaman join alokasi on alokasi.id_alokasi = peminjaman_alokasi.id_alokasi join stok on stok.id_stok = alokasi.id_stok join barang on stok.id_barang = barang.id_barang", { type: QueryTypes.SELECT });        
            res.status(200).send({
                data: data          
            });
        
});


router.get('/:page?', (req, res, next) => {
    const allowed = ['id_peminjaman', 'id_ruangan', 'user_peminjam', 'tipe_peminjam', 'tgl_pinjam', 'tgl_kembali'];
    var perPage = 5 ;
    var page = req.params.page || 1;
    var start = (page > 1) ? (page * perPage) - perPage : 0;     
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})

    new peminjamanModel().getPeminjaman(filtered, perPage, start).then(x => {
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

router.post('/', validator.validate('peminjaman_post'), validator.verify, (req, res, next) => {
    const allowed = ['id_ruangan', 'user_peminjam', 'tipe_peminjam', 'tgl_pinjam', 'tgl_kembali'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new peminjamanModel().postPeminjaman(filtered).then(x => {
        res.status(201).send({
            message:"Data berhasil diinput",
            id: x.id_peminjaman
        })
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({
            message:"Error pada data"
        })
    })
});

router.patch('/:id_peminjaman', validator.validate('peminjaman_update'), validator.verify, (req, res, next) => {
    var query = {
        id_peminjaman: req.params.id_peminjaman
    };
    const allowed = ['id_ruangan', 'user_peminjam', 'tipe_peminjam', 'tgl_pinjam', 'tgl_kembali']
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new peminjamanModel().updatePeminjaman(query, filtered).then(x => {
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

router.delete('/:id_peminjaman', validator.validate('peminjaman_update'), validator.verify, (req, res, next) => {
    var query = {
        id_peminjaman: req.params.id_peminjaman
    };

    new peminjamanModel().updatePeminjaman(query, {soft_delete:1}).then(x => {
        res.status(201).send({
            message:"Data berhasil didelete"
        })
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({
            message:"Error pada data"
        })
    })
});

module.exports = router;