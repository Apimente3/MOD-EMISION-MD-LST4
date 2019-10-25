/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_8', {
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
      defaultValue: '8'
    },
    file_ofic_inten_adquisicion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: true
    },
    plazo_max_rpta: {
      type: DataTypes.STRING,
      allowNull: true
    },
    oferta_predio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    incentivo_20: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total: {
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
    tableName: 'proceso_8',
      schema: "pred"
  });
};
