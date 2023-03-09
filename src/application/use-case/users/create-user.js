const joi = require('joi');
const userValidation = require('../../../framework/helper/auth');

const createUser = async (req, sequelize) =>{
    const userValidate = userValidation(sequelize);

    // Joi Validation
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
        firstName: joi.string().required(),
        lastName: joi.string().required()
    });

    try {
        const username = req.body.username;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = userValidate.hashPassword(req.body.password);
        
        const validation = schema.validate({
            username,
            password,
            firstName,
            lastName
        });

        if(validation.error){
            return validation;
        }

        const usernameAlreadyExist = userValidate.checkUserUsername(validation.value.username);
        if(usernameAlreadyExist){
            return { error: `"Username" Already Exist`};
        }

        return userRepository.createUser(data, sequelize);
    } catch (error) {
        return error;
    }
}

module.exports = createUser;