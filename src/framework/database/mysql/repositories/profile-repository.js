const Profiles = require('../models/profiles');

const profileRepository = async (sequilize, DataTypes) => {
    const profile = await Profiles(sequilize, DataTypes);

    const findAll = async () => {
        return await profile.findAll();
    };

    const findAllQ = async (whereClause, includeField) => {
        return await profile.findAll({
            where: whereClause,
            include: includeField
        });
    };

    const findOne = async (whereClause, includeField) => {
        return await profile.findOne({
          where: whereClause,
          attributes: {
            include: includeField,
          },
        });
    };
    
    const findById = async (id) => {
        return await profile.findByPk(id);
    };

    const createProfile = async (data) => {
        return await profile.create(data);
    };

    return { findAll, findAllQ, findOne, findById, createProfile };    
};

module.exports = profileRepository;