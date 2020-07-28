const {Op, Model, DataTypes, Sequelize} = require('sequelize');
const connString = require('../../includes/connString');
const sequelize = new Sequelize(connString.assets);

const PeminjamanAlokasi = sequelize.define('PeminjamanAlokasi', {
    id_peminjaman_alokasi : {
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    id_peminjaman : {
        type:DataTypes.UUID,
        allowNull:false
    },
    id_alokasi : {
        type:DataTypes.UUID,
        allowNull:false
    },
    tgl_pengembalian : {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    sequelize,
    tableName:'peminjaman_alokasi',
    timestamps:false
})

class PeminjamanAlokModel {
    getPeminjamanAlok(where={}, limit, offset){
        return PeminjamanAlokasi.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    postDataPeminjamanAlok(data){
        return PeminjamanAlokasi.create(data, {
            fields: ['id_peminjaman', 'id_alokasi', 'tgl_pengembalian', 'status']
        })
    }
    updateDataPeminjamanAlok(where={}, data){
        return PeminjamanAlokasi.update(data,
            {
                where:where
            })
    }

}

module.exports = PeminjamanAlokModel;