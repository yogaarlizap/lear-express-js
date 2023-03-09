const userController = require('../../../adapter/controller/user-controller');
const express = require('express')
const passport = require('passport');

const userRoute = (sequelize) => {
    const controller = userController(sequelize);
    const router = express.Router();

    // Middleware
    router.use('/', passport.authenticate('bearer', { session:false }));

    router.get('/', controller.index);
    router.get('/:id', controller.show);
    router.get('/filter', controller.filter);
    router.post('/', controller.create);
    router.delete('/:id', controller.deleteId);
    router.put('/:id', controller.update);

    return router;
}

module.exports = userRoute;