const sequilzeLoadRelation = (withRelation, relname, cb) =>
  (withRelation.includes('*') || withRelation.includes(relname)) && cb();
module.exports = sequilzeLoadRelation;
