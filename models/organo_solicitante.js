module.exports = function (sequelize, DataTypes) {
    return sequelize.define('organo_solicitante', {
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
        timestamps: false,
        tableName: 'organo_solicitante',
        schema: 'pred'
    });
};
