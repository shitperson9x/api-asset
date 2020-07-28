const {Op, Model, DataTypes, Sequelize} = require('sequelize');
const connString = require('../../includes/connString');
const { off } = require('../../app');
const sequelize = new Sequelize(connString.assets);

const Merk_Model = sequelize.define('Merk_Model', {
    id_merk : {
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    nama : {
        type:DataTypes.UUID,
        allowNull:false
    },
    soft_delete : {
        type:DataTypes.INTEGER,
        allowNull:true       
    }
}, {
    sequelize,
    tableName:'merk',
    timestamps:false
})

class MerkModel {
    getMerk(where={}, limit, offset){
        return Merk_Model.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    postDataMerk(data){
        return Merk_Model.create(data, {
            fields: ['nama']
        })
    }
    updateDataMerk(where={}, data){
        return Merk_Model.update(data,
            {
                where:where
            })
    }

}

module.exports = MerkModel;