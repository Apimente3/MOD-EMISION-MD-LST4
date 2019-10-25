/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ubicacion_predio', {
        predio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ubigeo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        departamento: {
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
        unidad_catastral: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sector: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tipovia: {
            type: DataTypes.STRING,
            allowNull: true
        },
        via: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cuadra: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nro: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tipourbanizacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        urbanizacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        manzana: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lote: {
            type: DataTypes.STRING,
            allowNull: true
        },
        km: {
            type: DataTypes.STRING,
            allowNull: true
        },
        centro_poblado: {
            type: DataTypes.STRING,
            allowNull: true
        },
        valle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referencia: {
            type: DataTypes.STRING,
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
        tableName: 'ubicacion_predio',
        schema:'pred'
    });
};
