const userRepository = require('../../../framework/database/'+process.env.DATABASE+'/repositories/user-repository');

const findAll = (sequelize) => {
    const userRepo = userRepository(sequelize);
    return userRepo.findAll(['roles'], null, null);
};

module.exports = findAll;