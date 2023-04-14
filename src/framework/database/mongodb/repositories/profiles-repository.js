const profileModel = require('../models/profiles');

const profileRepository = () => {

    const create = async (data) => {
        return profileModel.create(data);
    }

    const update = async (id, data) => {
        return profileModel.findOneAndUpdate(id, data);
    }

    return {
        create,
        update
    }
}

module.exports = profileRepository;