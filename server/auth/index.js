import * as utils from './utils'; // Useful functions
import * as strategies from './strategies'; // Differtents authentication strategies

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

// Middleware express function to authenticate
const initializeAuthentication = app => {
  utils.setup(); // Passport wiring

  pipe(strategies.FacebookStrategy, strategies.JWTStrategy)(app); // Pass the different strategies
};

export { utils, initializeAuthentication, strategies };