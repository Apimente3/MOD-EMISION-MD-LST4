/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('consulta_entidades', {
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
        institucion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        entidad_consulta_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        entidad_consulta: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fecha_envio_oficio: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        fecha_respuesta_oficio: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        doc_envio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        doc_respuesta: {
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
        tableName: 'consulta_entidades',
        schema: "pred"
    });
};
