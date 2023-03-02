module.exports = function findOrCreate(payload, profileRepository){
    return profileRepository.findOrCreate(payload);
}