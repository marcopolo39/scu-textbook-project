import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { useToken } from "../hooks/useToken";
import { useSelector, useDispatch } from "react-redux";
import { setReceiver } from "../actions/messageActions";
import {
  Alert,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "../css/Messages.css";
import { useLoader } from "../hooks/useLoader";
import Loader from "../components/Loader";

const Messages = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const username = useSelector((store) => store.accountReducer.user.username);
  const receiver = useSelector(
    (store) => store.messageReducer.conversationReceiver
  );
  const [loaded, setLoaded] = useLoader();

  const [message, setMessage] = useState();
  const [conversation, setConversation] = useState([]);
  const [allReceivers, setAll] = useState([]);

  // Maybe later: add timestamps

  const getAllConversations = () => {
    axios
      .get("/api/messages/chat-list/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        let chatList = res.data.map((chat) => chat.username);
        setAll(chatList);
        setLoaded(true);
      });
  };

  const sendMessage = (message) => {
    axios
      .post(
        "/api/messages/conversation/",
        {
          send_to: receiver,
          message: message,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": cookie.load("csrftoken"),
          },
        }
      )
      .catch((err) => console.dir(err));
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
      .get("/api/messages/conversation/", requestConfig)
      .then((res) => {
        setConversation(res.data.reverse());
      })
      .catch((err) => console.dir(err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (receiver) {
      getConversation(receiver);
    } else {
      getAllConversations();
    }
  }, [receiver]);

  useEffect(() => {
    setMessage(null);
  }, [conversation]);

  if (receiver) {
    return (
      <div className="Messages">
        <h1>{receiver}</h1>
        <div className="chatContainer clearfix">
          {conversation.map((message, key) => {
            return (
              <div
                key={key}
                className={`col-lg-6 col-md-12 col-md-12 ${
                  message.sender == username ? "floatRight" : "floatLeft"
                }`}
              >
                <Alert
                  color={`${
                    message.sender == username ? "primary" : "secondary"
                  }`}
                >
                  {message.message}
                </Alert>
              </div>
            );
          })}
        </div>
        <Form onSubmit={() => sendMessage(message)}>
          <InputGroup>
            <Input onChange={handleChange} />
            <InputGroupAddon addonType="prepend">
              <Button onChange={handleChange} type="submit">
                Send
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>

        <Button
          onClick={() => {
            dispatch(setReceiver(null));
            setLoaded(false);
          }}
        >
          Back to Messages
        </Button>
      </div>
    );
  } else {
    if (loaded) {
      return (
        <div className="Messages">
          <h1 className="center">Messaging</h1>
          <ListGroup className="conversationsContainer col-lg-6 col-md-6 col-sm-6 clickable">
            {allReceivers.map((rec, key) => {
              return (
                <ListGroupItem
                  key={key}
                  onClick={() => dispatch(setReceiver(rec))}
                >
                  {rec}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
};

export default Messages;
