const userController = require('../../../adapter/controller/user-controller');
const userContMongodb = require('../../../adapter/controller-mongodb/user-controller');
const express = require('express')

const userRoute = (sequelize) => {
    const controller = userController(sequelize);
    const controllerMongodb = userContMongodb();
    const router = express.Router();

    // Middleware
    // router.use('/', passport.authenticate('bearer', { session:false }));
    router.get('/mongodb', controllerMongodb.getAllUsers);
    router.get('/mongodb/:id', controllerMongodb.findById);
    router.post('/mongodb', controllerMongodb.createUser);
    router.get('/', controller.index);
    router.get('/:id', controller.show);
    router.get('/filter', controller.filter);
    router.post('/', controller.create);
    router.delete('/:id', controller.deleteId);
    router.put('/:id', controller.update);

    return router;
}

module.exports = userRoute;