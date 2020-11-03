import React from "react";
import { useParams } from "react-router-dom";

const Textbook = () => {
  const { textbookId } = useParams();

  return <h1>ID: {textbookId}</h1>;
};

export default Textbook;
