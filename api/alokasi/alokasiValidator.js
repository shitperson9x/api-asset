const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'alokasi_post':{
            return [
                body('id_stok').notEmpty().withMessage('ID Stok harus diinput'),
                body('details').optional().isJSON().withMessage('Details harus berupa JSON')
            ]
        }
        case 'alokasi_update':{
            return [
                param('id_alokasi').notEmpty().withMessage('Harus mengirim ID Alokasi').isUUID().withMessage('ID Alokasi harus UUID')
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