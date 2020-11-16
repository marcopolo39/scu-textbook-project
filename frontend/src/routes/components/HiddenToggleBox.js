import {Link} from "react-router-dom";
import React from "react";
import "../../css/HiddenToggleBox.css";

    const HiddenToggleBox = () => {
    return (
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
    );
};

    export default HiddenToggleBox;