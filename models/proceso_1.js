/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_1', {
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
      defaultValue: '1'
    },
    exp_tecnico: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_aprobacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    informe_diptra: {
      type: DataTypes.STRING,
      allowNull: true
    },
    file_informe_diptra: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_inform_diptra: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    predio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prog_ini: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prog_fin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lado_via: {
      type: DataTypes.STRING,
      allowNull: true
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    distrito: {
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
    tableName: 'proceso_1',
      schema: "pred"
  });
};
