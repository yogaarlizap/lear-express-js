const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const userRepository = require('../../database/mysql/repositories/user-repository');

const bearerStrategy = async (sequelize) => {
  const User = userRepository(sequelize);
  passport.use(
    await new BearerStrategy(async (token, done) => {
      try {
        const user = await User.checkToken({
          token: token,
        });
        if (user) {
          return done(null, user, { scope: "all" });
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    })
  );
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

module.exports = bearerStrategy;