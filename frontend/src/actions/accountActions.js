import { SET_TOKEN } from "./actions";

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};
