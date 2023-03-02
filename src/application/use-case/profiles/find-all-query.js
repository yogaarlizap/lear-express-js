module.exports = function findAllQ({ whereClause, includeField }, profileRepository){
    return profileRepository.findAllQ(whereClause, includeField);
};