'use strict';
const {
  Sequelize, DataTypes
} = require('sequelize');
const sequelizeLoadRelation = require('../../../helper/relation-model');

const rolesModel = (sequelize, withRelation = ['*']) => {
  const Roles = sequelize.define(
    'roles',
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
      timestamps: false,
      modelName: 'Roles',
      validation: {}
    });
  // relasi
  sequelizeLoadRelation(withRelation, "users", () => {
    Roles.belongsToMany(require("./users")(sequelize, []), {
      through: "userhasroles",
      foreignKey: "roleId",
      timestamps: false,
    });
  });

  return Roles;
};

module.exports = rolesModel;