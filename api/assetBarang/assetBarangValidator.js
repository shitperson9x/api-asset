const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'barang_post':{
            return [
                body('nama').notEmpty().withMessage('Nama harus diinput'),
                // body('id_kategori').notEmpty().withMessage('ID Kategori harus diinput').isUUID().withMessage('ID Kategori harus UUID'),
                body('id_merk').notEmpty().withMessage('ID Merk harus diinput').isUUID().withMessage('ID Merk harus UUID'),
                body('spesifikasi').notEmpty().withMessage('Spesifikasi harus diinput'),
                body('id_supplier').notEmpty().withMessage('ID Supplier harus diinput').isUUID().withMessage('ID Supplier harus UUID'),
                body('attachment').optional(),
                // body('id_referensi').notEmpty().withMessage('ID Referensi harus diinput').isUUID().withMessage('ID Referensi harus UUID')
            ]
        }
        case 'barang_delete':{
            return [
                param('id_barang').notEmpty().withMessage('Harus mengirim ID Barang').isUUID().withMessage('ID Barang harus UUID')
            ]
        }
        case 'barang_update':{
            return [
                param('id_barang').notEmpty().withMessage('Harus mengirim ID Barang').isUUID().withMessage('ID Barang harus UUID')
            ]
        }
        case 'barang_get':{
            return [
                query('id_barang').optional(),
                query('nama').optional(),
                query('id_kategori').optional(),
                query('id_merk').optional(),
                query('spesifikasi').optional(),
                query('id_supplier').optional(),
                query('attachment').optional(),
                query('id_referensi').optional()
            ]
        }
    }
    
}

exports.verify = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({
                errors:errors.array()
            })
            return;
        }else{
            return next();
        }
    }catch(err){
        return next(err);
    }
}