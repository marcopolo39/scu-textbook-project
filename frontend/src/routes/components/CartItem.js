import React from "react"
import "../../css/CartItem.css";
import {Link} from "react-router-dom";

const CartItem = () => {
return (
    <div className = "cartItemProp">
       <Link to = "/textbook">
               <img className = "textbookImage">
               </img>
       </Link>
       <Link className = "textbookInfo" to = "/textbook">
           <br></br>
           Textbook Name
           <br></br>
           ISBN
           <br></br>
           Price
       </Link>

        <button className = "removeFromCartBtn">Remove</button>

    </div>
);
}

export default CartItem;


