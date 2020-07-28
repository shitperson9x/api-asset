const {Op, Model, DataTypes, Sequelize, where} = require('sequelize');
const connString = require('../../includes/connString');
const sequelize = new Sequelize(connString.assets);

const AssetBarang = sequelize.define('AssetBarang', {
    id_barang:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    kode_barang:{
        type:DataTypes.STRING,
        allowNull:true
    },
    nama:{
        type:DataTypes.STRING,
        allowNull:false
    },
    // id_kategori:{
    //     type:DataTypes.UUID,
    //     allowNull:false
    // },
    id_merk:{
        type:DataTypes.UUID,
        allowNull:false
    },
    spesifikasi:{
        type:DataTypes.JSON,
        allowNull:false
    },
    id_supplier:{
        type:DataTypes.UUID,
        allowNull:false
    },
    attachment:{
        type:DataTypes.JSON,
        allowNull:false
    },
    // id_referensi:{
    //     type:DataTypes.UUID,
    //     allowNull:false
    // },
    id_sub_sub_rincian_objek:{
        type:DataTypes.STRING,
        allowNull:false
    },
    soft_delete : {
        type:DataTypes.INTEGER,
        allowNull:true       
    }
},{
    sequelize,
    tableName:"barang"
});

class BarangModel{
    getBarang(where={}, limit, offset){
        return AssetBarang.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        },sequelize)
    }
    postDataBarang(data) {
        return AssetBarang.create(data, {
            fields:['kode_barang','nama', 'id_kategori', 'id_merk', 'spesifikasi', 'id_supplier', 'attachment', 'id_referensi', 'id_sub_sub_rincian_objek']
        })
    }
    updateBarang(where = {}, data){
        return AssetBarang.update(data,
            {
                where:where
            })
    }
}

module.exports = BarangModel;