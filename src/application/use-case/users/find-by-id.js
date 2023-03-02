module.exports = function findById(id, userRepository){
    return userRepository.findById(id);
};