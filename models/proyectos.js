/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('proyectos', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_infraestructura_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }, 
        tipo_documento_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        responsable_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        brigada_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: true
        },

        url_ortofoto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        organo_solicitante: {
            type: DataTypes.STRING,
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        concesion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fech_inicio: {
            type: DataTypes.DATE,
            allowNull: true
        },  fech_inicio: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fech_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fech_asig_brigada: {
            type: DataTypes.DATE,
            allowNull: true
        },
        pmd: {
            type: DataTypes.STRING,
            allowNull: true
        },
        portada_imagen: {
            type: DataTypes.STRING,
            allowNull: true
        },
        portada_imagen2: {
            type: DataTypes.STRING,
            allowNull: true
        },

        portada_imagen3: {
            type: DataTypes.STRING,
            allowNull: true
        },


        departamento: {
            type: DataTypes.STRING,
            allowNull: true
        },  codigo_geotupu: {
            type: DataTypes.STRING,
            allowNull: true
        },
        provincia: {
            type: DataTypes.STRING,
            allowNull: true
        },
        distrito: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        observacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        imagenes: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        archivos: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        polygono: {
            type: DataTypes.GEOMETRY,
            allowNull: true
        },
        polygonojson: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        usuaregistra_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'proyectos',
        schema:'pred'
    });
};
