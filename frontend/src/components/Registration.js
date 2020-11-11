import React, { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

const Registration = () => {
  const [user, setUser] = useState({});

  /** Calls POST request to /api/account/register with input user data
   * TODO: handle errors
   */
  const registerAccount = (e) => {
    e.preventDefault();
    axios
      .post("/api/account/register", {
        username: user.username,
        password: user.password,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        school: user.school,
        location: user.location,
      })
      .catch((err) => console.log(err));
  };

  /** Updates user state on change in text input field */
  const handleChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="Registration">
      <p>Register Account</p>
      <form method="post" onSubmit={registerAccount}>
        <p>Username</p>
        <input type="text" name="username" onChange={handleChange} />
        <p>Password</p>
        <input type="text" name="password" onChange={handleChange} />
        <p>First Name</p>
        <input type="text" name="firstName" onChange={handleChange} />
        <p>Last Name</p>
        <input type="text" name="lastName" onChange={handleChange} />
        <p>Email</p>
        <input type="text" name="email" onChange={handleChange} />
        <p>School</p>
        <input type="text" name="school" onChange={handleChange} />
        <p>Location</p>
        <input type="text" name="location" onChange={handleChange} />
        <input
          type="hidden"
          value={cookie.load("csrftoken")}
          name="csrfmiddlewaretoken"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Registration;
