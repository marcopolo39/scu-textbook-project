import React from "react"
import "../../css/TextbookBoxItem.css";
import {Link} from "react-router-dom";

function TextbookBoxItem(){
return (
    <div className = "textbookBoxProp">
       <Link to = "/textbook">
           <div>
               <div className = "textbookImage">
               </div>
           </div>
        </Link>
    </div>
);
}

export default TextbookBoxItem;


