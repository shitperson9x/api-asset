const {Op, Model, DataTypes, Sequelize} = require('sequelize');
const connString = require('../../includes/connString');
const sequelize = new Sequelize(connString.assets);

const ref_akun = sequelize.define('ref_akun', {
    id : {
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    uraian : {
        type:DataTypes.STRING,
        allowNull:false 
    }
}, {
    sequelize,
    tableName:'ref.akun',
    timestamps:false
})

const ref_alokasiDet = sequelize.define('ref_alokasiDet', {
    id_lokasi_details : {
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    kode_alokasi_details : {
        type:DataTypes.STRING,
        allowNull:false
    },
    nama : {
        type:DataTypes.STRING,
        allowNull:false
    },
    is_required : {
        type:DataTypes.STRING,
        allowNull:false
    },
    id_sub_sub_rincian_objek : {
        type:DataTypes.STRING,
        allowNull:false
    }

}, {
    sequelize,
    tableName:'ref.alokasi_details',
    timestamps:false
})

const ref_jenis = sequelize.define('ref_jenis', {
    id : {
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    mst_id : {
        type:DataTypes.STRING,
        allowNull:false
    },
    uraian : {
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    tableName:'ref.jenis',
    timestamps:false
})

const ref_kelompok = sequelize.define('ref_kelompok', {
    id : {
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    mst_id : {
        type:DataTypes.STRING,
        allowNull:false
    },
    uraian : {
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    tableName:'ref.kelompok',
    timestamps:false
})

const ref_objek = sequelize.define('ref_objek', {
    id : {
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    mst_id : {
        type:DataTypes.STRING,
        allowNull:false
    },
    uraian : {
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    tableName:'ref.objek',
    timestamps:false
})

const ref_rincianObjek = sequelize.define('ref_rincianObjek', {
    id : {
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    mst_id : {
        type:DataTypes.STRING,
        allowNull:false
    },
    uraian : {
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    tableName:'ref.rincian_objek',
    timestamps:false
})

const ref_spesifikasi_det = sequelize.define('ref_spesifikasi_det', {
    id_spesifikasi_details : {
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    kode_spesifikasi_details : {
        type: DataTypes.STRING,
        allowNull:false
    },
    nama : {
        type: DataTypes.STRING,
        allowNull:false
    },
    is_required : {
        type:DataTypes.STRING,
        allowNull:false
    },
    id_sub_sub_rincian_objek : {
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    tableName:'ref.spesifikasi_details',
    timestamps:false
})

const ref_subrincianObjek = sequelize.define('ref_subrincianObjek', {
    id : {
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    mst_id : {
        type:DataTypes.STRING,
        allowNull:false
    },
    uraian : {
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    tableName:'ref.sub_rincian_objek',
    timestamps:false
})

const ref_sub_subrincianObjek = sequelize.define('ref_sub_subrincianObjek', {
    id : {
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    mst_id : {
        type:DataTypes.STRING,
        allowNull:false
    },
    uraian : {
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    tableName:'ref.sub_sub_rincian_objek',
    timestamps:false
})

class ReferensiModel {
    getRef_akun(where={}, limit, offset){
        return ref_akun.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    getRef_alokasiDet(where={}, limit, offset){
        return ref_alokasiDet.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    getRef_jenis(where={}, limit, offset){
        return ref_jenis.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    getRef_kelompok(where={}, limit, offset){
        return ref_kelompok.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    getRef_objek(where={}, limit, offset){
        return ref_objek.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    getRef_rinc_objek(where={}, limit, offset){
        return ref_rincianObjek.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    getRef_spek_det(where={}, limit, offset){
        return ref_spesifikasi_det.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    getRef_subrinc_objek(where={}, limit, offset){
        return ref_subrincianObjek.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
    getRef_sub_subrinc_objek(where={}, limit, offset){
        return ref_sub_subrincianObjek.findAndCountAll({
            where:where,
            limit:limit,
            offset:offset
        }, sequelize);
    }
}

module.exports = ReferensiModel;