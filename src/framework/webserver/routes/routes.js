const userRoutes = require('../routes/user-routes');
const loginRoutes = require('./auth-routes');
const appErrorHandling = require('../../helper/error-handler');
const passportBearer = require('../middleware/auth-middleware');

/**
 *
 * @param {import('express').Express} app
 */
const routes = (app, sequilize) => {
  // Init strategy
  passportBearer(sequilize);

  // Routes
  app.use('/api/v1/login', loginRoutes(sequilize));
  app.use('/api/v1/users', userRoutes(sequilize));

  // Error Handling
  app.use("*", (req, res, next) => {
    next(new appErrorHandling(`[${req.method}] url not found`, 404));
  });
  app.use(appErrorHandling);
};

module.exports = routes;