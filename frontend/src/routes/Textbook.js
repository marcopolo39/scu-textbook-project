import React from "react";
import { useParams } from "react-router-dom";
import PageHeader from "./components/PageHeader.js"
import "../css/Textbook.css"

const Textbook = () => {
  const { textbookId } = useParams();

  return (
      <div>
        <PageHeader />
        <h1>ID: {textbookId}</h1>
      </div>
);
};

export default Textbook;
