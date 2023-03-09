const bcrypt = require('bcrypt');
const token = require('./token');

const auth = async (userRepository) => {
    const hashPassword = (password) => {
        const salt = bcrypt.genSaltSync(10, "a");
        const pass = bcrypt.hashSync(password, salt);
        return pass;
      };

    // User Repo
    const checkUserUsername = async (username) => {
        return await (await userRepository).findOne({ username });
    }

    const validPassword = async (password, userPassword) => {
        if(password && userPassword) {
            return bcrypt.compareSync(password, userPassword);
        }
    };

    // Use case sendiri
    const checkUserLogin = async ({ username, password }) => {
        
        const user = await userRepository.findOne({username}, null, ['password'], null);
        if(!user){
            return false;
        } else {
            const validation = validPassword(password, user?.password);
            if(validation){
                user.password = undefined;
                return user;
            } else {
                return {
                    error: 'wrong password'
                }
            }
        }
    };

    return {
        checkUserUsername,
        validPassword,
        checkUserLogin,
        hashPassword
    };
}

module.exports = auth;