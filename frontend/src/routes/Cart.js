import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextbookBoxItem from "../components/TextbookBoxItem";
import { removeFromCart, clearCart } from "../actions/cartActions";
import { Col, Row, Button, Popover, PopoverBody } from "reactstrap";
import { useToken } from "../hooks/useToken";
import cookie from "react-cookies";
import axios from "axios";
import "../css/Cart.css";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((store) => store.cartReducer.cart);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useToken();
  const history = useHistory;

  const spacedOrangeBtn = {
    marginRight: "5px",
    marginLeft: "5px",
    color: "black",
    backgroundColor: " #CA521F",
  };

  const getTotal = () => {
    return cart.reduce((total, book) => {
      return total + Number(book.price);
    }, 0);
  };

  const checkout = () => {
    const formData = new FormData();
    formData.append("state", "S");
    cart.forEach((textbook) => {
      axios
        .patch(`/api/textbook/update/${textbook.pk}/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": cookie.load("csrftoken"),
          },
        })
        .then((res) => history.pushState("/messages"))
        .catch((err) => console.log(err));
    });
    dispatch(clearCart());
  };

  return (
    <div className="Cart">
      <h3>Cart</h3>
      <Row>
        {cart.map((textbook, key) => {
          return (
            <Col lg="3" key={key}>
              <TextbookBoxItem textbook={textbook}>
                <Button onClick={() => dispatch(removeFromCart(textbook))}>
                  Remove
                </Button>
              </TextbookBoxItem>
            </Col>
          );
        })}
      </Row>
      <h3>Total: ${getTotal()}</h3>
      <Button style={spacedOrangeBtn} onClick={() => dispatch(clearCart())}>
        Clear Cart
      </Button>
      <Button style={spacedOrangeBtn} onClick={checkout}>
        Checkout
      </Button>
    </div>
  );
};

export default Cart;
