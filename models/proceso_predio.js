/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_predio', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    denominacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    plazodias: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'proceso_predio'
  });
};
