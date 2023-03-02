const userRoutes = require("../routes/user-routes");
const userModels = require("../../database/mysql/models/users");
/**
 *
 * @param {import('express').Express} app
 */
const routes = (app, sequilize) => {
  
  const user = userModels(sequilize);
  app.use("/api/v1/users",userRoutes(sequilize));
  
};

module.exports = routes;