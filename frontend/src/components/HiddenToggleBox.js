import { Link } from "react-router-dom";
import React from "react";
import "../css/HiddenToggleBox.css";
import { setReceiver } from "../actions/messageActions";
import { useDispatch } from "react-redux";

const HiddenToggleBox = () => {
  const dispatch = useDispatch();
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
      <Link
        className="messagesLink"
        onClick={() => dispatch(setReceiver(null))}
        to="/messages"
      >
        Messages
      </Link>
    </div>
  );
};

export default HiddenToggleBox;
