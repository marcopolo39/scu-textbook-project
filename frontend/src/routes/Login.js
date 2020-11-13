import React from "react";
import PageHeader from "./components/PageHeader.js"
import "../css/Login.css";

const Login = () => {
  return(
      <div>
        <PageHeader />
        <div className = "loginBlock">
            <h1> Login </h1>
          <input className = "usernameEntryField" type="text" name="userID" placeholder="Email or Username"/>
          <input className = "passwordEntryField" type="text" name="userPass" placeholder="Password"/>
          <input className = "signUpBtn" type = "submit" value = "Sign Up" />
          <input className = "loginBtn" type = "submit" value = "Login" />
        </div>
      </div>
  );
};

export default Login;
