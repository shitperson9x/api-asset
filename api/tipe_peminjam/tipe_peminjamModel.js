const {Op, Model, DataTypes, Sequelize, where} = require('sequelize');
const connString = require('../../includes/connString');
const sequelize = new Sequelize(connString.assets);

const tipe_peminjam = sequelize.define('tipe_peminjam', {
    id_tipe : {
        type :DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    nama : {
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    tableName:"tipe_peminjam",
    timestamps:false,
    schema:'ref'
});

class tipePeminjam{
    getTipe_Peminjam(where={}, limit, offset){
        return tipe_peminjam.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        },sequelize)
    }  
    postTipe_Peminjam(data) {
        return tipe_peminjam.create(data, {
            fields: ['nama']
        })
    }
    updateTipe_Peminjam(where = {}, data){
        return tipe_peminjam.update(data,
            {
                where:where
            })
    }
}

module.exports = tipePeminjam;