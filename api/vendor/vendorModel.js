const {Op, Model, DataTypes, Sequelize, where} = require('sequelize');
const connString = require('../../includes/connString');
const sequelize = new Sequelize(connString.assets);

const Vendor = sequelize.define('Vendor', {
    id_vendor: {
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    nama: {
        type:DataTypes.STRING,
        allowNull:false
    },
    soft_delete : {
        type:DataTypes.INTEGER,
        allowNull:true       
    }
},{
    sequelize,
    tableName:"vendor",
    timestamps:false
});

class VendorModel{
    getVendor(where={}, limit, offset){
        return Vendor.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        },sequelize)
    }
    postDataVendor(data) {
        return Vendor.create(data, {
            fields: ['nama']
        })
    }
    updateDataVendor(where = {}, data){
        return Vendor.update(data,
            {
                where:where
            })
    }
}

module.exports = VendorModel;