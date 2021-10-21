import passport from 'passport';
import jwt from 'jsonwebtoken'; // Library used to sign and verify tokens
import bcrypt from 'bcrypt'; // Library used to hash the passwords
import { UserModel } from '../database/schema';


const setup = () => {
  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id)
      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
  });

};

const signToken = (user) => {
  return jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: 604800 // 7 days
  });
};

const hashPassword = async (password) => {
  if(!password) {
    throw new Error('Password was not provided');
  };

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate, actual) => {
  //console.log(candidate, actual)
  return await bcrypt.compare(candidate, actual);
};

export { setup, signToken, hashPassword, verifyPassword };