import React, { useState } from "react";
import "../../css/PageHeader.css";
import { Link, useHistory } from "react-router-dom";

import findabook from "../../../admin/img/findabook.png";
import cart from "../../../admin/img/cart.png";

const PageHeader = () => {
  const [textbookId, setTextbookId] = useState("");
  const history = useHistory();

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
          <img src={findabook} alt="Logo" />
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
        <Link className="sellLink" to="/sell">
          Sell
        </Link>
        <Link className="cartImageLogo" to="/cart">
          Cart
          <img src={cart} alt="Cart Logo" />
        </Link>

        <button className="profileDot"></button>

        <div className="hoverLinkBox">
          <Link className="profileLink" to="/profile">
            Profile
          </Link>
          <br></br>
          <Link className="cartLink" to="/cart">
            Cart
          </Link>
          <br></br>
          <Link className="messagesLink" to="/messages">
            Messages
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default PageHeader;
