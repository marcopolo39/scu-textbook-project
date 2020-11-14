import React from "react";
import cookie from "react-cookies";

/** Component uses useToken hook to validate tokens whenever a page is refreshed */
const CSRFToken = () => {
  return (
    <input
      type="hidden"
      value={cookie.load("csrftoken")}
      name="csrfmiddlewaretoken"
    />
  );
};

export default CSRFToken;
