/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('condicion_propietario', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        denominacion: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'condicion_propietario',schema:'pred', timestamps: false
    });
};
