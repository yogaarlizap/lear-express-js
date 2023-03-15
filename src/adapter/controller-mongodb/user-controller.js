const getAll = require('../../application/use-case-mongo/users/get-all');
const create = require('../../application/use-case-mongo/users/create');
const getOne = require('../../application/use-case-mongo/users/find-by-id');
const multer = require('multer')
const userRepository = require('../../framework/database/mongodb/repositories/users-repository');
const hashPassword = require('../../framework/helper/hashing-password');

const userController = () => {
    const userRepo = userRepository();

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
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        await create(data, userRepo)
            .then((result) => {
                return res.json(result)
            }).catch((err) => {
                console.log(err);
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

    return {
        getAllUsers,
        createUser,
        findById
    };
}

module.exports = userController;