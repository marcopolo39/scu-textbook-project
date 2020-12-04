import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../css/ToggleProfileButton.css";
import HiddenToggleBox from "./HiddenToggleBox";

const ToggleProfileButton = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const user = useSelector((store) => store.accountReducer.user);

  const handleClick = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div>
      <img
        src={user.profile_img}
        style={{ height: "30px" }}
        className="profileDot"
        onClick={handleClick}
        alt="profile pic"
      />
      {isToggleOn ? <HiddenToggleBox /> : undefined}
    </div>
  );
};
export default ToggleProfileButton;
