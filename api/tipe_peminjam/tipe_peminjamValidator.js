const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'tipe_peminjam_get':{
            return [
                query('id_tipe').notEmpty().isUUID().optional(),
                query('nama').notEmpty().optional()
            ]
        }
        case 'tipe_peminjam_post': {
            return [                
                body('nama').notEmpty().withMessage('Nama harus diinput')
            ]
        }
        case 'tipe_peminjam_update':{
            return [
                param('id_tipe').notEmpty().withMessage('Harus mengirim ID Tipe')
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