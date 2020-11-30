import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import axios from "axios";
import CSRFToken from "./CSRFToken";
import "../css/Registration.css"

const Registration = ({ setRegistering }) => {
  const [user, setUser] = useState({});
  const login = useLogin();

  /** Calls POST request to /api/account/register with input user data to create user
   * TODO: handle errors
   */
  const registerAccount = (e) => {
    e.preventDefault();
    const data = {
      username: user.username,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      school: user.school,
      location: user.location,
      password: user.password,
    };
    axios
      .post("/api/account/register", data)
      .then(() => {
        login(user);
      })
      .catch((err) => {
        console.dir(err);
      });
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
      <h1 className="registerHeader">Register Account</h1>
      <form method="post" onSubmit={registerAccount}>
        <p className = "inputLbl">Username</p>
        <input
          type="text"
          name="username"
        className = "inputField"
          onChange={handleChange}
          autoComplete="off"
          placeholder = "Username..."
          required
        />
        <p className = "inputLbl">Password</p>
        <input
        className = "inputField"
          type="password"
          name="password"
          onChange={handleChange}
          autoComplete="off"
          placeholder = "Password..."
          required
        />
        <br />
        <p className = "inputLbl">First Name</p>
        <input type="text" name="firstName"className = "inputField" placeholder = "First Name..." onChange={handleChange} required />
        <p className = "inputLbl">Last Name</p>
        <input type="text"  className = "inputField"name="lastName" placeholder = "Last Name..." onChange={handleChange} required />
        <br />
        <p className = "inputLbl">Email</p>
        <input type="email" className = "inputField" name="email" placeholder = "Email..." onChange={handleChange} required />
        <br/>
        <p className = "inputLbl" >School</p>
        <input
          type="text"
          name="school"
          placeholder = "School..."
          onChange={handleChange}
          autoComplete="off"
          className = "inputField"
        />
        <p className = "inputLbl">Location</p>
        <input
          type="text"
          name="location"
          placeholder = "Location..."
          onChange={handleChange}
          autoComplete="off"
          required
          className = "inputField"
        />
        <CSRFToken />
        <br/>
        <input type="submit"  className = "continueBtn" />
      </form>
      <button onClick={() => setRegistering(false)}  className = "cancelBtn" >Cancel</button>
    </div>
  );
};

export default Registration;
