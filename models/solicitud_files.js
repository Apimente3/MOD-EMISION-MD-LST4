/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('solicitud_files', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: true
        },
        path: {
            type: DataTypes.STRING,
            allowNull: true
        },
        denominacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        usuareg_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'solicitud_files'
    });
};
