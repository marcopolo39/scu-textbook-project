import { SET_TOKEN, SET_USER } from "../actions/actions";

const initialState = {
  token: null,
  user: {},
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_USER:
      delete action.payload.password;
      delete action.payload.id;
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
