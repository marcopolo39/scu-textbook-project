import React, { useState } from "react";
import { useToken } from "../../hooks/useToken";
import "../../css/PageHeader.css";
import { Link, useHistory } from "react-router-dom";

import findabook from "../../../admin/img/findabook.png";
import cart from "../../../admin/img/cart.png";
import ToggleProfileButton from "./ToggleProfileButton";

const PageHeader = () => {
  const [textbookId, setTextbookId] = useState("");
  const history = useHistory();
  const token = useToken();
  const isLoggedIn = token ? true : false;

  const searchTextbook = () => {
    history.push(`/textbook/${textbookId}`);
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setTextbookId(e.target.value);
  };

  return (
    <div>
      <nav className="pageHeader">
        <Link className="titleLogo" to="/">
          <img className="titleLogoImage" src={findabook} alt="Logo" />
          FindABook
        </Link>
        <form onSubmit={searchTextbook} className="searchForm">
          <label>
            <input
              className="searchBar"
              type="text"
              name="textbookId"
              onChange={handleTextChange}
              placeholder="Search for a textbook..."
            />
          </label>
          <input className="searchBtn" type="submit" value="Go" />
        </form>
        <Link
          className="loginLink"
          to={{
            pathname: "/login",
            isRegistering: isLoggedIn() ? false : true,
          }}
        >
          Login
        </Link>
        <Link className="sellLink" to="/sell">
          Sell
        </Link>
        <Link className="cartImageLogo" to="/cart">
          <img src={cart} className="cartImage" alt="Cart Logo" />
        </Link>

        <div className="buttonDiv">
          <ToggleProfileButton />
        </div>
      </nav>
    </div>
  );
};

export default PageHeader;
