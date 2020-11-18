import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../css/App.css";
import PageHeader from "./components/PageHeader.js";
import TextbookBoxItem from "./components/TextbookBoxItem.js";
import SearchFilterBox from "./components/SearchFilterBox";

const App = () => {
  const [textbooks, setTextbooks] = useState([]);
  const [filter, setFilter] = useState({
    price: {
      low: 0,
      high: 10000,
    },
  });

  const changePriceLow = (e) => {
    if (e.target.value) {
      setFilter({
        ...filter,
        price: {
          ...filter.price,
          low: parseInt(e.target.value, 10),
        },
      });
    } else {
      setFilter({
        ...filter,
        price: {
          ...filter.price,
          low: 0,
        },
      });
    }
  };

  const changePriceHigh = (e) => {
    if (e.target.value) {
      setFilter({
        ...filter,
        price: {
          ...filter.price,
          high: parseInt(e.target.value, 10),
        },
      });
    } else {
      setFilter({
        ...filter,
        price: {
          ...filter.price,
          high: 0,
        },
      });
    }
  };

  const getTextbooks = () => {
    axios
      .get("/api/textbook/list")
      .then((res) => {
        setTextbooks(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTextbooks();
  }, []);

  return (
    <div className="App">
      <PageHeader />
      <div className="spacingFromHeader"></div>
      <div className="filterResults">
        <h1 className="filterResultsHeader">Filter Results</h1>

        <form className="filterForm">
          <input className="sameUniCheckbox" type="checkbox"></input>
          Items sold by students who attend my University
          <div className="firstFilterGap"></div>
          Search Within <br></br>
          <input className="lowerLimitAreaInput" type="text"></input>
          to
          <input className="upperLimitAreaInput" type="text"></input>
          <div className="secondFilterGap"></div>
          Price Range
          <br></br>
          <input
            className="lowerPrinceRangeInput"
            type="text"
            name="priceLow"
            onChange={changePriceLow}
          ></input>
          to
          <input
            className="upperPriceRangeInput"
            type="text"
            name="priceHigh"
            onChange={changePriceHigh}
          ></input>
        </form>
      </div>
      <div className="textbookDisplayBlock">
        {textbooks.map((textbook, key) => {
          let price = parseInt(textbook.price, 10);
          if (filter.price.low <= price && price <= filter.price.high) {
            return <TextbookBoxItem key={key} textbook={textbook} />;
          }
        })}
      </div>
    </div>
  );
};

export default App;

// How do we get price to automatically set as a number in the serializer?
