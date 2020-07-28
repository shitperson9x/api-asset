const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const logging = require('morgan');
const fileupload = require('express-fileupload');
connString = require('./includes/connString');
const Sequelize = require('sequelize');
const app = express();

const routerIndex = require('./api/index');
const fileUpload = require('express-fileupload');
const routerAlokasi = require('./api/alokasi/alokasi');
const routerBarang = require('./api/assetBarang/assetBarang');
const routerRuang = require('./api/assetRuang/assetRuang');
const routerPeminjaman = require('./api/peminjaman/peminjaman');
const routerPeminjamanAlokasi = require('./api/peminjamanAlokasi/peminjamanAlokasi');
const routerMerk = require('./api/merk/merk');
const routerReferensi = require('./api/referensi/referensi');
const routerStok = require('./api/stok/stok');
const routerTipe_Peminjam = require('./api/tipe_peminjam/tipe_peminjam');
const routerSupplier = require('./api/supplier/supplier');
const routerVendor = require('./api/vendor/vendor');

//Body-Parser using for catching body parser (just in case needed)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({createParentPath: true}));

const sequelize = new Sequelize(connString.assets) 

/**Log system
 * log will sending to the file,
 * so admin can access directly to the file
 * temporary hardcoded for folder 
 */
const path = './api/logapi';
const fileName = '/access.log';
try {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
} catch (err) {
    console.error(err);
}
var writeFile = fs.createWriteStream(path + fileName, { flags: 'a' });
app.use(logging('combined', { stream: writeFile }));

/**CORS Avoidance.
 * Asterisk symbol(*) on Access-Control-Allow-Origin
 * should be replace with url for security issue.
 * Only GET, POST, PATCH, DELETE method for now,
 * can add with PUT or others for further.
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'
        );
        return res.status(200).json({});
    }
    next();
});

/**route which should handle
 * Add route in here
 */
app.use('/', routerIndex);
app.use('/alokasi', routerAlokasi);
app.use('/barang', routerBarang);
app.use('/ruang', routerRuang);
app.use('/peminjaman', routerPeminjaman);
app.use('/peminjamanAlok', routerPeminjamanAlokasi);
app.use('/merk', routerMerk);
app.use('/referensi', routerReferensi);
app.use('/stok', routerStok);
app.use('/tipepeminjam', routerTipe_Peminjam);
app.use('/supplier', routerSupplier);
app.use('/vendor', routerVendor);


// app.use('/', routerIndex);
// app.use('/admin/alokasi', routerAlokasi);
// app.use('/admin/barang', routerBarang);
// app.use('/user/ruang', routerRuang);
// app.use('/user/peminjaman', routerPeminjaman);
// app.use('/peminjamanAlok', routerPeminjamanAlokasi);
// app.use('/merk', routerMerk);
// app.use('/stok', routerStok);
// app.use('/tipepeminjam', routerTipe_Peminjam);
// app.use('/supplier', routerSupplier);
// app.use('/vendor', routerVendor);

//Handling incorrect url & db con error
app.use((req, res, next) => {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

//module.exports
module.exports = app;