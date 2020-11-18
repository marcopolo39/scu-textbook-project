import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Registration from "../components/Registration";
import PageHeader from "./components/PageHeader.js";
import CSRFToken from "../components/CSRFToken";
import "../css/Login.css";
import axios from "axios";

import { useLogout } from "../hooks/useLogout";
import { useLogin } from "../hooks/useLogin";
import { useToken } from "../hooks/useToken";

const Login = ({ location }) => {
  const [user, setUser] = useState({});
  const [registering, setRegistering] = useState(location.isRegistering);

  const token = useToken();
  const logout = useLogout();
  const login = useLogin();
  const isLoggedIn = () => (token ? true : false);

  const handleLogin = (e) => {
    e.preventDefault();
    login(user);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  /** Initializes user state if logged in */
  useEffect(() => {
    if (token) {
      axios
        .get("/api/account/user", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          setUser({
            id: res.data.id,
            username: res.data.username,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            email: res.data.email,
            school: res.data.school,
            location: res.data.location,
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (!isLoggedIn()) {
    if (registering) {
      return (
        <div className="loginBlock">
          <Registration setRegistering={setRegistering} />
        </div>
      );
    } else {
      return (
        <div className="Login">
          <PageHeader />

          <div className="loginBlock">
            <div className="loginHeader"> Log In </div>
            <div className="headerLineBreak"></div>
            <form method="post" onSubmit={handleLogin}>
              <input
                className="usernameEntryField"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
              />
              <div className="lineBreak"></div>
              <input
                className="passwordEntryField"
                type="text"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <div className="lineBreak"></div>
              <input
                className="loginBtn"
                type="submit"
                value="Login"
                onChange={handleChange}
              />

              <input
                className="signUpBtn"
                type="submit"
                value="Sign Up"
                onChange={() => setRegistering(true)}
              />
              <CSRFToken />
            </form>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="Login">
        <p>You are Logged In</p>
        <button onClick={logout}>Logout</button>
        <Link to="/">Home</Link>
      </div>
    );
  }
};

export default Login;
