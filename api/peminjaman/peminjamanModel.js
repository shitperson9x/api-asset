const {Op, Model, DataTypes, Sequelize, where} = require('sequelize');
const connString = require('../../includes/connString');
const sequelize = new Sequelize(connString.assets);

const peminjaman = sequelize.define('peminjaman', {
    id_peminjaman : {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey:true
    },
    id_ruangan : {
        type: DataTypes.UUID,
        allowNull: true
    },
    user_peminjam : {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipe_peminjam : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tgl_pinjam : {
        type: DataTypes.DATE,
        allowNull: false
    },
    tgl_kembali : {
        type: DataTypes.DATE,
        allowNull: false
    },
    soft_delete : {
        type:DataTypes.INTEGER,
        allowNull:true       
    }
},{
    sequelize,
    tableName: 'peminjaman',
    timestamps:false
})


class Peminjaman {
    getPeminjaman (where = {}, limit, offset)  {
        return peminjaman.findAndCountAll({
            where: where,
            limit:limit,
            offset:offset
        }, sequelize)
    }

    postPeminjaman (data) {
        return peminjaman.create(data, {
            fields: ['id_ruangan', 'user_peminjam', 'tipe_peminjam', 'tgl_pinjam', 'tgl_kembali']
        })
    }
    updatePeminjaman ( where = {}, data){
        return peminjaman.update(data,
            {
                where:where
            })
    }
    
}

module.exports = Peminjaman;