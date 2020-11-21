import React, { useState } from "react";
import { useToken } from "../hooks/useToken.js";
import PageHeader from "./components/PageHeader.js";
import TextbookEditor from "../components/TextbookEditor";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
} from "reactstrap";
import axios from "axios";
import "../css/Sell.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Sell = () => {
  const [textbookModel, setTextbookModel] = useState({});
  const [searchModel, setSearchModel] = useState({});
  const token = useToken();
  const history = useHistory();
  const username = useSelector((store) => store.accountReducer.user.username);

  const searchISBN = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${textbookModel.isbn}`
      )
      .then((res) => {
        if (res.data.totalItems == 0) {
          console.log("Google Books (Empty)", res.data);
          document.querySelector(".errorBlock").style.display = "block";
        } else {
          console.dir(res.data.items[0]);
          setSearchModel({
            title: res.data.items[0].volumeInfo.title,
            authors: res.data.items[0].volumeInfo.authors.join(", "),
            isbn: textbookModel.isbn,
            image: res.data.items[0].volumeInfo.imageLinks.thumbnail,
          });
          document.querySelector(".errorBlock").style.display = "none";
          document.querySelector(".searchResults").style.display = "block";
        }
      })
      .catch((err) => {
        console.log("Google Books (Err)", err);
        document.querySelector(".errorBlock").style.display = "block";
      });
  };

  const createListing = () => {
    axios
      .post(
        "/api/textbook/create/",
        {
          isbn: textbookModel.isbn,
          price: textbookModel.price,
          title: textbookModel.title,
          authors: textbookModel.authors,
          condition: textbookModel.condition,
          state: textbookModel.state || "F",
          owner: username,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Listing Created", res.data);
        history.push(`/profile`);
      })
      .catch((err) => {
        console.log("Model", textbookModel);
        console.dir(err);
      });
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setTextbookModel({
      ...textbookModel,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <PageHeader />
      <div className="sellBlock">
        <div className="isbnSearchBlock">
          <h1>List By ISBN</h1>
          <InputGroup>
            <Input placeholder="ISBN" name="isbn" onChange={handleTextChange} />
            <br />
            <InputGroupAddon addonType="append">
              <Button onClick={searchISBN}>Search</Button>
            </InputGroupAddon>
          </InputGroup>
          <Button
            onClick={() => {
              document.querySelector(".isbnSearchBlock").style.display = "none";
              document.querySelector(".errorBlock").style.display = "none";
              document.querySelector(".manualListingBlock").style.display =
                "block";
            }}
          >
            Enter Manually
          </Button>

          <div className="searchResults" style={{ display: "none" }}>
            <h1>Results</h1>
            <Card className="col-lg-3">
              <CardImg
                top
                width="100%"
                height="50px"
                src={searchModel.image}
                alt="Textbook Image"
              />
              <CardBody>
                <CardTitle tag="h5">{searchModel.title}</CardTitle>
                <CardText tag="h6">{searchModel.authors}</CardText>
                <Button
                  onClick={() => {
                    setTextbookModel(searchModel);
                    document.querySelector(".isbnSearchBlock").style.display =
                      "none";
                    document.querySelector(
                      ".manualListingBlock"
                    ).style.display = "block";
                  }}
                >
                  Go
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className="errorBlock" style={{ display: "none" }}>
            <h1 style={{ color: "red" }}>
              We couldn't find your book. Try again or enter manually.
            </h1>
          </div>
        </div>
        <div className="manualListingBlock" style={{ display: "none" }}>
          <h1>Create your textbook listing</h1>
          <TextbookEditor
            textbookModel={textbookModel}
            setTextbookModel={setTextbookModel}
            handleTextChange={handleTextChange}
          />
          <Button onClick={createListing}>List</Button>
          <br />
          <Button
            onClick={() => {
              document.querySelector(".isbnSearchBlock").style.display =
                "block";
              document.querySelector(".errorBlock").style.display = "none";
              document.querySelector(".manualListingBlock").style.display =
                "none";
            }}
          >
            Back to ISBN Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sell;

// 9780486794310
