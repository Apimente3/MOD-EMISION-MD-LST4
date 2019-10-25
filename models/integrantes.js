/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('integrantes', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        equipo_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tipointegrante_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        integrante_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        usuareg_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'integrantes',
        schema: "pred"
    });
};
