const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'ruang_post':{
            return [                
                body('nama').notEmpty().withMessage('Nama harus diinput'),
                body('lantai').notEmpty().withMessage('Lantai harus diisi').isInt().withMessage('Lantai harus Integer'),
                body('deskripsi').notEmpty().withMessage('Deskripsi harus diisi'),
                body('ukuran_ruangan').notEmpty().withMessage('Ukuran Ruangan harus diisi')
            ]
        }

        case 'ruang_delete':{
            return [
                param('id_ruangan').notEmpty().withMessage('Harus mengirim id ruangan').isUUID().withMessage('ID Ruangan harus UUID')
            ]
        }
        case 'ruang_get':{
            return [
                query('nama').optional(),
                query('lantai').optional(),
                query('deskripsi').optional(),
                query('ukuran_ruangan').optional()
            ]
        }
        case 'ruang_update':{
            return [
                param('id_ruangan').notEmpty().withMessage('Harus mengirim id ruangan').isUUID().withMessage('ID Ruangan harus UUID')
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