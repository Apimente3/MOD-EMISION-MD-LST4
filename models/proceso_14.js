/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_14', {
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
      defaultValue: '14'
    },
    file_acta_cheque: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fech_entrega: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    notaria: {
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
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    beneficiario: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dni: {
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
    tableName: 'proceso_14',
      schema: "pred"
  });
};
