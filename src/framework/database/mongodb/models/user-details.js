const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailSchema = new Schema({
    token: String,
    userId: {type: mongoose.Schema.objectId, ref: 'Users'},
    meta: String,
    createdAt: Date,
    updatedAt: Date
});