const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subdistrictSchema = new Schema({
    name: String
    // district: {}
})

module.exports = mongoose.model('Subdistricts', subdistrictSchema);