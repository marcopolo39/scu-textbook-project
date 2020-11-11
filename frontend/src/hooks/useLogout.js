import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../actions/accountActions";
import axios from "axios";

export const useLogout = () => {
  const token = useSelector((store) => store.accountReducer.token);
  const dispatch = useDispatch();

  /** Calls POST request to /api/account/logout with Auth token to log user out
   * TODO: handle errors
   */
  const logoutAccount = () => {
    axios
      .post("/api/account/logout", null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        dispatch(setToken(null));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return logoutAccount;
};
