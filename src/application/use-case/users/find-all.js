const findAll = (userRepository) => {
    return userRepository.findAll(['roles'], null, null);
};

module.exports = findAll;