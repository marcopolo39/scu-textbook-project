import React from "react";
import PageHeader from "../components/PageHeader";
import CartItem from "../components/CartItem"
import "../css/Cart.css";

const Cart = () => {
  return (
      <div>
        <PageHeader />
        <CartItem />
        <div className = "checkoutBox">

                <button className = "checkoutBtn">Checkout</button>

        </div>

      </div>
);
};

export default Cart;
