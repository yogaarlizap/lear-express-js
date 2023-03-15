const joi = require('joi');
const AppErrorHelper = require('../../../framework/helper/error-handler');

const validate = (data) => {
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
        firstName: joi.string().required(),
        lastName: joi.string()
    });

    const validator = schema.validate(data);
    if(validator.error) throw new AppErrorHelper(validator.error.message, 400);
}

const create = async (data, userRepository) => {
    
    validate(data);
    
    const user = await userRepository.findOne({ username: data.username });
    if(user){
        throw new AppErrorHelper("Username sudah terdaftar", 400);
    }

    return userRepository.create(data);
}

module.exports = create;