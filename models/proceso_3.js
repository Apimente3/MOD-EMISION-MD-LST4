/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_3', {
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
      defaultValue: '3'
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true
    },
    file_oficio_adq: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fech_emision: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fech_recepcion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    se_encutra_base_registral: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'proceso_3',
      schema: "pred"
  });
};
