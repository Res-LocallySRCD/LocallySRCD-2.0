const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "555648017099-hipgd4l2e0k76dihvavjtn2jc3jbgcl3.apps.googleusercontent.com",
      clientSecret: "sQ1oahRQdeVYVfYnquwuYOTM",
      callbackURL: "http://localhost:8080/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      // console.log(profile.dis)
      // console.log(profile)
      // console.log(email);
      return done(null, profile);
    }
  )
);
