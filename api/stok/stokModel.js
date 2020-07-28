const {Op, Model, DataTypes, Sequelize} = require('sequelize');
const connString = require('../../includes/connString');
const { off } = require('../../app');
const sequelize = new Sequelize(connString.assets);

const Stok = sequelize.define('Stok', {
    id_stok : {
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    kode_stok : {
        type:DataTypes.STRING,
        allowNull:false
    },
    id_barang : {
        type:DataTypes.UUID,
        allowNull: false
    },
    tgl_serah_terima : {
        type: DataTypes.DATE,
        allowNull:false        
    },
    attachment : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    jumlah : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_vendor : {
        type: DataTypes.UUID,
        allowNull: false
    },
    tgl_kontrak : {
        type: DataTypes.DATE,
        allowNull: false
    },
    no_kontrak : {
        type: DataTypes.STRING,
        allowNull: false
    },
    satuan_harga : {
        type: DataTypes.STRING,
        allowNull: false
    },
    // id_ruangan : {
    //     type: DataTypes.UUID,
    //     allowNull: true
    // },
    soft_delete : {
        type:DataTypes.INTEGER,
        allowNull:true       
    }
}, {
    sequelize,
    tableName:'stok',
    timestamps:false
})

class StokModel {
    getStok(where={}, limit, offset){
        return Stok.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    postDataStok(data){
        return Stok.create(data, {
            fields: ['kode_stok', 'id_barang', 'tgl_serah_terima', 'attachment', 'jumlah', 'id_vendor', 'tgl_kontrak', 'no_kontrak', 'satuan_harga']
        })
    }
    updateDataStok(where={}, data){
        return Stok.update(data,
            {
                where:where
            })
    }

}

module.exports = StokModel;