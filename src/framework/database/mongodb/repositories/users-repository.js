const userModel = require('../models/users');

const userRepository = () => {

    const getAll = async () => {
        return await userModel.find({})
    };

    const create = async (data) => {
        return await userModel.create(data);
    };

    const getOne = async (id) => {
        return await userModel.findById(id);
    }

    const findOne = async(data) => {
        return await userModel.findOne(data)
    }

    return {
        getAll,
        create,
        getOne,
        findOne
    }
};

module.exports = userRepository;