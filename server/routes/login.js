const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const passport = require("passport");
require("../controllers/loginCredentials");

// router.post('/', userController.getUser, (req, res) => {
//   res.status(200).json(res.locals);
// });

router.post(
  "/",
  passport.authenticate("local", {
    // successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res) => {
    // console.log("this is the req: ", req.body);
    res.status(200).json(req.body.username);
  }
);

router.get("/", userController.getGoogleUser, (req, res) => {
  res.status(200).json(res.locals.username);
});

module.exports = router;
