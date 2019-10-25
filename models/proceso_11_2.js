/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_11_2', {
    predio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'predios',
        key: 'id'
      }
    },
    nro_proc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '11'
    },
    file_not_eject_coact: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nro: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notario: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sanea_sunarp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ejec_coact1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ejec_coact2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ejec_coact3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '2019-08-02 18:45:31.65209'
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profesional_inicia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    profesional_finaliza: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'proceso_11_2',
      schema: "pred"
  });
};
