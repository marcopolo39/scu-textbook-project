import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import "../css/Registration.css";
import {
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  CustomInput,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import findabook from "../../admin/img/findabook.png";

const Registration = () => {
  const [user, setUser] = useState({});
  const history = useHistory();

  const inputFieldStyle = {
    width: "500px",
    height: "35px",
    marginTop: "15px",
    marginLeft: "20px",
  };

  /** Calls POST request to /api/account/register with input user data to create user
   * TODO: handle errors
   */
  const registerAccount = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("first_name", user.firstName);
    formData.append("last_name", user.lastName);
    formData.append("school", user.school);
    formData.append("location", user.location);
    formData.append("password", user.password);
    formData.append("paypal_username", user.paypalUsername);
    formData.append("profile_img", user.img, user.img.name);

    axios
      .post("/api/account/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": cookie.load("csrftoken"),
        },
      })
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const handleImageUpload = (e) => {
    setUser({
      ...user,
      img: e.target.files[0],
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

  // Set default user image
  useEffect(() => {
    const setDefaultImage = async () => {
      const res = await fetch(findabook);
      const blob = await res.blob();
      const file = new File([blob], "findabook.png", { type: blob.type });
      setUser({
        ...user,
        img: file,
      });
    };
    setDefaultImage();
  }, []);

  return (
    <div className="Registration">
      <h1 className="registerHeader">Register Account</h1>

      <InputGroup style={inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Username</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="username"
          className="inputField"
          onChange={handleChange}
          autoComplete="off"
          placeholder="Username..."
          required
        />
      </InputGroup>
      <br />
      <InputGroup style={inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Password</InputGroupText>
        </InputGroupAddon>
        <Input
          className="inputField"
          type="password"
          name="password"
          onChange={handleChange}
          autoComplete="off"
          placeholder="Password..."
          required
        />
      </InputGroup>
      <br />
      <InputGroup style={inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>First Name</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="firstName"
          className="inputField"
          placeholder="First Name..."
          onChange={handleChange}
          required
        />
      </InputGroup>
      <br />
      <InputGroup style={inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Last Name</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          className="inputField"
          name="lastName"
          placeholder="Last Name..."
          onChange={handleChange}
          required
        />
      </InputGroup>

      <br />
      <InputGroup style={inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Email</InputGroupText>
        </InputGroupAddon>
        <Input
          type="email"
          className="inputField"
          name="email"
          placeholder="Email..."
          onChange={handleChange}
          required
        />
      </InputGroup>

      <br />
      <InputGroup style={inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>School</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="school"
          placeholder="School..."
          onChange={handleChange}
          autoComplete="off"
          className="inputField"
          required
        />
      </InputGroup>
      <br />
      <InputGroup style={inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Location (City, State)</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="location"
          placeholder="Location..."
          onChange={handleChange}
          autoComplete="off"
          required
          className="inputField"
          required
        />
      </InputGroup>
      <br />
      <InputGroup style={inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Paypal Username</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="paypalUsername"
          placeholder="Paypal..."
          onChange={handleChange}
          autoComplete="off"
          required
          className="inputField"
        />
      </InputGroup>
      <br />
      <InputGroup style={inputFieldStyle}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Image</InputGroupText>
        </InputGroupAddon>
        <CustomInput
          type="file"
          name="image"
          id="fileInput"
          multiple={false}
          onChange={handleImageUpload}
          accept="image/*"
        />
      </InputGroup>
      <input
        type="button"
        className="continueBtn"
        value="Submit"
        onClick={registerAccount}
      />

      <button onClick={() => history.push("/login")} className="cancelBtn">
        Cancel
      </button>
    </div>
  );
};

export default Registration;
