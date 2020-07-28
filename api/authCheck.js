var jwt = require('jsonwebtoken');
var key = require('../includes/key');
const {query, body, param, validationResult, header} = require('express-validator');

exports.checktoken = (req, res, next) => {
    var headers = req.headers;
    console.log(req.headers);
    if(typeof headers['authorization']!=='undefined' && headers['authorization'].search("token=")>-1){
        jwt.verify(headers['authorization'].split(";")[0].replace("token=", ""), key.token, (err, decoded)=>{
            if(!err){
                console.log(decoded);
                req.user_data=decoded.data;
                return next();
            }else{
                // return next(err);
                res.status(401).send({message:'Not Authorized'})
            }
        });
    }else{
        res.status(400).send({
            message:"Token Required"
        })
    }
}

exports.generateToken = (data)=>{
    return jwt.sign(data, key.token);
}


// var jwt = require('jsonwebtoken');
// var key = require('../includes/key');
// const {query, body, param, validationResult, header} = require('express-validator');

// exports.checktokenAdmin = (req, res, next) => {
//     var headers = req.headers;
//     console.log(req.headers);
//     if(typeof headers['authorization']!=='undefined' && headers['authorization'].search("token=")>-1){
//         jwt.verify(headers['authorization'].split(";")[0].replace("token=", ""), key.tokenAdmin, (err, decoded)=>{
//             if(!err){
//                 console.log(decoded);
//                 req.user_data=decoded.data;
//                 return next();
//             }else{
//                 // return next(err);
//                 res.status(401).send({message:'Not Authorized'})
//             }
//         });
//     }else{
//         res.status(400).send({
//             message:"Token Required"
//         })
//     }
// }

// exports.checktokenUser = (req, res, next) => {
//     var headers = req.headers;
//     console.log(req.headers);
//     if(typeof headers['authorization']!=='undefined' && headers['authorization'].search("token=")>-1){
//         jwt.verify(headers['authorization'].split(";")[0].replace("token=", ""), key.token, (err, decoded)=>{
//             if(!err){
//                 console.log(decoded);
//                 req.user_data=decoded.data;
//                 return next();
//             }else{
//                 // return next(err);
//                 res.status(401).send({message:'Not Authorized'})
//             }
//         });
//     }else{
//         res.status(400).send({
//             message:"Token Required"
//         })
//     }
// }

// exports.generateToken = (data)=>{
//     return jwt.sign(data, key.token);
// }

// exports.generateTokenAdmin = (data)=>{
//     return jwt.sign(data, key.tokenAdmin);
// }


