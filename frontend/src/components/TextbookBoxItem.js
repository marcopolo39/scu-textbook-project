import React from "react";
import "../../css/TextbookBoxItem.css";
import { Link } from "react-router-dom";

function TextbookBoxItem({ textbook }) {
  return (
    <div className="textbookBoxProp">
      <Link
        to={{
          pathname: `/textbook/${textbook.isbn}`,
          textbook: textbook,
        }}
      >
        <div>
          <div className="textbookImage"></div>
          {textbook.title}
          <br />
          {textbook.price}
        </div>
      </Link>
    </div>
  );
}

export default TextbookBoxItem;
