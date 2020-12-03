import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Row, Container, CardColumns } from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { setReceiver } from "../actions/messageActions";
import TextbookBoxItem from "../components/TextbookBoxItem";
import TextbookEditor from "./TextbookEditor";
import "../css/ProfileInfoBlock.css";

const ProfileInfoBlock = ({ user, isEditable, setEditing, token }) => {
  const [userTexbooks, setUserTextbooks] = useState();
  const [editedTextbook, setEditedTextbook] = useState();
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

  const updateTextbook = () => {
    const formData = new FormData();
    formData.append("isbn", editedTextbook.isbn);
    formData.append("price", editedTextbook.price);
    formData.append("title", editedTextbook.title);
    formData.append("authors", editedTextbook.authors);
    formData.append("condition", editedTextbook.condition || 1);
    formData.append("volume_edition", editedTextbook.volume || null);
    formData.append("comments", editedTextbook.comments);
    formData.append("state", editedTextbook.state || "F");
    formData.append(
      "image",
      editedTextbook.img || null,
      editedTextbook.img.name || null
    );
    axios
      .put(`/api/textbook/update/${editedTextbook.pk}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.dir(err));
    document.querySelector(".profileBlock").style.display = "block";
    document.querySelector(".TextbookEditBlock").style.display = "none";
  };

  useEffect(() => {
    getUserTextbooks();
  }, [user]);

  return (
    <div className="ProfileInfoBlock">
      <div className="TextbookEditBlock" style={{ display: "none" }}>
        <h1>Edit your textbook listing</h1>
        {editedTextbook ? (
          <TextbookEditor
            textbookModel={editedTextbook}
            setTextbookModel={setEditedTextbook}
            onSubmit={updateTextbook}
            onCancel={() => {
              document.querySelector(".profileBlock").style.display = "block";
              document.querySelector(".TextbookEditBlock").style.display =
                "none";
            }}
          />
        ) : undefined}
      </div>
      <div className="profileBlock">
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
                  if (isEditable) {
                    return (
                      <TextbookBoxItem
                        key={key}
                        textbook={book}
                        className="textbookListCard"
                        buttonName="Delete"
                      >
                        <Button
                          onClick={() => {
                            setEditedTextbook(book);
                            document.querySelector(
                              ".profileBlock"
                            ).style.display = "none";
                            document.querySelector(
                              ".TextbookEditBlock"
                            ).style.display = "block";
                          }}
                        >
                          Edit
                        </Button>
                        <Button onClick={() => deleteTextbook(book)}>
                          Delete
                        </Button>
                      </TextbookBoxItem>
                    );
                  } else {
                    return (
                      <TextbookBoxItem
                        key={key}
                        textbook={book}
                        className="textbookListCard"
                        buttonName="Delete"
                      >
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "#CA521F",
                          }}
                          tag={Link}
                          to={{
                            pathname: `/textbook/${book.pk}`,
                            textbook: book,
                          }}
                          color="link"
                        >
                          Go
                        </Button>
                      </TextbookBoxItem>
                    );
                  }
                })
              ) : (
                <p>No Textbooks Found.</p>
              )}
            </CardColumns>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProfileInfoBlock;
