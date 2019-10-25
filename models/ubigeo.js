/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ubigeo', {
        ubigeo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        distrito: {
            type: DataTypes.STRING,
            allowNull: true
        },
        provincia: {
            type: DataTypes.STRING,
            allowNull: true
        },
        departamento: {
            type: DataTypes.STRING,
            allowNull: true
        },
        poblacion: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        superficie: {
            type: DataTypes.STRING,
            allowNull: true
        },
        y: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        x: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    }, {
        tableName: 'ubigeo',
        schema:'pred'
    });
};
