const Users = require('../models/users');
const Profiles = require('../models/profiles');

const userRepository = (sequilize) => {
    const user = Users(sequilize);
    const profileModel = Profiles(sequilize);
    // find all
    const findAll = async (includeField, includeAttribute) => {
        return await user.findAll({
            order: [['createdAt', 'DESC']],
            include: includeField,
            attributes: {
                include: includeAttribute,
            }
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
    const findOne = (params, include, includeAttribute) => {
        return user.findOne({
            where: params,
            include: include,
            attributes: {
                include: includeAttribute,
            },
        });
    };

    const checkToken = (token) => {
        return user.findOne({
            where: token
        });
    }

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

        var addProfile = await profileModel.create({
            firstName: data.firstName,
            lastName: data.lastName,
            userId: userCreate.id
        });

        if(addProfile){
            return await user.findOne({
                where: {
                    username: data.username
                }
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

    return { findAll, findAllQ, findOne, findById, createUser, deleteById, findAndUpdate, checkToken };

};

module.exports = userRepository;