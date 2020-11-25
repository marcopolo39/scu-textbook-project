import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/App.css";
import TextbookBoxItem from "../components/TextbookBoxItem.js";
import SearchFilterBox from "../components/SearchFilterBox";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

const App = () => {
  const user = useSelector((store) => store.accountReducer.user);
  const [textbooks, setTextbooks] = useState([]);
  const [filteredTextbooks, setFilteredTextbooks] = useState([]);
  const [filters, setFilter] = useState({
    price: {
      low: 0,
      high: 10000,
    },
    filterLocation: false,
    filterSchool: false,
  });
  const [location, setLocation] = useState({});

  const changePriceLow = (e) => {
    setFilter({
      ...filters,
      price: {
        ...filters.price,
        low: e.target.value ? parseInt(e.target.value, 10) : 0,
      },
    });
  };

  const changePriceHigh = (e) => {
    setFilter({
      ...filters,
      price: {
        ...filters.price,
        high: e.target.value ? parseInt(e.target.value, 10) : 10000,
      },
    });
  };

  const getTextbooks = () => {
    axios
      .get("/api/textbook/list")
      .then((res) => {
        setTextbooks(res.data.filter((book) => book.state === "F"));
        setFilteredTextbooks(res.data.filter((book) => book.state === "F"));
      })
      .catch((err) => console.dir(err));
  };

  const filterSchool = (e) => {
    setFilter({
      ...filters,
      filterSchool: e.target.checked,
    });
  };

  // Gets given textbook owner's school
  const ownerFromTextbook = async (textbook) => {
    const r = await axios
      .get("/api/account/profile/", {
        params: {
          username: textbook.owner,
        },
      })
      .then((res) => res.data);
    return r;
  };

  // Initialize books
  useEffect(() => {
    getTextbooks();
  }, []);

  // filters textbooks
  useEffect(async () => {
    if (textbooks.length > 0) {
      const owners = await Promise.all(
        textbooks.map((book) => ownerFromTextbook(book))
      );

      const filteredBooks = textbooks.filter((book, i) => {
        const priceFilter =
          filters.price.low <= parseInt(book.price, 10) &&
          filters.price.high >= parseInt(book.price, 10);
        const schoolFilter = filters.filterSchool
          ? owners[i].school === user.school
          : true;
        const locationFilter = filters.filterLocation
          ? owners[i].location === [location.city, location.state].join(", ")
          : true;
        return priceFilter && schoolFilter && locationFilter;
      });
      setFilteredTextbooks(filteredBooks);
    }
  }, [filters]);

  return (
    <div className="App">
      <div className="spacingFromHeader"></div>
      <div className="filterResults">
        <h1 className="filterResultsHeader">Filter Results</h1>

        <form className="filterForm">
          <label>
            Items sold by students who attend my University
            <input
              className="sameUniCheckbox"
              name="sameUniCheckbox"
              type="checkbox"
              onChange={filterSchool}
            ></input>
          </label>
          <div className="firstFilterGap"></div>
          Search by Location <br></br>
          <input
            className="city"
            type="text"
            placeholder="City"
            onChange={(e) => {
              e.preventDefault();
              setLocation({ ...location, city: e.target.value });
            }}
          ></input>
          <input
            className="state"
            type="text"
            placeholder="State"
            onChange={(e) => {
              e.preventDefault();
              setLocation({ ...location, state: e.target.value });
            }}
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              setFilter({ ...filters, filterLocation: true });
            }}
          >
            Go
          </button>
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
          <br />
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              setFilter({
                price: {
                  low: 0,
                  high: 10000,
                },
                filterLocation: false,
                filterSchool: false,
              });
            }}
          >
            Clear Filters
          </button>
        </form>
      </div>
      <div className="textbookDisplayBlock">
        <Container>
          <Row>
            {filteredTextbooks.map((textbook, key) => {
              return (
                <Col sm="2" lg="3" md="3" key={key}>
                  <TextbookBoxItem
                    key={key}
                    textbook={textbook}
                    className="textbookListCard"
                  >
                    <Button
                      tag={Link}
                      to={{
                        pathname: `/textbook/${textbook.pk}`,
                        textbook: textbook,
                      }}
                      color="link"
                    >
                      Go
                    </Button>
                  </TextbookBoxItem>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;
