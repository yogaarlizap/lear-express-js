module.exports = function findOne({whereClause, includeField}, userRepository){
    return userRepository.findOne(whereClause, includeField);
};