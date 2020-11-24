import React from "react";
import CartItem from "../components/CartItem";
import "../css/Cart.css";

const Cart = () => {
  return (
    <div>
      <CartItem />
      <div className="checkoutBox">
        <button className="checkoutBtn">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
