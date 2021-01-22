import React, { Component } from "react";
import { Link } from "react-router-dom";

const NavBar = ({
  logInSubmitHandler,
  userStatus,
  userName,
  logoutHandler,
  signUpPop,
  signUpButtonHandler,
  createUser,
  signInWithGoogleHandler,
}) => {
  // if user is logged in, we should render a new nav bar welcoming back the user.  logInSubmitHandler={logInSubmitHandler}
  console.log("signup?", signUpPop);
  // check if user is logged in and if they have pressed to sign up
  if (!userStatus && !signUpPop) {
    return (
      <div className="login">
        <form>
          <input
            className="loginput"
            id="userName"
            type="text"
            placeholder="username"
          />
          <input
            className="loginput"
            id="passWord"
            type="password"
            placeholder="password"
          />
          <button
            id="logbutton"
            type="button"
            onClick={() => {
              const username = document.getElementById("userName").value;
              const password = document.getElementById("passWord").value;
              if (!password || !username) {
                // lets render something on the page instead of an alert
                alert("Please enter username and password!");
              } else {
                logInSubmitHandler(username, password);
              }
            }}
          >
            Log In
          </button>
          <button
            id="signup"
            type="button"
            onClick={() => signUpButtonHandler()}
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={() => {
            localStorage.setItem("didThisWork", "yes");
            // signInWithGoogleHandler();
          }}
        style={{
          border: "none",
          padding: 0,
          marginTop: 10,
          marginLeft: 523,
          backgroundColor: "white",
        }}
      >
        <span>
          <a href="/google">
            <img
              src="../assets/btn_google_signin_light_focus_web.png"
              style={{
                borderRadius: 100,
                border: "1px solid grey",
              }}
            ></img>
          </a>
          </span>
        </button>
      </div>
    );
    // if user has pressed sign up button, we return sign up form
  } else if (signUpPop) {
    return (
      <div className="signupform">
        Please sign up
        <form>
          <div>
            <input
              className="signupinput"
              aria-label="username"
              id="userName"
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <input
              className="signupinput"
              aria-label="password"
              id="passWord"
              type="password"
              placeholder="password"
            />
          </div>
        </form>
        <div>
          {/* say hello to our little panda 🐼 */}
          <button
            id="signupformbtn"
            type="button"
            onClick={() => {
              const username = document.getElementById("userName").value;
              const password = document.getElementById("passWord").value;
              createUser(username, password);
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
    // otherwise we return a welcome home message
  } else {
    return (
      <div className="loggedin">
        Welcome home, {userName}
        <button id="logbutton" type="button" onClick={() => logoutHandler()}>
          Log Out
        </button>
      </div>
    );
  }
};

export default NavBar;
