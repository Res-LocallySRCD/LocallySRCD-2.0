const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { clientID, clientSecret } = require("../settings");
const User = require("../models/userModel");
const findOrCreate = require("mongoose-findorcreate");

const googleController = {};

// googleController.login = (req, res, next) => {
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID,
//       clientSecret,
//       callbackURL: "http://localhost:8080/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       User.findOrCreate(
//         { username: profile.displayName },
//         { password: profile.displayName },
//         function (err, user) {
//           // console.log(user);
//           if (err) {
//             return next(err);
//           }
//           return done(null, profile);
//         }
//       );
//     }
//   )
// );
// };

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.authenticate("google", { scope: ["profile", "email"] });
// (req, res, next)

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "http://localhost:8080/google/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      //check if the user exists, and add to db if not
      User.findOrCreate(
        { username: profile.displayName },
        { password: profile.displayName },
        function (err, user) {
          // console.log(user);
          if (err) {
            return done(err);
          }
          //update last sign-in field in db

          // res.cookie("test", "value");
        }
      );
      User.findOneAndUpdate(
        { username: profile.displayName },
        { lastGoogleSignIn: Date.now() },
        { upsert: true, new: true },
        (err, user) => {
          if (err) {
            return done(err);
          }
          // console.log("this is the second db query: ", user);
        }
      );
      return done(null, profile);
    }
  )
);

// const filter = { name: 'Jean-Luc Picard' };
// const update = { age: 59 };

// // `doc` is the document _after_ `update` was applied because of
// // `new: true`
// let doc = await Character.findOneAndUpdate(filter, update, {
//   new: true
// });
// doc.name; // 'Jean-Luc Picard'
// doc.age; // 59
