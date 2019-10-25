/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_13', {
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
      defaultValue: '13'
    },
    file_comprob_pago: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    beneficiario: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fechas: {
      type: DataTypes.STRING,
      allowNull: true
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: true
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    siaf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cuenta_patrimonial: {
      type: DataTypes.STRING,
      allowNull: true
    },
    teso_funcionario: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: '2019-08-02'
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
    tableName: 'proceso_13',
      schema: "pred"
  });
};
