const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    fullname: String,
    idNumber: String,
    avatar: String,
    placeOfBirth: String,
    dateOfBirt: Date,
    position: String,
    workUnit: String,
    religion: String,
    gender: Number,
    phoneNumber: String,
    createdAt: Date,
    updateAt: Date,
    addresses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Addresses'}],
    studentStatus: Number,
    organizationUnits: {
        name: String,
    },
    classRank: {
        name: String,
        className: Number
    },
    corps: String,

});

module.exports = mongoose.model('Profiles', profileSchema);
