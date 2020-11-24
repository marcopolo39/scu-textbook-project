import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/Textbook.css";
import { useToken } from "../hooks/useToken.js";
import { Col, Container, Row, Button } from "reactstrap";
import TextbookEditor from "../components/TextbookEditor";

const Textbook = () => {
  const { pk } = useParams();
  const [user, setUser] = useState({});
  const [textbook, setTextbook] = useState({});
  const [editing, setEditing] = useState(false);
  const token = useToken();

  const states = {
    F: "For Sale",
    D: "Draft",
    S: "Sold",
  };

  const getUser = () => {
    axios
      .get("/api/account/profile/", {
        params: {
          username: textbook.owner,
        },
      })
      .then(({ data }) => setUser(data))
      .catch((err) => console.dir(err));
  };

  const handleSubmit = () => {
    axios
      .put(
        `/api/textbook/update/${pk}/`,
        {
          isbn: textbook.isbn,
          title: textbook.title,
          price: textbook.price,
          authors: textbook.authors,
          state: textbook.state,
          volume_edition: textbook.volume_edition,
          condition: textbook.condition,
          comments: textbook.comments,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => setEditing(false))
      .catch((err) => console.dir(err));
  };

  // Set textbook on mount
  useEffect(() => {
    axios
      .get(`/api/textbook/list/${pk}/`)
      .then(({ data }) => {
        setTextbook(data);
      })
      .catch((err) => console.dir(err));
  }, []);
  // Get user on change of textbook
  useEffect(() => {
    if (textbook.owner) {
      getUser();
    }
  }, [textbook]);

  if (editing) {
    return (
      <div>
        <h1>PK: {pk}</h1>
        <div className="textbookEditBlock">
          <TextbookEditor
            textbookModel={textbook}
            setTextbookModel={setTextbook}
            onCancel={() => setEditing(false)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col lg="3">
              <img src="" alt="textbook image" />
            </Col>
            <Col>
              <div className="textbookInfoBlock">
                <h1>Title: {textbook.title}</h1>
                <h1>Price: {textbook.price}</h1>
                <h1>ISBN: {textbook.isbn}</h1>
                <h1>Authors: {textbook.authors}</h1>
                <h4>{states[textbook.state]}</h4>
                {textbook.owner == user.username ? (
                  <button onClick={() => setEditing(true)}>Edit</button>
                ) : undefined}
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col lg="3">
              <img src="" alt="profile image" />
            </Col>
            <Col>
              <div className="userInfoBlock">
                <h1>Owner: {user.username}</h1>
                <h1>
                  Name: {user.first_name} {user.last_name}
                </h1>
                <h1>Email: {user.email}</h1>
                <h1>Paypal: {user.paypal_username}</h1>
                <h1>School: {user.school}</h1>
                <h1>Location: {user.location}</h1>
                <Button tag={Link} to={`/profile/${user.username}/`}>
                  Go To Profile
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default Textbook;
