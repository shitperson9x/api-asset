const {Op, Model, DataTypes, Sequelize} = require('sequelize');
const connString = require('../../includes/connString');
const { off } = require('../../app');
const sequelize = new Sequelize(connString.assets);

const AssetRuang = sequelize.define('AssetRuang', {
    id_ruangan : {
        type:DataTypes.UUID,
        allowNull:true,
        primaryKey:true
    },
    nama : {
        type:DataTypes.STRING,
        allowNull:false
    },
    lantai : {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    deskripsi : {
        type:DataTypes.TEXT,
        allowNull:false
    },
    ukuran_ruangan : {
        type:DataTypes.STRING,
        allowNull:false
    },
    soft_delete : {
        type:DataTypes.INTEGER,
        allowNull:true       
    }

},{
    sequelize,
    tableName:"ruangan"
})

class RuangModel {
    getRuangan(where = {}, limit, offset){
        return AssetRuang.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        },sequelize)
    }
    postRuangan(data){
        return AssetRuang.create(data, {
            fields:['nama', 'lantai', 'deskripsi', 'ukuran_ruangan']
        });
    }
    deleteRuangan(where = {}) {
        return AssetRuang.destroy({
            where:where
        })
    }
    updateRuangan (where = {}, data) {
        return AssetRuang.update(data,{
            where:where
        })
    }
}

module.exports = RuangModel;