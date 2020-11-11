import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cookie from "react-cookies";

import { setToken } from "../actions/accountActions";

import { useLogout } from "../hooks/useLogout";

import Registration from "../components/Registration";

const Login = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [registering, setRegistering] = useState(false);

  const token = useSelector((store) => store.accountReducer.token);

  const logout = useLogout();

  const loginAccount = (e) => {
    e.preventDefault();
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
            // password: res.data.password, --> not implemented yet, might need it later?
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (!token) {
    if (registering) {
      return (
        <div className="Login">
          <Registration />
        </div>
      );
    } else {
      return (
        <div className="Login">
          <p>Login</p>
          <form method="post" onSubmit={loginAccount}>
            <p>Username</p>
            <input type="text" name="username" onChange={handleChange} />
            <p>Password</p>
            <input type="text" name="password" onChange={handleChange} />
            <input
              type="hidden"
              value={cookie.load("csrftoken")}
              name="csrfmiddlewaretoken"
            />
            <input type="submit" />
          </form>
          <button onClick={() => setRegistering(true)}>Register</button>
        </div>
      );
    }
  } else {
    return (
      <div className="Login">
        <p>You are Logged In</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
};

export default Login;
