module.exports = function (data, id, userRepository) {
    return userRepository.findAndUpdate(data, id);
}