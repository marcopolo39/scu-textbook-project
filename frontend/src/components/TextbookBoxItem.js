import React, { useEffect, useState } from "react";
import "../css/TextbookBoxItem.css";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  CardFooter,
} from "reactstrap";
import axios from "axios";

import findabook from "../../admin/img/findabook.png";

function TextbookBoxItem({ textbook, children, clearImage }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const stateMap = {
    F: "For Sale",
    S: "Sold",
    D: "Draft",
  };

  useEffect(() => {
    axios
      .get(textbook.image)
      .then(() => setImageLoaded(true))
      .catch((err) => console.dir(err));
  }, []);
  return (
    <Card className="textbookBox">
      {clearImage ? undefined : imageLoaded ? (
        <CardImg
          top
          src={textbook.image}
          alt="Textbook Image"
          className="img-thumbnail img-fluid"
          style={{ display:"block", maxWidth:"100px", maxHeight:"100px", width: "auto", height:"auto"}}
        />
      ) : (
        <CardImg
          top
          src={findabook}
          alt="Textbook Image"
          className="img-thumbnail img-fluid"
          style={{ height: "100px", width: "100px", backgroundSize: "cover", background: "transparent no-repeat center" }}
        />
      )}

      <CardBody>
        <CardTitle tag="h5">{textbook.title}</CardTitle>
        {textbook.authors ? (
          <CardText tag="h6">by {textbook.authors}</CardText>
        ) : undefined}
        {textbook.price ? (
          <CardText tag="h6">${textbook.price}</CardText>
        ) : undefined}
        <CardText>{stateMap[textbook.state]}</CardText>
      </CardBody>
      {children ? <CardFooter>{children}</CardFooter> : undefined}
    </Card>
  );
}

export default TextbookBoxItem;
