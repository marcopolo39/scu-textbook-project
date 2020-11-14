import { SET_RECEIVER } from "../actions/actions";

const initialState = {
  conversationReceiver: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECEIVER:
      return {
        ...state,
        conversationReceiver: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
