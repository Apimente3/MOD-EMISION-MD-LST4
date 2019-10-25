/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('propietarios', {
        predio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        tipo_propietario_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        condicion_propietario_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fecha_propiedad: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        integrantes: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        representante: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        files_acreditan: {
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
        tableName: 'propietarios',
        schema:'pred'
    });
};
