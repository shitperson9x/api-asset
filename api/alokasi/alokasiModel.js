const {Op, Model, DataTypes, Sequelize, where} = require('sequelize');
const connString = require('../../includes/connString');
const sequelize = new Sequelize(connString.assets);

const alokasi = sequelize.define('alokasi', {
    id_alokasi : {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    kode_alokasi : {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_stok : {
        type: DataTypes.UUID,
        allowNull:false
    },
    details : {
        type: DataTypes.JSON,
        allowNull: true
    },
    id_ruangan : {
        type:DataTypes.UUID,
        allowNull:false
    },
    soft_delete : {
        type:DataTypes.INTEGER,
        allowNull:true
    }
},{
    sequelize,
    tableName:"alokasi",
    timestamps:false
});

class AlokasiModel{
    getAlokasi(where={}, limit, offset){
        return alokasi.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        },sequelize)
    }
    postDataAlokasi(data) {
        return alokasi.create(data, {
            fields: ['kode_alokasi', 'id_stok', 'details', 'id_ruangan']
        })
    }
    updateDataAlokasi(where = {}, data){
        return alokasi.update(data,
            {
                where:where
            })
    }
}

module.exports = AlokasiModel;