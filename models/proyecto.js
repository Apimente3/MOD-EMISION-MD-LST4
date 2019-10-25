/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proyecto', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    con_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'concesion',
        key: 'id'
      }
    },
    denominacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    distrito: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'proyecto'
  });
};
