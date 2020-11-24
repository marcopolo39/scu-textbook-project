import React, { useState } from "react";
import { useToken } from "../hooks/useToken.js";
import TextbookEditor from "../components/TextbookEditor";
import { Button, InputGroup, Input, InputGroupAddon, Alert } from "reactstrap";
import axios from "axios";
import "../css/Sell.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextbookBoxItem from "../components/TextbookBoxItem.js";

const Sell = () => {
  const [textbookModel, setTextbookModel] = useState({});
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
          setTextbookModel({
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
          volume_edition: textbookModel.volume,
          comments: textbookModel.comments,
          state: textbookModel.state || "F",
          owner: username,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        history.push("/profile");
      })
      .catch((err) => {
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
            <TextbookBoxItem textbook={textbookModel} searchCard>
              <Button
                onClick={() => {
                  document.querySelector(".isbnSearchBlock").style.display =
                    "none";
                  document.querySelector(".manualListingBlock").style.display =
                    "block";
                }}
              >
                Go
              </Button>
            </TextbookBoxItem>
          </div>
          <div className="errorBlock" style={{ display: "none" }}>
            <Alert color="danger">
              We couldn't find your book. Try again or enter manually.
            </Alert>
          </div>
        </div>
        <div className="manualListingBlock" style={{ display: "none" }}>
          <h1>Create your textbook listing</h1>
          <TextbookEditor
            textbookModel={textbookModel}
            setTextbookModel={setTextbookModel}
            onSubmit={createListing}
            onCancel={() => {
              document.querySelector(".isbnSearchBlock").style.display =
                "block";
              document.querySelector(".errorBlock").style.display = "none";
              document.querySelector(".manualListingBlock").style.display =
                "none";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sell;

// 9780486794310
