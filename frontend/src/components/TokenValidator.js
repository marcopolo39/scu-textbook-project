import React from "react";
import { useToken } from "../hooks/useToken";

/** Component uses useToken hook to validate tokens whenever a page is refreshed */
const TokenValidator = () => {
  useToken();
  return <div className="TokenValidator"></div>;
};

export default TokenValidator;
