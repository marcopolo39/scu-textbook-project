import React, { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

const ProfileEditor = ({ user, token }) => {
  const [editiedUser, setEditiedUser] = useState(user);
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
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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
      <button onClick={updateAccount}>Test Edit</button>
      <form method="post" onSubmit={updateAccount}>
        <p>Username</p>
        <input type="text" name="username" onChange={handleChange} />
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

export default ProfileEditor;
