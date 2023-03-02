const Users = require('../models/users');
const Profiles = require('../models/profiles');

const userRepository = (sequilize, DataTypes) => {
    const user = Users(sequilize, DataTypes);
    const profileModel = Profiles(sequilize, DataTypes);
    // find all
    const findAll = async () => {
        return await user.findAll({
            order: [['createdAt', 'DESC']],
            include: [ Profiles ]
        });
    };

    // find all with query
    const findAllQ = async (whereClause, includeField) =>{
        return await user.findAll({
            where: whereClause,
            include: includeField
        });
    };

    // find one with query
    const findOne = async (whereClause, includeField) => {
        return await user.findOne({
          where: whereClause,
          attributes: {
            include: includeField,
          },
        });
    };

    const findAndUpdate = async (payload, id) => {
        return await user.update(payload, {
            where: {
                id: id
            }
        });
    }
    
    // find by id
    const findById = async (id) => {
        return await user.findByPk(id);
    };

    // find or create
    const findOrCreate = async (payload) => {
        // return console.log(payload);
        return await user.findOrCreate({
          where: payload,
        });
    };

    const createUser = async (data) => {

        const userCreate = await user.create({
          username: data.username,
          password: data.password,
        });

        var addProfile = profileModel.create({
            firstName: data.profiles.firstName,
            lastName: data.profiles.lastName,
            user_id: userCreate.id
        });

        if(addProfile){
            return user.findOne({
                where: {
                    username: data.username
                },
                include: "profiles"
            });
        }
    }

    // Delete
    const deleteById = async (id) => {
        return await user.destroy({
            where: {
                id: id
            }
        });
    }

    return { findAll, findAllQ, findOne, findById, createUser, deleteById, findAndUpdate };

};

module.exports = userRepository;