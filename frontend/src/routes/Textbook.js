import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader.js";
import "../css/Textbook.css";

const Textbook = ({ location }) => {
  const { isbn } = useParams();
  const [textbook, setTextbook] = useState({});

  useEffect(() => {
    if (location.textbook) {
      setTextbook(location.textbook);
    } else {
      axios
        .get(`/api/textbook/list/${isbn}`)
        .then((res) => {
          setTextbook(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      {/*<PageHeader />*/}
      <h1>Title: {textbook.title}</h1>
      <h1>ISBN: {textbook.isbn}</h1>
      <h1>Owner: {textbook.owner}</h1>
    </div>

  );
};

export default Textbook;
