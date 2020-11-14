import React, { useEffect, useState } from "react";
import axios from "axios";
import CSRFToken from "../components/CSRFToken";
import { useToken } from "../hooks/useToken";
import { useSelector, useDispatch } from "react-redux";
import { setReceiver } from "../actions/messageActions";

const Messages = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const username = useSelector((store) => store.accountReducer.user.username);
  const receiver = useSelector(
    (store) => store.messageReducer.conversationReceiver
  );

  const [message, setMessage] = useState();
  const [conversation, setConversation] = useState([]);
  const [allReceivers, setAll] = useState([
    "testAcc123",
    "dtlndo",
    "dlindo-admin",
  ]);

  // const getAllReceivers -> User[]
  // onClick button -> setReceiver(someReceiver.username)
  // TODO: move state to redux (in progress)
  // TODO: validate receiver exists

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
        <h1>{receiver}</h1>
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
            autoComplete="off"
          />
          <input type="submit" value="Send" />
          <CSRFToken />
        </form>
        <button onClick={() => dispatch(setReceiver(null))}>
          Back to Messages
        </button>
      </div>
    );
  } else {
    return (
      <div className="Messages">
        <h1>Messages List</h1>
        {allReceivers.map((rec, key) => {
          //if receiverIsValid(rec) {
          return (
            <div key={key} onClick={() => dispatch(setReceiver(rec))}>
              <h3>{rec}</h3>
            </div>
          );
          // }
        })}
      </div>
    );
  }
};

export default Messages;
