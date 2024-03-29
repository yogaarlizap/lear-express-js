const joi = require('joi');
const AppErrorHelper = require('../../../framework/helper/error-handler');
const checker = require('../../../framework/helper/auth');
const validate = (data) => {
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
        profile: {
            firstName: joi.string().required(),
            lastName: joi.string()
        }
    });

    const validator = schema.validate(data);
    if(validator.error) throw new AppErrorHelper(validator.error.message, 400);
}

const updateOne = async(id, data, userRepository) => {
    validate(data);

    const check = await checker(userRepository);
    const checkUsername = await check.checkUserUsername(data.username);
    
    if(checkUsername) throw new AppErrorHelper("Username sudah terdaftar", 400);

    return userRepository.updateOne(id, data);
}

module.exports = updateOne;