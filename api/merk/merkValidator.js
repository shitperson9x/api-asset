const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'merk_get':{
            return [
                query('id_merk').optional(),
                query('nama').optional()
            ]
        }
        case 'merk_post':{
            return [        
                body('nama').notEmpty().withMessage('Nama harus diinput')
            ]
        }
        case 'merk_delete':{
            return [
                param('id_merk').notEmpty().withMessage('Harus mengirim ID Merk').isUUID().withMessage('ID Merk harus UUID')
            ]
        }
        case 'merk_update':{
            return [
                param('id_merk').notEmpty().withMessage('Harus mengirim ID Merk').isUUID().withMessage('ID Merk harus UUID')
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