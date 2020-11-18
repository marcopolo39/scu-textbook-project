import axios from "axios";
import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.js";
import ProfileEditor from "../components/ProfileEditor";
import "../css/Profile.css";
import { useToken } from "../hooks/useToken";


const Profile = () => {
  const token = useToken();
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
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
  }, []);

  if (token) {
    if (!editing) {
      return (
        <div className="Profile">
          <PageHeader />
          <p>Username: {user.username}</p>
          <p>
            Name: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
          <p>School: {user.school}</p>
          <p>Location: {user.location}</p>
          <button className = "editBtn" onClick={() => setEditing(true)}>Edit</button>
        </div>
      );
    } else {
      return (
        <div className="Profile">
          <PageHeader />
          <ProfileEditor user={user} token={token} />
          <button className = "closeBtn" onClick={() => setEditing(false)}>Close</button>
        </div>
      );
    }
  } else {
    return (
      <div className="Profile">
        <PageHeader />
        <p>Log in to view Profile</p>
      </div>
    );
  }
};

export default Profile;
