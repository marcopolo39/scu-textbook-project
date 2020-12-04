import React, {useState} from "react";
import "../css/PageHeader.css";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

import findabook from "../../admin/img/findabook.png";
import cart from "../../admin/img/cart.png";
import ToggleProfileButton from "./ToggleProfileButton";
import {useToken} from "../hooks/useToken";
import {useLogout} from "../hooks/useLogout";


const PageHeader = () => {
    const [searchTerms, setSearchTerms] = useState("");
    const history = useHistory();
    const token = useToken();
    const logout = useLogout();
    const isLoggedIn = () => (token ? true : false);

    const searchTextbook = async (e) => {
        e.preventDefault();
        const lowerSearchTerms = searchTerms.toLowerCase();
        const textbooks = await axios
            .get("/api/textbook/list/")
            .then(({data}) => data)
            .catch((err) => console.dir("E", err));

        const searchResults = textbooks.filter((book) => {
            const isbnSearch = book.isbn == searchTerms;
            const titleSearch = book.title
                ? book.title.toLowerCase().includes(lowerSearchTerms)
                : false;
            const authorSearch = book.authors
                ? book.authors.toLowerCase().includes(lowerSearchTerms)
                : false;
            return isbnSearch || titleSearch || authorSearch;
        });

        history.push("/search", {
            searchResults: searchResults || [],
        });
    };

    const handleTextChange = (e) => {
        e.preventDefault();
        setSearchTerms(e.target.value);
    };

    if (!isLoggedIn()) {
        return (
            <div className="pageHeader">
                <div className="logoDiv">
                    <Link className="titleLogo" to="/">
                        <img className="titleLogoImage" src={findabook} alt="Logo"/>
                        FindABook
                    </Link>
                </div>
                <div className="searchBarDiv">
                    <form onSubmit={searchTextbook} className="searchForm">
                        <input
                            className="searchBar"
                            type="text"
                            name="searchParams"
                            onChange={handleTextChange}
                            placeholder="Search for a textbook..."
                        />
                        <input className="searchBtn" type="submit" value="Go"/>
                    </form>
                </div>
                <div className="linkDiv">
                    <Link className="loginLink" to="/login">
                        Login
                    </Link>
                    <Link className="registerLink" to="/register">
                        Register
                    </Link>
                    <Link className="sellLink" to="/sell">
                        Sell
                    </Link>
                    <Link className="cartImageLogo" to="/cart">
                        <img src={cart} className="cartImage" alt="Cart Logo"/>
                    </Link>
                </div>

            </div>
        );
    } else {
        return (
            <div className="pageHeader">
                <div className="logoDiv">
                    <Link className="titleLogo" to="/">
                        <img className="titleLogoImage" src={findabook} alt="Logo"/>
                        FindABook
                    </Link>
                </div>
                <div className="searchBarDiv">
                    <form onSubmit={searchTextbook} className="searchForm">
                        <input
                            className="searchBar"
                            type="text"
                            name="searchParams"
                            onChange={handleTextChange}
                            placeholder="Search for a textbook..."
                        />
                        <input className="searchBtn" type="submit" value="Go"/>
                    </form>
                </div>
                <div className="linkDiv">
                    <Link className="loginLink" to="/login" onClick={logout}>
                        Logout
                    </Link>
                    <Link className="sellLink" to="/sell">
                        Sell
                    </Link>
                    <Link className="cartImageLogo" to="/cart">
                        <img src={cart} className="cartImage" alt="Cart Logo"/>
                    </Link>
                    <div>
                        <ToggleProfileButton />
                    </div>
                </div>
            </div>
        );
    }
}

export default PageHeader;
