
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('entidades_consulta', {
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
        tableName: 'entidades_consulta',
        schema: "pred"
    });
};
