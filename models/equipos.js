/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('equipos', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        denominacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fech_conformacion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        responsable_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        usuareg_id: {
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
        tableName: 'equipos',
        schema: "pred"
    });
};