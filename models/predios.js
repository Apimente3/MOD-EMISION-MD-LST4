/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('predios', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fech_inicio_proc: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fech_fin_proc: {
            type: DataTypes.DATE,
            allowNull: true
        },
        estado_predio_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        solicitud_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        files: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        polygono_inicial: {
            type: DataTypes.GEOMETRY,
            allowNull: true
        },
        polygono_afectado: {
            type: DataTypes.GEOMETRY,
            allowNull: true
        },
        proceso_actual: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '0'
        },
        usuaregistra_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'predios',
        schema:'pred'
    });
};
