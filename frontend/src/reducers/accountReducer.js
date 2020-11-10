import { SET_TOKEN } from "../actions/actions";

const initialState = {
  token: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
