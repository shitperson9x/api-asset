//Lib
const express = require('express');
const router = express.Router();
const auth = require('./authCheck');
const connString = require('../includes/connString');
const url_db = connString.assets;
const Sequelize = require('sequelize');
const { route } = require('./merk/merk');
const sequelize = new Sequelize(url_db) 
//exports

router.use('/alokasi', auth.checktoken, (req, res, next) => {
    next();
})
router.use('/barang',auth.checktoken, (req, res, next)=>{
    next();
});
router.use('/ruang', auth.checktoken, (req, res, next)=>{
    next();
});
router.use('/peminjaman',auth.checktoken, (req, res, next)=>{
    next();
});
router.use('/peminjamanAlok', auth.checktoken, (req, res, next) => {
    next();
})
router.use('/merk', auth.checktoken, (req, res, next)=>{
    next();
});
router.use('/stok', auth.checktoken, (req, res, next) => {
    next();
})
router.use('/tipepeminjam', auth.checktoken, (req, res, next)=>{
    next();
});
router.use('/supplier',auth.checktoken, (req, res, next)=>{
    next();
});
router.use('/vendor', auth.checktoken, (req, res, next)=>{
    next();
});

// router.use('/user', auth.checktokenUser, (req, res, next)=>{
//     next();
// })

// router.use('/admin', auth.checktokenAdmin, (req, res, next)=>{
//     next();
// })

router.get('/', (req, res, next) => {
    res.send('Cek')
})
router.get('/testdb',async (req, res, next)=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

router.get('/login',(req,res,next) => {
    res.send({
        //token:auth.generateTokenAdmin({username:'dhani_juniarso@tikomdik.id',password:'admin', hakAkses:'admin'}),
        tokenUser:auth.generateToken({username:'riski_juliansyah@tikomdik.id', password:'user', hakAkses:'user'})
    });
});

module.exports = router;