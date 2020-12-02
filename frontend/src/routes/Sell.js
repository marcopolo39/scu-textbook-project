import React, { useEffect, useState } from "react";
import { useToken } from "../hooks/useToken.js";
import TextbookEditor from "../components/TextbookEditor";
import { Button, InputGroup, Input, InputGroupAddon, Alert } from "reactstrap";
import axios from "axios";
import "../css/Sell.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextbookBoxItem from "../components/TextbookBoxItem.js";

import findabook from "../../admin/img/findabook.png";

const Sell = () => {
  const [textbookModel, setTextbookModel] = useState({});
  const token = useToken();
  const history = useHistory();
  const username = useSelector((store) => store.accountReducer.user.username);

  const btnStyle = {
    backgroundColor: "#84A4F4",
    color: "white",
    fontWeight: "bold",
    marginTop: "10px",
  };

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
    const formData = new FormData();
    formData.append("isbn", textbookModel.isbn);
    formData.append("price", textbookModel.price);
    formData.append("title", textbookModel.title);
    formData.append("authors", textbookModel.authors);
    formData.append("condition", textbookModel.condition);
    formData.append("volume_edition", textbookModel.volume || null);
    formData.append("comments", textbookModel.comments);
    formData.append("state", textbookModel.state || "F");
    formData.append("image", textbookModel.img, textbookModel.img.name);
    formData.append("owner", username);
    axios
      .post("/api/textbook/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
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

  useEffect(() => {
    const setDefaultImage = async () => {
      const res = await fetch(findabook);
      const blob = await res.blob();
      const file = new File([blob], "book.png", { type: blob.type });
      setTextbookModel({
        ...textbookModel,
        img: file,
      });
    };
    setDefaultImage();
  }, []);

  return (
    <div>
      <div className="sellBlock">
        <div className="isbnSearchBlock">
          <h1 className="listByISBN">List By ISBN</h1>
          <InputGroup style={btnStyle}>
            <Input placeholder="ISBN" name="isbn" onChange={handleTextChange} />
            <br />
            <InputGroupAddon addonType="append">
              <Button onClick={searchISBN}>Search</Button>
            </InputGroupAddon>
          </InputGroup>
          <Button
            style={btnStyle}
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
