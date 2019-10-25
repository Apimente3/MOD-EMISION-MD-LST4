/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_10', {
    predio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'predios',
        key: 'id'
      }
    },
    file_resol_exprop_adqui: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nro_proc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '10'
    },
    tramo_area_sect_aeropuerto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigo_pred: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nro_resol_ministerial: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nro_memo_oga: {
      type: DataTypes.STRING,
      allowNull: true
    },
    inf_tec_tasa: {
      type: DataTypes.STRING,
      allowNull: true
    },
    val_comer_inmueble: {
      type: DataTypes.STRING,
      allowNull: true
    },
    incent_comer_inmueble: {
      type: DataTypes.STRING,
      allowNull: true
    },
    valor_tasa: {
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
    tableName: 'proceso_10',
      schema: "pred"
  });
};
