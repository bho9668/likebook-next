import passport from 'passport'; // Core authentication library
import passportJWT from 'passport-jwt'; // JWT extension for passport
import { to } from 'await-to-js'; // Simplifies Promise writing

import { getUserById } from '../../database/user';
import { signToken } from '../utils';

const JWTStrategy = passportJWT.Strategy; // import Strategy from passport-jwt


const strategy = () => {
  // Options on how the JWT is retrieved
  const strategyOptions = {
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
  };

  // Use the token parsed from the request to retrieve the user in the database
  const verifyCallback = async (req, jwtPayload, cb) => {
    const [err, user] = await to(getUserById(jwtPayload.data._id));
    if (err) { return cb(err); };
    // Success user exists in the DB
    req.user = user;
    return cb(null, user);
  };

  passport.use(new JWTStrategy(strategyOptions, verifyCallback));
};

const login = (req, user) => {
  return new Promise((resolve, reject) => {

    req.login(user, { session: false }, err => { //Passport login function (attach to request)
      if (err) { return reject(err); };

      return resolve(signToken(user))
    })
  });
};

export { strategy, login };