/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('proyecto_solicitud', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        proyecto_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        solicitud_id: {
            type: DataTypes.INTEGER,
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
        tableName: 'proyecto_solicitud',
        schema:'pred'
    });
};
