const userRepository = require('../../../framework/database/'+process.env.DATABASE+'/repositories/user-repository');
const findOne = (whereClause, sequelize) => {
    
    const userRepo = userRepository(sequelize);
    return userRepo.findOne(whereClause, ["users"]);
};

module.exports = findOne;