'use strict';
const {
  Sequelize, DataTypes
} = require('sequelize');
const sequelizeLoadRelation = require('../../../helper/relation-model');
module.exports = (sequelize, withRelation = ['*']) => {
  
  const Profiles = sequelize.define(
    'profiles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      }
    }, 
    {
      sequelize,
      modelName: 'Profiles',
    });
  
    sequelizeLoadRelation(withRelation, 'users', () =>
      Profiles.belongsTo(require('./users')(sequelize, []), {
        foreignKey: 'userId'
      })
    );

  return Profiles;
};