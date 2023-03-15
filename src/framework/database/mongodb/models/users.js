const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    firstName: String,
    lastName: String,
    image: String
});

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    token: String,
    profile: [profileSchema]
});

module.exports = mongoose.model('Users', usersSchema);;