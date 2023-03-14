const joi = require('joi');
const userValidation = require('../../../framework/helper/auth');
const hashPassword = require('../../../framework/helper/hashing-password');
const createUser = async (req, userRepository) =>{
    const userValidate = userValidation(userRepository);

    // Joi Validation
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        role: joi.array().items(joi.integer().required())
    });

    try {
        const data = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword(req.body.password),
            role: req.body.roles
        }
        return console.log(data);
        const validation = schema.validate({
            username,
            password,
            firstName,
            lastName,
            role
        });

        if(validation.error){
            return validation;
        }

        const usernameAlreadyExist = userValidate.checkUserUsername(validation.value.username);
        if(usernameAlreadyExist){
            return { error: `"Username" Already Exist`};
        }

        return userRepository.createUser();
    } catch (error) {
        return error;
    }
}

module.exports = createUser;