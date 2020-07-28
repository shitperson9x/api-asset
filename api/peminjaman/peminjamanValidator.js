const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'peminjaman_post': {
            return [                             
                body('id_ruangan').optional().isUUID().withMessage('ID Ruangan harus UUID'),                
                body('user_peminjam').notEmpty().withMessage('User Peminjam harus diinput'),
                body('tipe_peminjam').notEmpty().withMessage('Tipe Peminjam harus diinput').isInt().withMessage('Tipe Peminjam harus INTEGER'),
                body('tgl_pinjam').notEmpty().withMessage('Tanggal Pinjam harus diinput').isDate().withMessage('Tgl Pinjam harus berupa DATE'),
                body('tgl_kembali').notEmpty().withMessage('Tanggal Kembali harus diinput').isDate().withMessage('Tgl Kembali harus berupa DATE'),
            ]
        }
        case 'peminjaman_update': {
            return [
                param('id_peminjaman').notEmpty().withMessage('Harus mengirim ID Peminjaman').isUUID().withMessage('ID Peminjaman harus UUID')
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