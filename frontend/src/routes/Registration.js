import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import axios from "axios";
import CSRFToken from "../components/CSRFToken";
import "../css/Registration.css"
import {InputGroupAddon, InputGroupText, InputGroup, Input} from "reactstrap";

const Registration = ({ setRegistering }) => {
  const [user, setUser] = useState({});
  const login = useLogin();

   const inputFieldStyle = {
    width: "500px",
    height:"35px",
    marginTop:"15px",
    marginLeft: "20px"


  };

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
      paypal_username: user.paypalUsername
    };




          axios
              .post("/api/account/register/", data, {
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
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
        <form onSubmit={registerAccount} method="POST"  >
        <InputGroup style = {inputFieldStyle}>
       <InputGroupAddon addonType="prepend">
          <InputGroupText>Username</InputGroupText>
        </InputGroupAddon>
        <Input

          type="text"
          name="username"
        className = "inputField"
          onChange={handleChange}
          autoComplete="off"
          placeholder = "Username..."
          required
        />
         </InputGroup>
          <br/>
          <InputGroup style = {inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Password</InputGroupText>
        </InputGroupAddon>
        <Input
        className = "inputField"
          type="password"
          name="password"
          onChange={handleChange}
          autoComplete="off"
          placeholder = "Password..."
          required
        />
        </InputGroup>
        <br />
        <InputGroup style = {inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>First Name</InputGroupText>
        </InputGroupAddon>
        <Input
            type="text"
            name="firstName"
            className = "inputField"
            placeholder = "First Name..."
            onChange={handleChange}
            required
        />
        </InputGroup>
          <br />
       <InputGroup style = {inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Last Name</InputGroupText>
        </InputGroupAddon>
        <Input
            type="text"
            className = "inputField"
            name="lastName"
            placeholder = "Last Name..."
            onChange={handleChange}
            required
            />
        </InputGroup>

        <br />
         <InputGroup style = {inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Email</InputGroupText>
        </InputGroupAddon>
        <Input
            type="email"
            className = "inputField"
            name="email"
            placeholder = "Email..."
            onChange={handleChange}
            required
            />
        </InputGroup>


        <br/>
        <InputGroup style = {inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>School</InputGroupText>
        </InputGroupAddon>
        <Input
            type="text"
          name="school"
          placeholder = "School..."
          onChange={handleChange}
          autoComplete="off"
          className = "inputField"
            />
        </InputGroup>
          <br/>
           <InputGroup style = {inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Location </InputGroupText>
        </InputGroupAddon>
        <Input
           type="text"
          name="location"
          placeholder = "Location..."
          onChange={handleChange}
          autoComplete="off"
          required
          className = "inputField"
            />
        </InputGroup>
        <br />
          <InputGroup style = {inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Paypal Username</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="paypalUsername"
          placeholder = "Paypal..."
          onChange={handleChange}
          autoComplete="off"
          required
          className = "inputField"
            />
        </InputGroup>
        <br/>
            <input type="submit"   className = "continueBtn" value="Submit"/>
            <CSRFToken />
        </form>
      <button onClick={() => setRegistering(false)}  className = "cancelBtn" >Cancel</button>
    </div>
  );
};

export default Registration;
