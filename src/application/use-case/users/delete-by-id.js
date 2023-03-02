module.exports = function deleteById(id, userRepository){
    return userRepository.deleteById(id);
}