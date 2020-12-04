import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import TextbookBoxItem from "../components/TextbookBoxItem";

const Search = ({ location }) => {
  return (
    <div className="Search">
      <h2></h2>
      <Row>
        {location.state
          ? location.state.searchResults.map((book, key) => {
              return (
                <Col lg="3" md="3" sm="1" key={key}>
                  <TextbookBoxItem textbook={book}>
                    <Button
                      tag={Link}
                      to={{
                        pathname: `/textbook/${book.pk}`,
                        textbook: book,
                      }}
                      color="link"
                    >
                      Go
                    </Button>
                  </TextbookBoxItem>
                </Col>
              );
            })
          : undefined}
      </Row>
    </div>
  );
};

export default Search;
