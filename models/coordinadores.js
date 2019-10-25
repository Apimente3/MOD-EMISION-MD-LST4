/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('coordinadores', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    profesional_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profesional_ddp',
        key: 'id'
      }
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proyecto',
        key: 'id'
      }
    },
    fecha_reg: {
      type: DataTypes.DATE,
      allowNull: true
    },
    profesionalreg_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'coordinadores'
  });
};
