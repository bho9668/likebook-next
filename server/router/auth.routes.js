import express from 'express'
import { to } from 'await-to-js' // Simplifies Promise writing
import { verifyPassword, hashPassword } from '../auth/utils' // Utility authentication functions
import { login } from '../auth/strategies/jwt'
import { createUser, getUserByEmail } from '../database/user'
const router = express.Router()

// Route for POST authentication
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

    const [err, user] = await to(getUserByEmail(email)); // Retrieve user from db with his mail

    const authenticationError = () => {
      return res
        .status(500)
        .json({ success: false, data: "Authentication error!" });
    };

    console.log(password, user.password, user)
    if (!(await verifyPassword(password, user.password))) { // Verify the password
      console.error('Passwords do not match');
      return authenticationError();
    };
  
    const [loginErr, token] = await to(login(req, user)); // Log the user in
  
    if (loginErr) {
      console.error('Log in error', loginErr);
      return authenticationError();
    };
  
    return res
      .status(200)
      .cookie('jwt', token, { // Create a cookie to keep user logged in
        httpOnly: true
      })
      .json({
        success: true,
        data: '/'
      });

});

// Route for POST Registration
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Verify if the provided email is valid
  if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
    return res.status(500).json({ success: false, data: 'Enter a valid email address.' })
  } else if (password.length < 5 || password.length > 20) {
    return res.status(500).json({
      success: false,
      data: 'Password must be between 5 and 20 characters.'
    })
  }

  let [err, user] = await to(
    createUser({ // Create the user in the database
      firstName,
      lastName,
      email,
      password: await hashPassword(password) // Hash the password (the password isn't saved in the database
    })
  )

  if (err) {
    return res.status(500).json({ success: false, data: 'Email is already taken' })
  }

  const [loginErr, token] = await to(login(req, user)) // Log the user

  if (loginErr) {
    console.error(loginErr)
    return res.status(500).json({ success: false, data: 'Authentication error!' })
  }

  return res
    .status(200)
    .cookie('jwt', token, { // Create a cookie to keep the user logged in
      httpOnly: true
    })
    .json({
      success: true,
      data: '/'
    })
});

export default router;