import React, { useEffect, useState } from "react";
import axios from "axios";
import CSRFToken from "../components/CSRFToken";
import { useToken } from "../hooks/useToken";
import { useSelector } from "react-redux";

const Messages = () => {
  const token = useToken();
  const username = useSelector((store) => store.accountReducer.user.username);
  const [receiver, setReceiver] = useState("testAcc123");
  const [message, setMessage] = useState();
  const [conversation, setConversation] = useState([]);

  // const getAllReceivers -> User[]
  // onClick button -> setReceiver(someReceiver.username)

  const sendMessage = (message) => {
    axios
      .post(
        "/api/messages/",
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

  const getConversation = () => {
    const requestConfig = {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        send_to: receiver,
      },
    };

    axios
      .get("/api/messages/", requestConfig)
      .then((res) => {
        setConversation(res.data.reverse());
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (receiver) {
      getConversation(receiver);
    }
  }, [receiver]);

  useEffect(() => {
    setMessage(null);
  }, [conversation]);

  /**
   * Right now, current user's messages are red, the messages receeived are black.
   * We can change this in our css to fit our design
   *
   * Eg: Instead of {color: "red"}, we could give it a className="sender" and
   * edit that in css
   */
  if (receiver) {
    return (
      <div className="Messages">
        <p>{receiver}</p>
        {conversation.map((message, key) => {
          return (
            <p
              key={key}
              style={
                message.sender == username
                  ? { color: "red" }
                  : { color: "black" }
              }
            >
              {message.sender}: {message.message}
            </p>
          );
        })}
        <form
          method="post"
          onSubmit={(e) => {
            sendMessage(message);
          }}
        >
          <input
            type="text"
            name="message"
            onChange={handleChange}
            autoComplete="false"
          />
          <input type="submit" value="Send" />
          <CSRFToken />
        </form>
      </div>
    );
  } else {
    return <h1>Messages List</h1>;
  }
};

export default Messages;
