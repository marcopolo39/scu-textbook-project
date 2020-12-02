import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Row, Container, CardColumns } from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setReceiver } from "../actions/messageActions";
import TextbookBoxItem from "../components/TextbookBoxItem";
import "../css/ProfileInfoBlock.css";

const ProfileInfoBlock = ({ user, isEditable, setEditing, token }) => {
  const [userTexbooks, setUserTextbooks] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const goToChat = () => {
    axios
      .get("/api/messages/chat-list/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const chats = res.data.filter(
          (chat) => chat.username === user.username
        );
        if (chats.length === 0) {
          createChat();
        }
        dispatch(setReceiver(user.username));
        history.push("/messages");
      })
      .catch((err) => console.dir(err));
  };

  const createChat = () => {
    axios
      .post(
        "/api/messages/create-chat/",
        {
          members: [user.username],
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .catch((err) => console.dir(err));
  };

  const getUserTextbooks = () => {
    axios
      .get("/api/textbook/list/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setUserTextbooks(
          res.data.filter((book) => book.owner == user.username)
        );
      })
      .catch((err) => console.dir(err));
  };

  const deleteTextbook = (book) => {
    console.dir(book);
    axios
      .delete(`/api/textbook/delete/${book.pk}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => getUserTextbooks())
      .catch((err) => console.dir(err));
  };

  useEffect(() => {
    getUserTextbooks();
  }, [user]);

  return (
    <div className="ProfileInfoBlock">
      <Container fluid>
        <Row>
          <h1 style={{ marginRight: "10px" }}>{user.username}</h1>
          {isEditable ? (
            <Button onClick={() => setEditing(true)}>Edit</Button>
          ) : undefined}
        </Row>
      </Container>

      <img src={user.img} alt="profile image" />
      <p className="userInfoTxt">
        Name: {user.firstName} {user.lastName}
      </p>
      <p className="userInfoTxt">Email: {user.email}</p>
      <p className="userInfoTxt">School: {user.school}</p>
      <p className="userInfoTxt">Location: {user.location}</p>
      <p className="userInfoTxt">Paypal Username: {user.paypalUsername}</p>
      {!isEditable && token ? (
        <Button onClick={goToChat}>Message</Button>
      ) : undefined}
      <h3>{user.username}'s Textbooks</h3>
      <Container>
        <Row>
          <CardColumns>
            {userTexbooks && userTexbooks.length > 0 ? (
              userTexbooks.map((book, key) => {
                return (
                  <TextbookBoxItem
                    key={key}
                    textbook={book}
                    className="textbookListCard"
                    buttonName="Delete"
                  >
                    <Button onClick={() => console.log("Enter edit function")}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteTextbook(book)}>Delete</Button>
                  </TextbookBoxItem>
                );
              })
            ) : (
              <p>No Textbooks Found.</p>
            )}
          </CardColumns>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileInfoBlock;
