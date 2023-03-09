'use strict';
const {
  Sequelize, DataTypes
} = require('sequelize');
const sequelizeLoadRelation = require('../../../helper/relation-model');

const permissionsModel = (sequelize, withRelation = ['*']) => {
  const Permissions = sequelize.define(
    'permissions',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Permissions',
      validation: {}
    });
  // relasi
  sequelizeLoadRelation(withRelation, "roles", () => {
    Permissions.belongsToMany(require("./roles")(sequelize, []), {
      through: "rolehaspermissions",
      foreignKey: "permissionId",
      timestamps: false,
    });
  });

  return Permissions;
};

module.exports = permissionsModel;