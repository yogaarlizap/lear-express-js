const authController = require('../../../adapter/controller/login-controller');
const express = require('express');

const authRoute = (sequelize) => {
    const router = express.Router();
    const controller = authController(sequelize);

    router.post('/', controller.login);

    return router;
};

module.exports = authRoute;