import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./actions";

export const addToCart = (textbook) => {
  return {
    type: ADD_TO_CART,
    payload: textbook,
  };
};

export const removeFromCart = (textbook) => {
  return {
    type: REMOVE_FROM_CART,
    payload: textbook,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
    payload: null,
  };
};
