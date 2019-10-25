/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_6', {
    predio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'predios',
        key: 'id'
      }
    },
    file_req_presu_aprobado: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nro_proc: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '6'
    },
    nro_doc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    not_presupuestaria: {
      type: DataTypes.STRING,
      allowNull: true
    },
    partida: {
      type: DataTypes.STRING,
      allowNull: true
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tipocambio_vigente: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    justificacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fech_documento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_inicio: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    fecha_fin: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
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
    tableName: 'proceso_6',
      schema: "pred"
  });
};
