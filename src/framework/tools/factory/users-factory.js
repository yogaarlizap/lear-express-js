const bcrypt = require('bcrypt');
const hashingPassword = require('../../helper/hashing-password');

const users = () => {
    
    return [
        {
            username: "superadmin",
            password: hashingPassword("password"),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            username: "admin",
            password: hashingPassword("password"),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            username: "trainee",
            password: hashingPassword("password"),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            username: "instructor",
            password: hashingPassword("password"),
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ];
}

module.exports = users;