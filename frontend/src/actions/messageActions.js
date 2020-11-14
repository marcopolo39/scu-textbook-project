import { SET_RECEIVER } from "./actions";

export const setReceiver = (receiver) => {
  return {
    type: SET_RECEIVER,
    payload: receiver,
  };
};
