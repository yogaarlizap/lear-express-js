'use strict';
const {
  Sequelize, DataTypes
} = require('sequelize');
const sequelizeLoadRelation = require('../../../helper/relation-model');

const userModel = (sequelize, withRelation = ['*']) => {
  const Users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: DataTypes.STRING,
      token: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Users',
      validation: {}
    });
    
  // relasi
  sequelizeLoadRelation(withRelation, 'profiles', () =>
    Users.hasOne(require('./profiles')(sequelize, []), {
      foreignKey: 'userId'
    })
  );

  sequelizeLoadRelation(withRelation, "roles", () => {
    Users.belongsToMany(require("./roles")(sequelize, ["permissions"]), {
      through: "userhasroles",
      foreignKey: "userId",
      timestamps: false,
    });
  });

  return Users;
};

module.exports = userModel;