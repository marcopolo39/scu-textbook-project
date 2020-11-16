import React, { useEffect, useState } from "react";
import axios from "axios";
import CSRFToken from "../components/CSRFToken";
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
    "testAcc456",
    "dlindo-admin",
  ]);

  // const getAllReceivers -> User[]
  // TODO: validate receiver exists?
  // Maybe later: add timestamps

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
            <CSRFToken />
          </InputGroup>
        </Form>

        <Button onClick={() => dispatch(setReceiver(null))}>
          Back to Messages
        </Button>
      </div>
    );
  } else {
    return (
      <div className="Messages">
        <h1 className="center">Messages</h1>
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
  }
};

export default Messages;
