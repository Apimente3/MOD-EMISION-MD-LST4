/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rol_ddp', {
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
    tableName: 'rol_ddp'
  });
};
