module.exports = function createUser(payload, userRepository){
    return userRepository.createUser(payload);
};