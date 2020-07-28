const express = require('express');
const router = express.Router();
const validator = require('./assetRuangValidator');
const assetRuangModel = require('./assetRuangModel');

router.get('/', validator.validate('ruang_get'), validator.verify, (req, res, next) => {
    const allowed = ['id_ruangan', 'nama', 'lantai', 'deskripsi', 'ukuran_ruangan'];
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;        
    }, {});

    new assetRuangModel().getRuangan(filtered).then(x => {
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

router.get('/:page?', validator.validate('ruang_get'), validator.verify, (req, res, next) => {
    const allowed = ['id_ruangan', 'nama', 'lantai', 'deskripsi', 'ukuran_ruangan'];
    var perPage = 5 ;
    var page = req.params.page || 1;
    var start = (page > 1) ? (page * perPage) - perPage : 0; 
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;        
    }, {});

    new assetRuangModel().getRuangan(filtered, perPage, start).then(x => {
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

router.post('/', validator.validate('ruang_post'), validator.verify, (req, res, next) => {
    const allowed = ['nama', 'lantai', 'deskripsi', 'ukuran_ruangan'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;           
    }, {})

    new assetRuangModel().postRuangan(filtered).then(x => {
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
 
router.patch('/:id_ruangan', validator.validate('ruang_update'), validator.verify, (req, res, next) => {
    var query = {
        id_ruangan: req.params.id_ruangan
    }
    const allowed = ['nama', 'lantai', 'deskripsi', 'ukuran_ruangan'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;           
    }, {})

    new assetRuangModel().updateRuangan(query, filtered).then(x => {
        res.status(201).send({
            message:"Data berhasil di update"
        })
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({
            message:"Error pada data"
        })
    })
})    

router.delete('/:id_ruangan', validator.validate('ruang_update'), validator.verify, (req, res, next) => {
    var query = {
        id_ruangan: req.params.id_ruangan
    }
    new assetRuangModel().updateRuangan(query, {soft_delete:1}).then(x => {
        res.status(201).send({
            message:"Data berhasil di delete"
        })
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({
            message:"Error pada data"
        })
    })
})   


module.exports = router;