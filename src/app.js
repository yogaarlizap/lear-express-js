require("dotenv").config();

const config = require("./config/config");
const express = require("express");
const serverConfig = require("./framework/webserver/server");
const connection = require("./framework/database/mysql/connection");
const routes = require("./framework/webserver/routes/routes");

// this is entry point looks like...

// configuration express etc...

const app = express();

// console.log(config.mariadb.dbname);
// Database Configuration...
const sequelize = connection({
  dbname: config.mariadb.dbname,
  host: config.mariadb.host,
  username: config.mariadb.username,
  password: config.mariadb.password,
  dialect: "mysql",
});

serverConfig(app, sequelize, { host: config.host, port: config.port }).startServer();
// routes...
routes(app, sequelize);

// error handling...

module.exports = app;