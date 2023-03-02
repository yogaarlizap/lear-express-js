const bcrypt = require('bcrypt');
const token = require('./token');

const auth = async (userRepository) => {
    const checkUserUsername = async (username) => {
        return await (await userRepository).findOneByProperty({ username });
    }

    const validPassword = async (password, userPassword) => {
        if(password && userPassword) {
            return bcrypt.compareSync(password, userPassword);
        }
    };

    const checkUserLogin = async ({ username, password }) => {
        const user = await (
            await userRepository
        ).findOne({username}, ["password"]);

        if(!user){
            return false;
        } else {
            const validation = validPassword(password, user?.password);
            if(validation){
                user.password = undefined;
                return user;
            } else {
                return {
                    error: "wrong password"
                }
            }
        }
    };

    const tokenStore = async (userId) => {
        const generateToken = {
            token: await token()
        };

        var data = {
            token: await generateToken()
        };

        return await findAndUpdate(data, userId, userRepository)
    }

    return {
        checkUserUsername,
        validPassword,
        checkUserLogin,
        tokenStore
    };
}

module.exports = auth;