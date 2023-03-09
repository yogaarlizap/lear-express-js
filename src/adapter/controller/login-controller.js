const loginUseCase = require('../../application/use-case/auth/login');
const appErrorHandling = require('../../framework/helper/error-handler');

const authController = (sequelize) => {

    const login = async (req, res, next) => {
        try {
            const login = await loginUseCase(req, sequelize);

            if(login?.error){
                return next(new appErrorHandling(login.error));
            }
            return res.json(login);
        } catch (error) {
            return next(new appErrorHandling(error));
        }
    }

    return {
        login
    }
}

module.exports = authController;