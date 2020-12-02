import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from "reactstrap";
import "../css/ProfileEditor.css";

const ProfileEditor = ({ user, token, setEditing }) => {
  const [editedUser, setEditiedUser] = useState(user);

  /** Calls PUT request to /api/account/update/id with new input user data to update user
   * TODO: handle errors
   */
  const updateAccount = () => {
    axios
      .put(
        `/api/account/update/${user.id}`,
        {
          username: editedUser.username,
          email: editedUser.email,
          first_name: editedUser.firstName,
          last_name: editedUser.lastName,
          school: editedUser.school,
          location: editedUser.location,
          paypal_username: editedUser.paypalUsername,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
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
      <Button onClick={() => setEditing(false)}>Cancel</Button>
      <Button onClick={updateAccount}>Submit</Button>
    </div>
  );
};

export default ProfileEditor;
