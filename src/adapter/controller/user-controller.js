const findAll = require('../../application/use-case/users/find-all');
const findAllQ = require('../../application/use-case/users/find-all-query');
const findOne = require('../../application/use-case/users/find-one');
const createUser = require('../../application/use-case/users/create-user');
const deleteById = require('../../application/use-case/users/delete-by-id');
const findAndUpdate = require('../../application/use-case/users/find-and-update');
const userRepository = require('../../framework/database/'+process.env.DATABASE+'/repositories/user-repository');

const userController = (sequelize) => {
    const userRepo = userRepository(sequelize);
    
    const index = async (req, res) => {
        await findAll(userRepo)
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
        await findAllQ({ username, include }, userRepo)
            .then((result) => {
                return res.json(result).status(200);
            }).catch((err) => {
                return console.log(err);
            });
    }

    const show = async (req, res) => {
        var whereClause = {
            id: req.params.id,
            username: req.body.username
        }
        await findOne(whereClause, userRepo)
            .then((result) => {
                return res.json(result).status(200)
            }).catch((err) => {
                return console.log(err);
            });
    }

    const create = async (req, res) => {
        try {
            const newUser = await createUser(req, userRepo);
            if(newUser.error){
                return console.log(newUser.error);
            }
            return res.status(200).json({
                mesagge: "success create user"
            });
        } catch (error) {
            return error;
        }
    }

    const deleteId = async (req, res) => {
        var id = req.params.id;

        return await deleteById(id, userRepo)
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
        
        return await findAndUpdate(data, id, userRepo)
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