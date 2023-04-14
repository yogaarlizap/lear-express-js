const joi = require('joi');
const AppErrorHelper = require('../../../framework/helper/error-handler');

const validate = (data) => {
    const schema = joi.object({
        fullname: joi.string().required(),
        idNumber: joi.string().required(),
        placeOfBirth: joi.string().required(),
        dateOfBirth: joi.date().required(),
        gender: joi.number().required(),
        phoneNumber: joi.string().required(),
        position: joi.string(),
        address: joi.array().items(
            joi.object()
        )
    });

    const validator = schema.validate(data);
    if(validator.error) throw new AppErrorHelper(validator.error.message, 400);
}

const create = async (data, profileRepository) => {
    validate(data)

    return await profileRepository.create(data);
}

module.exports = create;