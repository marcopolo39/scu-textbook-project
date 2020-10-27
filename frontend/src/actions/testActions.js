import { SET_TEST } from "./actions";

export const setTest = (newState) => {
  return {
    type: SET_TEST,
    payload: newState,
  };
};
