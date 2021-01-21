const path = require("path");
// importing express here 👇
const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("./controllers/googleCredentials");

// requiring routers here
const apiRouter = require("./routes/api.js");
const signupRouter = require("./routes/signup.js");
const loginRouter = require("./routes/login.js");
const googleRouter = require("./routes/google.js");

// parsing any JSON body we get first
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

// flow check -> quick check what requests we get from the client instead of checking the Network Tab in Chrome DevTools
// app.use((req, res, next) => {
//   console.log(`
//   *** FLOW METHOD ***\n
//   URL: ${req.url}\n
//   BODY: ${req.body}\n
//   METHOD: ${req.method}\n`);
//   return next();
// });

app.use(
  cookieSession({
    name: "LocallySCRD",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next(); // dont forget this
// });

// route handlers here 🤹
app.use("/api", apiRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/google", googleRouter);

/*** MAIN PAGE ***/

// directs the request to the assets folder for images
app.use("/assets", express.static(path.join(__dirname, "../client/assets")));
// for the devServer
app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.status(200).json({ msg: "good!" });
});

// catch all
app.use("*", (req, res, next) => {
  return res.status(404).send("This is not the page you're looking for...");
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "Interval Server Error" },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

// app.listen moved to start.js file because when running tests, app.listen
// needs to be run from the test file so there are no "port in use" conflicts

module.exports = app;
