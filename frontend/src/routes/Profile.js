import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileInfoBlock from "../components/ProfileInfoBlock";
import ProfileEditor from "../components/ProfileEditor";
import "../css/Profile.css";
import { useToken } from "../hooks/useToken";
import { useSelector } from "react-redux";

const ProfileHelper = ({ location }) => {
  const pathUsername = location.pathname.split("/")[2];
  const token = useToken();
  const [user, setUser] = useState({});
  const curUsername = useSelector(
    (store) => store.accountReducer.user.username
  );
  const [editing, setEditing] = useState(false);

  // Get user object
  useEffect(() => {
    if (pathUsername) {
      axios
        .get("/api/account/profile/", {
          params: {
            username: pathUsername,
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
            paypalUsername: res.data.paypal_username,
          });
        })
        .catch((err) => console.dir(err));
    } else {
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
            paypalUsername: res.data.paypal_username,
          });
        })
        .catch((err) => console.dir(err));
    }
  }, []);

  if (Object.keys(user).length > 0) {
    if (pathUsername && pathUsername !== curUsername) {
      // Display others' profile
      return <ProfileInfoBlock user={user} isEditable={false} token={token} />;
    } else {
      if (token) {
        if (editing) {
          // Display editing screen
          return (
            <ProfileEditor user={user} token={token} setEditing={setEditing} />
          );
        } else {
          // Display personal profile
          return (
            <ProfileInfoBlock
              user={user}
              isEditable={true}
              setEditing={setEditing}
              token={token}
            />
          );
        }
      } else {
        // Not logged in, can't view personal profile
        return (
          <div className="Profile">
            <h3>Login to view your profile</h3>
          </div>
        );
      }
    }
  } else {
    if (pathUsername) {
      return (
        <div className="Profile">
          <h3>Profile not Found</h3>
        </div>
      );
    } else {
      return (
        <div className="Profile">
          <h3>Login to view your profile</h3>
        </div>
      );
    }
  }
};

const Profile = ({ location }) => {
  return (
    <div className="Profile">
      <ProfileHelper location={location} />
    </div>
  );
};

export default Profile;
