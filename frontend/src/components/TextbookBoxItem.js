import React from "react";
import "../css/TextbookBoxItem.css";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  CardFooter,
} from "reactstrap";

function TextbookBoxItem({ textbook, searchCard, children }) {

  const stateMap = {
    F: "For Sale",
    S: "Sold",
    D: "Draft",
  };
  return (
    <Card className="textbookBox" style={{height:"300px", width:"300px"}}>
      <CardImg
        top
        src={textbook.image}
        alt="Textbook Image"
        className="img-thumbnail img-fluid"
        style = {{height:"100x", width:"100px"}}

        />

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
