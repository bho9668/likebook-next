import passport from "passport";
import passportFacebook from 'passport-facebook';
import { to } from 'await-to-js';

import { getUserByProviderId, createUser } from '../../database/user';
import { signToken } from '../utils';

const FacebookStrategy = passportFacebook.Strategy;

const strategy = (app) => {
  const strategyOptions = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'name', 'emails']
  };

  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    let [err, user] = await to(getUserByProviderId(profile.id))
    if (err || user) {
      return done(err, user)
    }

    const [createdError, createdUser] = await to(
      createUser({
        providerId: profile.id,
        provider: profile.provider,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        password: null
      })
    )

    return done(createdError, createdUser)
  }

  passport.use(new FacebookStrategy(strategyOptions, verifyCallback));

  // Route for client authentication
  app.get(`${process.env.BASE_API_URL}/auth/facebook`, passport.authenticate('facebook'));

  // When authentication is complete, redirect back to this url
  // Add a cookie to auth persistance if auth is successful, else redirect to login
  app.get(
    `${process.env.BASE_API_URL}/auth/facebook/callback`,
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      return res
        .status(200)
        .cookie('jwt', signToken(req.user), {
          httpOnly: true
        })
        .redirect('/')
    }
  );

  return app;
};

export { strategy };