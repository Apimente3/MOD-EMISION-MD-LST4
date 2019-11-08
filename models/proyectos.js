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
        codigo: {
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
        },
        fech_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        pmd: {
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
