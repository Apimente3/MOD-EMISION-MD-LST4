/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('datos_predio', {
        predio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        tipopredio_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        zonificacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        usoactual: {
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
        tableName: 'datos_predio',
        schema:'pred'
    });
};
