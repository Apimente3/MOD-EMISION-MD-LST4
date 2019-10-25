/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_2', {
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
      defaultValue: '2'
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true
    },
    file_memoria_descriptiva: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    file_plano_localizacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    file_plano_perimetrico: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    se_encutra_base_registral: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    partida_registral: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area_predio: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    perimetro: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    concatenado_coordenadas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    naturaleza_predio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area_inscr_matriz: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    area_direct_afectada: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    area_indirect_afectada: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    area_remanente: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    area_adquirida: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    nombre_afectado: {
      type: DataTypes.STRING,
      allowNull: true
    },
    apellido_afectado: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nro_doc_afec: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tipo_documento_afec: {
      type: DataTypes.STRING,
      allowNull: true
    },
    celulares_afec: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_usc_norte: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_usc_sur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_usc_este: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_usc_oeste: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_nombre_norte: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_nombre_sur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_nombre_este: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_nombre_oeste: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_exitsuper_norte: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_exitsuper_sur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_exitsuper_este: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ac_exitsuper_oeste: {
      type: DataTypes.STRING,
      allowNull: true
    },
    informe_tecnico_emitido: {
      type: DataTypes.STRING,
      allowNull: true
    },
    derecho_pago: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    may_derech_pago: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    abog_certificador: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ofic_registral: {
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
    tableName: 'proceso_2',
      schema: "pred"
  });
};
