const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'stok_post':{
            return [     
                body('kode_stok').notEmpty().withMessage('Kode Stok harus diinput'),
                body('id_barang').notEmpty().withMessage('ID Barang harus diinput').isUUID().withMessage('ID Barang harus UUID'),
                body('tgl_serah_terima').notEmpty().withMessage('Tgl Serah Terima harus diinput').isDate().withMessage('Tgl Serah Terima harus berupa DATE'),
                body('attachment').notEmpty().withMessage('Attachment harus diinput'),
                body('jumlah').notEmpty().withMessage('Jumlah harus diinput').isInt().withMessage('Jumlah harus berupa INTEGER'),
                body('id_vendor').notEmpty().withMessage('ID Vendor harus diinput').isUUID().withMessage('ID Vendor harus UUID'),
                body('tgl_kontrak').notEmpty().withMessage('TGL Kontrak harus diinput').isDate().withMessage('Tgl Kontrak harus berupa DATE'),
                body('no_kontrak').notEmpty().withMessage('No Kontrak harus diinput'),
                body('satuan_harga').notEmpty().withMessage('Satuan Harga harus diinput'),
                // body('id_ruangan').optional().isUUID().withMessage('ID Ruangan harus UUID')
            ]
        }
        case 'stok_update':{
            return [
                param('id_stok').notEmpty().withMessage('Harus mengirim ID Stok').isUUID().withMessage('ID Stok harus UUID')
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