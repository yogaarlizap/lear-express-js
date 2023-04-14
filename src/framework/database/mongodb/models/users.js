const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    
})

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profiles'}
});

module.exports = mongoose.model('Users', usersSchema);;