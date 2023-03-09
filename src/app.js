require("dotenv").config();
const config = require("./config/config");
const expressConfig = require("./framework/webserver/express");
const serverConfig = require("./framework/webserver/server");
const connection = require("./framework/database/" +
  process.env.DATABASE +
  "/connection");
const routes = require("./framework/webserver/routes/routes");

const { Sequelize } = require("sequelize");

const express = require("express");

const app = express();

const sequelize = connection(config);

expressConfig(app);
const server = serverConfig(app, config);
server.startServer();

routes(app, sequelize);
