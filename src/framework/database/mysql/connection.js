const { func } = require('joi');
const { Sequelize } = require('sequelize');
const config = require('../../../config/config');

  module.exports = function(){
    const db = new Sequelize(
      config.mariadb.dbname,
      config.mariadb.username,
      config.mariadb.password,
      {
        host: config.mariadb.host || 'localhost',
        port: config.mariadb.port || '3306',
        dialect: 'mysql',
      }
    );

    db.authenticate()
      .then(() => {
        console.log('Connection has been established successfully');
      })
      .catch((error) => {
        console.log(error);
        console.error('Unable to connect to the database');
      });

    return db;
  }