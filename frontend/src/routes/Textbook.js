import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/Textbook.css";
import { useToken } from "../hooks/useToken.js";
import { Col, Container, Row, Button } from "reactstrap";
import TextbookEditor from "../components/TextbookEditor";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";

const Textbook = () => {
  const { pk } = useParams();
  const [profile, setProfile] = useState({});
  const [textbook, setTextbook] = useState({});
  const [editing, setEditing] = useState(false);
  const token = useToken();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.accountReducer.user);

  const states = {
    F: "For Sale",
    D: "Draft",
    S: "Sold",
  };

  const getProfile = () => {
    axios
      .get("/api/account/profile/", {
        params: {
          username: textbook.owner,
        },
      })
      .then(({ data }) => setProfile(data))
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

  // Get profile on change of textbook
  useEffect(() => {
    if (textbook.owner) {
      getProfile();
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
      <div className="content">
        <Container fluid>
          <Row className="infoRow">
            <Col lg="3">
              <img style = {{height:"60%"}} src={textbook.image} alt="textbook image" />
            </Col>
            <Col>
              <div className="textbookInfoBlock">
                <h1 className="textbookInfo">Title: {textbook.title}</h1>
                <h1 className="textbookInfo">Price: ${textbook.price}</h1>
                <h1 className="textbookInfo">ISBN: {textbook.isbn}</h1>
                <h1 className="textbookInfo">Authors: {textbook.authors}</h1>
                <h4>{states[textbook.state]}</h4>
                {textbook.owner === user.username ? (
                  <Button onClick={() => setEditing(true)}>Edit</Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(addToCart(textbook));
                      alert("Textbook Added to Cart");
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row className="infoRow">
            <Col lg="3">
              <img src="" alt="profile image" />
            </Col>
            <Col>
                <h1>Seller</h1>
              <div className="userInfoBlock">
                <h1 className="profileInfo">Owner: {profile.username}</h1>
                <h1 className="profileInfo">Name: {profile.first_name} {user.last_name}</h1>
                <h1 className = "profileInfo">Email: {profile.email}</h1>
                <h1 className="profileInfo">School: {profile.school}</h1>
                <h1 className="profileInfo">Location: {profile.location}</h1>
                <Button tag={Link} to={`/profile/${profile.username}/`}>
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
