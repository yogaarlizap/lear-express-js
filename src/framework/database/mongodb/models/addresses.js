const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address: String,
    postalCode: String,
    addressType: String,
    subdistrict: {type: mongoose.Schema.Types.ObjectId, ref: 'Subdistricts'}
});

module.exports = mongoose.model('Addresses', addressSchema)