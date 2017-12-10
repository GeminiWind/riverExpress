// =================================================
// This file contain configuration for Passport which used to authenticate user
// =================================================
import PassportJwt from 'passport-jwt';
import User from '../app/Models/User';

const { Strategy: JwtStrategy, ExtractJwt } = PassportJwt;

// Setup work and export for the JWT passport strategy
const configurePassport = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  opts.secretOrKey = process.env.APP_KEY;
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};

export { configurePassport };
