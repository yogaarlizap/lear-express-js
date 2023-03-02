const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const userRepository = require('../../database/mysql/repositories/user-repository');

const bearerStrategy = async (sequelize) => {
    passport.use(
        await new BearerStrategy(
        async function(token, done) {
          await userRepository(sequelize).findOne({ token: token }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
          });
        }
    ));
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
  });
  
module.exports = bearerStrategy;

// export default function authMiddleware(req, res, next){

            
    // Get Token from header
    // const token = req.header('Authorization');

    // if(!token){
    //     throw new Error('No access token found');
    // }
    // if(token.split(' ')[0] !== 'Bearer'){
    //     throw new Error('Invalid access token format');
    // }
    
    // try{
    //     const decode = authService.verify(token.split(' ')[1]);
    //     req.user = decoded.user;
    //     next();
    // }catch(err){
    //     throw new Error('Token is not valid');
    // }

// }