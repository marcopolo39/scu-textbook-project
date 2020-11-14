import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLogout } from "../hooks/useLogout";
import { useLogin } from "../hooks/useLogin";
import { useToken } from "../hooks/useToken";

import Registration from "../components/Registration";
import CSRFToken from "../components/CSRFToken";

const Login = () => {
  const [user, setUser] = useState({});
  const [registering, setRegistering] = useState(false);

  const token = useToken();
  const logout = useLogout();
  const login = useLogin();

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

  if (!token) {
    if (registering) {
      return (
        <div className="Login">
          <Registration setRegistering={setRegistering} />
        </div>
      );
    } else {
      return (
        <div className="Login">
          <p>Login</p>
          <form method="post" onSubmit={handleLogin}>
            <p>Username</p>
            <input type="text" name="username" onChange={handleChange} />
            <p>Password</p>
            <input type="password" name="password" onChange={handleChange} />
            <CSRFToken />
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
