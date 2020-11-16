import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../actions/accountActions";
import axios from "axios";

export const useToken = () => {
  const token = useSelector((store) => store.accountReducer.token);
  const dispatch = useDispatch();

  /** Calls GET request to /api/account/user with Auth token to {} token
   * If the call fails (token expired), the token will be removed
   */
  const validateToken = () => {
    axios
      .get("/api/account/user", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .catch((err) => {
        dispatch(setToken(null));
      });
  };

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, []);

  return token;
};
