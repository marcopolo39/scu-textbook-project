import React from "react"
import "../css/CartItem.css";
import {Link} from "react-router-dom";

const CartItem = () => {
return (
    <div className = "cartItemProp">
       <Link to = "/textbook">
               <img className = "textbookImage">
               </img>
       </Link>
       <div className = "infoBlock">
               <p className = "textbook">Textbook</p>

               <p className = "isbn">ISBN</p>

               <p className = "price">Price</p>
           <button className = "removeFromCartBtn">Remove</button>
        </div>


    </div>
);
}

export default CartItem;


