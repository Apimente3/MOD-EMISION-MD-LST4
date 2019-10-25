/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipoproyecto', {
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
    tableName: 'tipoproyecto'

      ,
      schema: "pred"
  });
};
