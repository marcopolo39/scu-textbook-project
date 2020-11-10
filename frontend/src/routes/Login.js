import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setToken } from "../actions/accountActions";

const Login = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "testUser",
    email: "testEmail@gmail.com",
    firstName: "Test",
    lastName: "User",
    school: "Test School",
    location: "Test Location",
    password: "Test Password",
  });

  const token = useSelector((store) => store.accountReducer.token);

  const registerAccount = () => {
    axios
      .post("/api/account/register", {
        username: user.username,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        school: user.school,
        location: user.location,
        password: user.password,
      })
      .then((res) => {
        console.log("User created:");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loginAccount = () => {
    axios
      .post("/api/account/login", {
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        dispatch(setToken(res.data.token));
      })
      .catch((err) => console.log(err));
  };

  const logoutAccount = () => {
    const headers = {
      Authorization: `Token ${token}`,
    };
    axios
      .post("/api/account/logout", null, {
        headers: headers,
      })
      .then((res) => {
        dispatch(setToken(null));
        console.log("Logged Out");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return token ? (
    <div className="Login">
      <p>You are Logged In</p>
      <button onClick={logoutAccount}>Test Logout</button>
    </div>
  ) : (
    <div className="Login">
      <p>Login</p>
      <button onClick={registerAccount}>Test Register</button>
      <button onClick={loginAccount}>Test Login</button>
    </div>
  );
};

export default Login;
