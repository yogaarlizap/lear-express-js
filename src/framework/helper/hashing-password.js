const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10, "a");
    const pass = bcrypt.hashSync(password, salt);
    return pass;
};

module.exports = hashPassword;