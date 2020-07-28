const express = require('express');
const router = express.Router();
const validator = require('./alokasiValidator');
const alokasiModel = require('./alokasiModel');

router.get('/', (req, res, next) => {
    const allowed = ['id_alokasi', 'kode_alokasi', 'id_stok', 'details', 'id_ruangan'];
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})
    new alokasiModel().getAlokasi(filtered).then(x => {
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

router.get('/:page?', (req, res, next) => {
    const allowed = ['id_alokasi', 'kode_alokasi', 'id_stok', 'details', 'id_ruangan'];
    var perPage = 5 ;
    var page = req.params.page || 1;
    var start = (page > 1) ? (page * perPage) - perPage : 0; 
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})
    new alokasiModel().getAlokasi(filtered, perPage, start).then(x => {
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

router.delete('/:id_alokasi', (req, res, next) => {
    var query = {
        id_alokasi: req.params.id_alokasi
    }
    new alokasiModel().updateDataAlokasi(query, {soft_delete:1}).then(x => {
        res.status(201).send({
            message:'Sukses Delete Data'
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                message:"Error pada data"
            })
        })
    })
})


   

// router.post('/', validator.validate('alokasi_post'), validator.verify, (req, res, next) => {
//     const allowed = ['kode_alokasi', 'id_stok', 'details'];
//     const filtered = Object.keys(req.body)
//     .filter(key => allowed.includes(key))
//     .reduce((obj, key) => {
//         obj[key] = req.body[key];
//         return obj;
//     }, {})

//     new alokasiModel().postDataAlokasi(filtered).then(x => {
//         res.status(200).send({
//             message:"Data berhasil diinput"
//         })
//     }).catch((err)=> {
//         console.log(err);
//         res.status(500).send({
//             message:"Error pada data"
//         })
//     })
// });

module.exports = router;