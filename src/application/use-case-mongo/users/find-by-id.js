const getOne = (id, userRepository) => {
    return userRepository.getOne(id);
};

module.exports = getOne;