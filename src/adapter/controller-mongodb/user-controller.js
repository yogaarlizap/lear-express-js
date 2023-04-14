const getAll = require('../../application/use-case-mongo/users/get-all');
const userCreate = require('../../application/use-case-mongo/users/create');
const getOne = require('../../application/use-case-mongo/users/find-by-id');
const findUpdateOne =  require('../../application/use-case-mongo/users/find-update-one');

const profileCreate = require('../../application/use-case-mongo/profiles/create');

const multer = require('multer');
const userRepository = require('../../framework/database/mongodb/repositories/users-repository');
const profileRepository = require('../../framework/database/mongodb/repositories/profiles-repository');
const hashPassword = require('../../framework/helper/hashing-password');


const userController = () => {
    const userRepo = userRepository();
    const profileRepo = profileRepository();

    const getAllUsers = async (req, res) => {
        await getAll(userRepo)
            .then((result) => {
               return res.json(result)
            }).catch((err) => {
                return console.log(err);
            });
    }

    const createUser = async(req, res) => {
        var data = {
                username: req.body.username,
                password: hashPassword(req.body.password),
                profile: {
                    fullname: req.body.fullname,
                    idNumber: req.body.idNumber,
                    placeOfBirth: req.body.placeOfBirth,
                    dateOfBirth: new Date(req.body.dateOfBirth),
                    gender: req.body.gender,
                    phoneNumber: req.body.phoneNumber,
                    position: req.body.position,
                    address: [{
                        address: req.body.address

                    }]
                }
        }

        const {
            username,
            password,
            profile
        } = data;

        const profileStore = await profileCreate(profile, profileRepo)

        await userCreate(data, userRepo)
            .then((result) => {
                return res.json(result);
            }).catch((err) => {
                return console.log(err);
            });
    }

    const findById = async (req, res) => {
        const _id = {
            _id: req.params.id
        }

        await getOne(_id, userRepo)
            .then((result) => {
                return res.json(result)
            }).catch((err) => {
                return console.log(err);
            });
    };

    const updateOne = async(req, res) => {
        const _id = {
            _id: req.params.id
        }

        const data = {
            username: req.body.username,
            password: hashPassword(req.body.password),
            profile: {
                fullname: req.body.fullname
            }
        }

        await findUpdateOne(_id, data, userRepo)
            .then( async (result) => {
                return await res.json(result)
            }).catch((err) => {
                return console.log(err);
            });;
    }

    return {
        getAllUsers,
        createUser,
        findById,
        updateOne
    };
}

module.exports = userController;