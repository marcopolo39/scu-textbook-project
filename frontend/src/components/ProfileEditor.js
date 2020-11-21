import React, { useState } from "react";
import axios from "axios";
import CSRFToken from "./CSRFToken";

const ProfileEditor = ({ user, token }) => {
  const [editiedUser, setEditiedUser] = useState(user);

  /** Calls PUT request to /api/account/update/id with new input user data to update user
   * TODO: handle errors
   */
  const updateAccount = () => {
    axios
      .put(
        `/api/account/update/${user.id}`,
        {
          username: editiedUser.username,
          email: editiedUser.email,
          first_name: editiedUser.firstName,
          last_name: editiedUser.lastName,
          school: editiedUser.school,
          location: editiedUser.location,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .catch((err) => console.dir(err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setEditiedUser({
      ...editiedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="ProfileEditor">
      <p>Edit Profile</p>
      <form method="post" onSubmit={updateAccount}>
        <p>Username</p>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder={user.username}
        />
        <p>First Name</p>
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder={user.firstName}
        />
        <p>Last Name</p>
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder={user.lastName}
        />
        <p>Email</p>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder={user.email}
        />
        <p>School</p>
        <input
          type="text"
          name="school"
          onChange={handleChange}
          placeholder={user.school}
        />
        <p>Location</p>
        <input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder={user.location}
        />
        <CSRFToken />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ProfileEditor;
