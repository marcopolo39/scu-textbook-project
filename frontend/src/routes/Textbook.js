import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "./components/PageHeader.js";
import CSRFToken from "../components/CSRFToken";
import "../css/Textbook.css";
import { useSelector } from "react-redux";
import { useToken } from "../hooks/useToken.js";

const Textbook = ({ location }) => {
  const { id } = useParams();
  const user = useSelector((store) => store.accountReducer.user);
  const [textbook, setTextbook] = useState({});
  const [editing, setEditing] = useState(false);
  const token = useToken();

  const handleTextChange = (e) => {
    e.preventDefault();
    setTextbookModel({
      ...textbookModel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .put(
        `/api/textbook/update/${id}`,
        {
          title: textbook.title,
          price: textbook.price,
          authors: textbook.authors,
          state: textbook.state,
          volume_edition: textbook.volume_edition,
          condition: textbook.condition,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.dir(err));
  };

  useEffect(() => {
    if (location.textbook) {
      setTextbook(location.textbook);
    } else {
      axios
        .get(`/api/textbook/list/${id}`)
        .then((res) => {
          setTextbook(res.data);
        })
        .catch((err) => console.dir(err));
    }
  }, []);

  if (editing) {
    return (
      <div>
        <PageHeader />
        <h1>ID: {id}</h1>
        <div className="textbookEditBlock">
          <form method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder={textbook.title}
              onChange={handleTextChange}
            />
            <br />
            <input
              type="number"
              name="price"
              placeholder={textbook.price}
              onChange={handleTextChange}
            />
            <br />
            <input
              type="text"
              name="isbn"
              placeholder={textbook.isbn}
              onChange={handleTextChange}
              disabled
            />
            <br />
            <input
              type="text"
              name="authors"
              placeholder={textbook.authors}
              onChange={handleTextChange}
            />
            <br />
            <input
              type="text"
              name="condition"
              placeholder={textbook.condition}
              onChange={handleTextChange}
            />
            <br />
            <input type="submit" value="Submit" />
            <CSRFToken />
          </form>

          <button onClick={() => setEditing(false)}>Close</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <PageHeader />
        <h1>ID: {id}</h1>
        <div className="textbookInfoBlock">
          <h1>Title: {textbook.title}</h1>
          <h1>Price: {textbook.price}</h1>
          <h1>ISBN: {textbook.isbn}</h1>
          <h1>Authors: {textbook.authors}</h1>
          {textbook.owner == user.username ? (
            <button onClick={() => setEditing(true)}>Edit</button>
          ) : undefined}
        </div>
        <div className="userInfoBlock">
          <h1>Owner: {textbook.owner} </h1>
        </div>
      </div>
    );
  }
};

export default Textbook;
