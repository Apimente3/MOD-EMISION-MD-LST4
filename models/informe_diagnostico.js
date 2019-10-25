/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('informe_diagnostico', {
        solicitud_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        informe_path: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fecha_entrega: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        files: {
            type: DataTypes.JSONB,
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
        tableName: 'informe_diagnostico',
        schema:'pred'
    });
};
