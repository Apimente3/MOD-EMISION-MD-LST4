/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('brigadas', {
    predio_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'predios',
        key: 'id'
      }
    },
    fech_conformacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    coordinador_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'coordinadores',
        key: 'id'
      }
    },
    profesional_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'profesional_ddp',
        key: 'id'
      }
    }
  }, {
    tableName: 'brigadas'
  });
};
