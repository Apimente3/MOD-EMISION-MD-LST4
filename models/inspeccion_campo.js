/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('inspeccion_campo', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        solicitud_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }, 
        proyecto_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        objetivo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        actividades: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        apoyo_equipo_tec: {
            type: DataTypes.STRING,
            allowNull: true
        },
        informe_inspeccion: {
            type: DataTypes.STRING,
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
        tableName: 'inspeccion_campo',
        schema:'pred'
        
    });
};
