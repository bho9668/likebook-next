require('dotenv').config(); // Enable env variable to keep secrets secret

import express from 'express'; // Node.js web application framework
import next from 'next'; // React framework
import { urlencoded, json } from 'body-parser'; // Middleware for parsing JSON in the body request
import cookieParser from 'cookie-parser'; // Middleware that simplifies setting and reading cookies
import passport from 'passport'; // Authentication Library

import router from './router';
import { connectToDatabase } from './database/connection';
import { initializeAuthentication } from './auth';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const port = 3000;

nextApp.prepare().then(async () => {
  const app = express();

  // Test back-end route
  app.get('/my-custom-route', (req, res) =>
    res.status(200).json({ hello: 'Hello, from the back-end world!' })
  )

  // Middlewares
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cookieParser());

  // Initialize passport authentication middlewares
  app.use(passport.initialize());

  // Custom middlewares
  router(app); // Add our custom routes
  initializeAuthentication(app); // Add passport startegies into pipeline

  app.get('*', (req, res) => {
    return handle(req, res);
  });

  await connectToDatabase();

  app.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on localhost:${port}`);
  });
});