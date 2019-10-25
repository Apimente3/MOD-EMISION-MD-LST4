/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso_11', {
    predio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'predios',
        key: 'id'
      }
    },
    file_form_registral: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nro_proc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '11'
    },
    sa_represent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sa_dni: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sa_rm_acredit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    b_represent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    b_nro_doc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    b_tipo_doc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rm_acreditacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sp_represent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sp_nro_doc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rm_acredit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fech_reg: {
      type: DataTypes.STRING,
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
    notar_direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notar_telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notar_telefonos: {
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
    tableName: 'proceso_11',
      schema: "pred"
  });
};
