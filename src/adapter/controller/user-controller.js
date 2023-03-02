const findAll = require('../../application/use-case/users/find-all');
const findAllQ = require('../../application/use-case/users/find-all-query');
const findOne = require('../../application/use-case/users/find-one');
const profileCreate = require('../../application/use-case/profiles/find-or-create');
const findOrCreate = require('../../application/use-case/users/find-or-create');
const deleteById = require('../../application/use-case/users/delete-by-id');
const findAndUpdate = require('../../application/use-case/users/find-and-update');

const bcrypt = require('bcrypt');
const { use } = require('passport');

const userController = (userRepository) => {
    const index = async (req, res) => {
        await findAll(userRepository)
            .then((result) => {
                return res.json(result).status(200);
            }).catch((err) => {
                return console.log(err);
            });
    };

    const filter = async (req, res) => {
        var data = {
            username: req.body.username,
            include: req.body.include
        }

        const { username, include } = data
        await findAllQ({ username, include }, userRepository)
            .then((result) => {
                return res.json(result).status(200);
            }).catch((err) => {
                console.log(err);
            });
    }

    const show = async (req, res) => {
        var id = req.params.id;
        await findOne(id, userRepository)
            .then((result) => {
                return res.json(result).status(200)
            }).catch((err) => {
                return console.log(err);
            });
    }

    const create = async (req, res) => {
        var data = {
            username: req.body.username,
            password: req.body.password,
            profiles:{
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        };
        const { username, password, profiles } = data;

        bcrypt.hash(password, 10, function(err, password) {
            findOrCreate({ username, password, profiles }, userRepository)
        });
    }

    const deleteId = async (req, res) => {
        var id = req.params.id;

        return await deleteById(id, userRepository)
            .then((result) => {
                return res.status(200);
            }).catch((err) => {
                return console.error(err);
            });
    }

    const update = async (req, res) => {
    
        var id = req.params.id;
        var data = {
            username: req.body.username
        };

        return await findAndUpdate(data, id, userRepository)
            .then((result) => {
                return res.json(result);
            }).catch((err) => {
                return console.log(err);
            }); 
    }

    return {
        index,
        filter,
        show,
        create,
        deleteId,
        update
    };
};

module.exports = userController;