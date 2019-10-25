/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_5', {
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
      defaultValue: '5'
    },
    file_informe_tasacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    met_reg_emplea: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fech_inspect_ocular: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fech_inform: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    direcc_predio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prog_inicio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prog_final: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coord_utm_este: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coord_utm_oeste: {
      type: DataTypes.STRING,
      allowNull: true
    },
    wgs84_zona: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tipo_terreno: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uso: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zonificacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uso_actual: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asentamiento_humano_uc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    edific_area_tech: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    edific_obr_compl: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    edific_inst_fij_perm: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    plant_perm: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    plat_trans: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tasa_area: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    tasa_precio_mtr: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    tasa_total: {
      type: DataTypes.DOUBLE,
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
    tableName: 'proceso_5',
      schema: "pred"
  });
};
