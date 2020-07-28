const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'peminjamanAlok_get':{
            return [
                query('id_peminjaman_alokasi').optional(),
                query('id_peminjaman').optional(),
                query('id_alokasi').optional(),
                query('tgl_pengembalian').optional(),
                query('status').optional()
            ]
        }
        case 'peminjamanAlok_post':{
            return [                
                body('id_peminjaman').notEmpty().withMessage('ID Peminjaman harus diinput').isUUID().withMessage('ID Peminjaman harus UUID'),
                body('id_alokasi').notEmpty().withMessage('ID Alokasi harus diinput').isUUID().withMessage('ID Alokasi harus UUID'),
                body('tgl_pengembalian').notEmpty().withMessage('Tgl Pengembalian harus diinput').isDate().withMessage('Tgl Pengembalian harus berupa DATE'),
                body('status').notEmpty().withMessage('Status harus diinput').isInt().withMessage('Status harus INTEGER')
            ]
        }
        case 'peminjamanAlok_update':{
            return [
                param('id_peminjaman_alokasi').notEmpty().withMessage('Harus mengirim ID Peminjaman Alokasi').isUUID().withMessage('ID Merk harus UUID')
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