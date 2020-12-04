import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  CustomInput,
} from "reactstrap";
import "../css/ProfileEditor.css";

const ProfileEditor = ({ user, token, setEditing }) => {
  const [editedUser, setEditiedUser] = useState(user);
  const inputFieldStyle = {
    width: "500px",
    height: "35px",
    marginTop: "15px",
    marginLeft: "20px",
  };

  /** Calls PUT request to /api/account/update/id with new input user data to update user
   * TODO: handle errors
   */
  const updateAccount = () => {
    const formData = new FormData();
    formData.append("username", editedUser.username);
    formData.append("email", editedUser.email);
    formData.append("first_name", editedUser.firstName);
    formData.append("last_name", editedUser.lastName);
    formData.append("school", editedUser.school);
    formData.append("location", editedUser.location);
    formData.append("password", editedUser.password);
    formData.append("paypal_username", editedUser.paypalUsername);
    formData.append("profile_img", editedUser.img, editedUser.img.name);
    axios
      .put(`/api/account/update/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => setEditing(false))
      .catch((err) => console.dir(err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setEditiedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    setEditiedUser({
      ...editedUser,
      img: e.target.files[0],
    });
  };

  return (
    <div className="ProfileEditor">
      <p>Edit Profile</p>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Username</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder={user.username}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>First Name</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder={user.firstName}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Last Name</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder={user.lastName}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Email</InputGroupText>
        </InputGroupAddon>
        <Input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder={user.email}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>School</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="school"
          onChange={handleChange}
          placeholder={user.school}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Location (City, State)</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder={user.location}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Paypal</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="paypalUsername"
          onChange={handleChange}
          placeholder={user.paypalUsername}
        />
      </InputGroup>
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
      <Button onClick={() => setEditing(false)}>Cancel</Button>
      <Button onClick={updateAccount}>Submit</Button>
    </div>
  );
};

export default ProfileEditor;
