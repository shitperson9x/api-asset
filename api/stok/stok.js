const express = require('express');
const router = express.Router();
const validator = require('./stokValidator');
const stokModel = require('./stokModel');

router.get('/', (req, res, next) => {
    const allowed = ['id_stok','kode_stok', 'id_barang', 'tgl_serah_terima', 'attachment', 'jumlah', 'id_vendor', 'tgl_kontrak', 'no_kontrak', 'satuan_harga'];
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})

    new stokModel().getStok(filtered).then(x => {
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
    const allowed = ['id_stok','kode_stok', 'id_barang', 'tgl_serah_terima', 'attachment', 'jumlah', 'id_vendor', 'tgl_kontrak', 'no_kontrak', 'satuan_harga'];
    var perPage = 5 ;
    var page = req.params.page || 1;
    var start = (page > 1) ? (page * perPage) - perPage : 0; 
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})

    new stokModel().getStok(filtered, perPage, start).then(x => {
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

router.post('/', validator.validate('stok_post'), validator.verify, (req, res, next) => {
    const allowed = ['kode_stok', 'id_barang', 'tgl_serah_terima', 'attachment', 'jumlah', 'id_vendor', 'tgl_kontrak', 'no_kontrak', 'satuan_harga'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new stokModel().postDataStok(filtered).then(x => {
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

router.patch('/:id_stok', validator.validate('stok_update'), validator.verify, (req, res, next) => {
    var query = {
        id_stok: req.params.id_stok
    };
    const allowed = ['kode_stok', 'id_barang', 'tgl_serah_terima', 'attachment', 'jumlah', 'id_vendor', 'tgl_kontrak', 'no_kontrak', 'satuan_harga'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new stokModel().updateDataStok(query, filtered).then(x => {
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

router.delete('/:id_stok', validator.validate('stok_update'), validator.verify, (req, res, next) => {
    var query = {
        id_stok: req.params.id_stok
    };

    new stokModel().updateDataStok(query, {soft_delete:1}).then(x => {
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