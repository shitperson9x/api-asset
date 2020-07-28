const express = require('express');
const router = express.Router();
const validator = require('./supplierValidator');
const SupplierModel = require('./supplierModel');

router.get('/', (req, res, next) => {
    const allowed = ['id_supplier', 'nama'];
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})
    new SupplierModel().getSupplier(filtered).then(x => {
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
    const allowed = ['id_supplier', 'nama'];
    var perPage = 5 ;
    var page = req.params.page || 1;
    var start = (page > 1) ? (page * perPage) - perPage : 0; 
    const filtered = Object.keys(req.query)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.query[key];
        return obj;
    }, {})
    new SupplierModel().getSupplier(filtered, perPage, start).then(x => {
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

router.post('/', validator.validate('supplier_post'), validator.verify, (req, res, next) => {
    const allowed = ['nama'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new SupplierModel().postDataSupplier(filtered).then(x => {
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

router.patch('/:id_supplier', validator.validate('supplier_update'), validator.verify, (req, res, next) =>{
    var query = {
        id_supplier: req.params.id_supplier
    };
    const allowed = ['nama'];
    const filtered = Object.keys(req.body)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {})

    new SupplierModel().updateSupplier(query, filtered).then(x => {
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

router.delete('/:id_supplier', validator.validate('supplier_update'), validator.verify, (req, res, next) =>{
    var query = {
        id_supplier: req.params.id_supplier
    };
    new SupplierModel().updateSupplier(query, {soft_delete:1}).then(x => {
        res.status(201).send({
            message:"Data berhasil didelete"
        })
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({
            message:"Error pada data"
        })
    })
})

module.exports = router;