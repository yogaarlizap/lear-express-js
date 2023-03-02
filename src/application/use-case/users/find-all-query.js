module.exports = function findAllQ(whereClause, includeField, userRepository){
    return userRepository.findAllQ(whereClause, includeField);
};