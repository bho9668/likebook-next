import * as utils from './utils'; // Useful functions
import * as strategies from './strategies'; // Differtents authentication strategies
import jwt from 'jsonwebtoken';
import { getUserById } from '../database/user';

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

// Middleware express function to authenticate
const initializeAuthentication = app => {
  utils.setup(); // Passport wiring

  pipe(strategies.FacebookStrategy, strategies.JWTStrategy)(app); // Pass the different strategies
};

// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        /* console.log(decodedToken); */
        const user = await getUserById(decodedToken._id);
        res.locals.user = user;
        next();
      }
    })
  } else {
    res.locals.user = null;
    next();
  }

}

export { utils, initializeAuthentication, strategies, checkUser };