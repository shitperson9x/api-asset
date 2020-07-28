const {Op, Model, DataTypes, Sequelize, where} = require('sequelize');
const connString = require('../../includes/connString');
const { off } = require('../../app');
const sequelize = new Sequelize(connString.assets);

const supplier = sequelize.define('supplier', {
    id_supplier : {
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    nama : {
        type:DataTypes.STRING,
        allowNull:false
    },
    soft_delete : {
        type:DataTypes.INTEGER,
        allowNull:true       
    }
},{
    sequelize,
    tableName:"supplier",
    timestamps:false
});

class SupplierModel{
    getSupplier(where={}, limit, offset){
        return supplier.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        },sequelize)
    }
    postDataSupplier(data) {
        return supplier.create(data, {
            fields: ['nama']
        })
    }
    updateSupplier(where = {}, data){
        return supplier.update(data,
            {
                where:where
            })
    }
}

module.exports = SupplierModel;