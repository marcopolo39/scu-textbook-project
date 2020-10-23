import { SET_TEST } from "./actions";

export const setTest = (newTest) => {
  return {
    type: SET_TEST,
    payload: newTest,
  };
};
