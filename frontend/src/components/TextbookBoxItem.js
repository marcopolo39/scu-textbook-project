import React from "react";
import "../css/TextbookBoxItem.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Button,
  CardFooter,
} from "reactstrap";

function TextbookBoxItem({ textbook, searchCard, children }) {
  const stateMap = {
    F: "For Sale",
    S: "Sold",
    D: "Draft",
  };
  return (
    <Card className={`${searchCard ? "searchCard center col-lg-3" : ""} `}>
      <CardImg
        top
        width="100%"
        height="50px"
        src={textbook.image}
        alt="Textbook Image"
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
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}

export default TextbookBoxItem;
