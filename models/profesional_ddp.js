/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('profesional_ddp', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: true
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telefonos: {
            type: DataTypes.STRING,
            allowNull: true
        },

        fech_vigencia: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rol: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        contrasenia: {
            type: DataTypes.STRING,
            allowNull: true
        },
        correopersonal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nroscontacto: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'profesional_ddp',
        schema: "pred"
    });
};
