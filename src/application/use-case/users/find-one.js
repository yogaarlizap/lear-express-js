const findOne = (whereClause, userRepository) => {
    return userRepositoryuserRepository.findOne(whereClause, ["users"]);
};

module.exports = findOne;