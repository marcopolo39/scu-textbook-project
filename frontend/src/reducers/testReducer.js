import { SET_TEST } from "../actions/actions";

const initialState = {
  testState: null,
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEST:
      return {
        ...state,
        testState: action.payload,
      };
    default:
      return state;
  }
};

export default testReducer;
