const joi = require('joi');
const authHelper = require('../../../framework/helper/auth');
const token = require('../../../framework/helper/token');
const userRepository = require("../../../framework/database/"+ process.env.DATABASE +"/repositories/user-repository");

const login = async (req, sequelize) => {
    const userRepo = userRepository(sequelize);
    const authHelp = authHelper(userRepo);

    // Joi Validation
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required()
    });

    try{
        const username = req.body.username;
        const password = req.body.password;
        const userValidation = schema.validate({ username, password })
        
        if(userValidation.error){
            return userValidation;
        }

        const user = await (await authHelp).checkUserLogin(userValidation.value, req);
        if(user?.id){
            // generate token with user agent
            var data = {
                token: await token()
            };
            return await userRepo.findAndUpdate(data, user.id)
                .then((result) => {
                    return {
                        user: user.id,
                        token: data.token
                    };
                }).catch((err) => {
                    return console.log(err);
                });
        }else if(user.error){
            return user;
        }
    }catch(err){
        return err;
    }
};

module.exports = login;