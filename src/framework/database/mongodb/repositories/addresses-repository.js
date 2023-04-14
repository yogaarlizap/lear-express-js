const addressModel = require('../models/addresses');

const addressRepository = () => {

    const create = async (data) => {
        return addressModel.create(data);
    }

    return {
        create
    }
}

module.exports = addressRepository;