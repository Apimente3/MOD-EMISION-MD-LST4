/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('files_expediente', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        codigo_expediente: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true
        },
        files: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        documento1: {
            type: DataTypes.STRING,
            allowNull: true
        } 
        ,
        documento2: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,
        documento3: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,
        documento4: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,
        documento5: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,
        documento6: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,
        documento7: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,
        documento8: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,
        documento9: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,documento10: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,documento11: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,documento12: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,documento13: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    }, {
        tableName: 'files_expediente',
        schema:'pred'
    });
};
