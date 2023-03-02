const userController = require('../../../adapter/controller/user-controller');
const express = require('express');
const userRepository = require('../../database/mysql/repositories/user-repository');
const profileRepository = require('../../database/mysql/repositories/profile-repository');
var bodyParser = require('body-parser');

const userRoute = (sequelize) => {
    const Router = express.Router();
    Router.use(bodyParser.json());
    const userRepo = userRepository(sequelize);
    const controller = userController(userRepo);
    
    Router.get("/", controller.index);
    Router.get("/:id", controller.show);
    Router.get("/filter", controller.filter);
    Router.post("/", controller.create);
    Router.delete("/:id", controller.deleteId);
    Router.put("/:id", controller.update);

    return Router;
}

module.exports = userRoute;