import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../hooks/useToken";

const Messages = () => {
  const token = useToken();
  const [otherUser, setOtherUser] = useState("testAcc123"); // change later
  const [currentUsername, setCurrentUsername] = useState();
  const [conversation, setConversation] = useState([]);

  const getCurrentUser = () => {
    axios
      .get("/api/account/user", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setCurrentUsername(res.data.username);
      })
      .catch((err) => console.log(err));
  };

  const sendMessage = (receiver, message) => {
    axios
      .post(
        "/api/messages",
        {
          send_to: receiver,
          message: message,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .catch((err) => console.log(err));
  };

  const getConversation = (username) => {
    const requestConfig = {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        send_to: username,
      },
    };
    axios
      .get("/api/messages", requestConfig)
      .then((res) => {
        setConversation(res.data.reverse());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (otherUser) {
      getConversation(otherUser);
    }
  }, [otherUser]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  /**
   * Right now, currentUser's messages are red, the messages receeived are black.
   * We can change this in our css to fit our design
   *
   * Eg: Instead of {color: "red"}, we could give it a className="sender" and
   * edit that in css
   */
  if (otherUser) {
    return (
      <div className="Messages">
        <p>{otherUser}</p>
        {conversation.map((message, key) => {
          return (
            <p
              key={key}
              style={
                message.sender == currentUsername
                  ? { color: "red" }
                  : { color: "black" }
              }
            >
              {message.sender}: {message.message}
            </p>
          );
        })}
      </div>
    );
  } else {
    return <h1>Messages</h1>;
  }
};

export default Messages;
