/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('solicituds', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            tipoproy_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            tipodocumento_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            contrato: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fase_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            tipoinfra_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            organosolictante_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
            , organosolicitante: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fechadocumento: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            responsable_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            brigada_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            fechasignacion: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            observaciones: {
                type: DataTypes.STRING,
                allowNull: true
            },
            filesave: {
                type: DataTypes.STRING,
                allowNull: true
            },
            originalname: {
                type: DataTypes.STRING,
                allowNull: true
            },
            contrato_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            usuaregistra_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            geometria_json: {
                type: DataTypes.JSONB,
                allowNull: true
            },
            geometria: {
                type: DataTypes.GEOMETRY,
                allowNull: true
            },
            denominacion: {
                type: DataTypes.STRING,
                allowNull: true
            },
            asunto: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }
        , {
            tableName: 'solicituds',
            schema: "pred"
        }
    );
};
