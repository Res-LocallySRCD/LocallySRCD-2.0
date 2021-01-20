const bcrypt = require("bcrypt"); // 🧟‍♂️ 🧟‍♀️
const User = require("../models/userModel");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// create the user
const userController = {
  createUser(req, res, next) {
    const { username, password, prefLocations } = req.body;

    User.create(
      {
        username: username,
        password: password,
        prefLocations: prefLocations,
      },
      (err, newUser) => {
        if (err)
          return next({
            log: "Error user already exists",
            message: err,
          });
        const { username, prefLocations } = newUser;
        res.locals.username = username;
        res.locals.prefLocations = prefLocations;
        console.log("res.locals.user -->", res.locals);
        return next();
      }
    );
  },

  // authenticate user by checking if they are in the database
  getUser(req, res, next) {
    console.log("in getUser", req.body);
    const { username, password } = req.body;
    // getUser

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });

    passport.use(
      new LocalStrategy(function (username, password, done) {
        User.findOne({ username: username }, function (err, foundUser) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      })
    );
  },

  // getUser(req, res, next) {
  //   console.log('in getUser', req.body);
  //   const { username, password } = req.body;

  //   User.findOne(
  //     {
  //       username: username,
  //     },
  //     (err, foundUser) => {
  //       if (err)
  //         return next({
  //           log: 'Error in user.find middleware',
  //           message: err,
  //         });

  //       bcrypt.compare(password, foundUser.password, (err, result) => {
  //         if (err) {
  //           return 'error';
  //         }
  //         if (result) {
  //           res.locals.username = foundUser.username;
  //           res.locals.prefLocations = foundUser.prefLocations;
  //           return next();
  //         }
  //         return res.status(418).send('Permission denied');
  //       });
  //     }
  //   );
  // },

  // execute if user wants to update their preferred locations in the database
  updateUser(req, res, next) {
    const { username, password, prefLocations } = req.body;
    User.findOneAndUpdate(
      {
        username: username,
        password: password,
        prefLocations: prefLocations,
      },
      {
        prefLocations: prefLocations,
      },
      { upsert: true, new: true },
      (err, userObj) => {
        if (err) return err;
        res.locals.updatedUser = userObj;
        return next();
      }
    );
  },
};

module.exports = userController;
