import React, { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

const Registration = ({ setRegistering }) => {
  const [user, setUser] = useState({});

  /** Calls POST request to /api/account/register with input user data to create user
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
        <input type="text" name="username" onChange={handleChange} required />
        <p>Password</p>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
        <p>First Name</p>
        <input type="text" name="firstName" onChange={handleChange} required />
        <p>Last Name</p>
        <input type="text" name="lastName" onChange={handleChange} required />
        <p>Email</p>
        <input type="email" name="email" onChange={handleChange} required />
        <p>School</p>
        <input type="text" name="school" onChange={handleChange} />
        <p>Location</p>
        <input type="text" name="location" onChange={handleChange} required />
        <input
          type="hidden"
          value={cookie.load("csrftoken")}
          name="csrfmiddlewaretoken"
        />
        <input type="submit" />
      </form>
      <button onClick={() => setRegistering(false)}>Cancel</button>
    </div>
  );
};

export default Registration;
