// This node script populates the database with fake users and posts

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async');
const faker = require('faker');
faker.seed(37);

const User = require('./models/user');
const Post = require('./models/post');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];
const posts = [];

function userFakeCreate() {

  // Generate random user
  const user = new User(
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'fakePassword',
      friends: [],
      friendRequests: [],
      creationTimestamp: new Date().getTime(),
    }
  );

  // Save the created user in the database
  user.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('New User: ' + user);
    users.push(user._id);
  });

};

function postFakeCreate() {

  User.count().exec(function (err, count) {

    var random = Math.floor(Math.random() * count);

    User.findOne().skip(random).exec(
      function (err, user) {

        if (err) {
          console.log(err);
          return;
        };

        const post = new Post(
          {
            author: user._id,
            textContent: faker.lorem.text(37),
            creationTimestamp: new Date().getTime(),
            updateTimestamp: new Date().getTime(),
          }
        );

        post.save(function (err) {
          if (err) {
            console.log(err);
            return;
          };
          console.log('New Post' + post);
          posts.push(post);
        });

      });

  });

};

function createNUser(n) {

  for (let i = 0; i < n; i++) {
    userFakeCreate();
  };
};

function createNPost(n) {
  for (let i = 0; i < n; i++) {
    postFakeCreate();
  };
};

//createNUser(500);

//createNPost(1500);