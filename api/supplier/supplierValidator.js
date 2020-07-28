const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'supplier_post':{
            return [              
              body('nama').notEmpty().withMessage('Nama harus diinput')
            ]
        }    
        case 'supplier_update':{
            return [
                param('id_supplier').notEmpty().withMessage('Harus mengirim ID Supplier').isUUID().withMessage('ID Supplier harus UUID')
            ]
        }
        case 'supplier_get':{
            return [
                query('id_supplier').notEmpty().isUUID().optional(),
                query('nama').isUUID().optional()
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