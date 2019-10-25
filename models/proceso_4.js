/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_4', {
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
      defaultValue: '4'
    },
    file_inscrip_anot_prevent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rubro: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nro_ofic_anot_prev: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fech_ofic_anot_prev: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fech_present_titulo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    num_titu_anot_prev: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tomo_diario: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_anot_prev: {
      type: DataTypes.DATEONLY,
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
    tableName: 'proceso_4',
      schema: "pred"
  });
};
