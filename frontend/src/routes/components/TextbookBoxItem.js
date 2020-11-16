import React from "react"
import "../../css/TextbookBoxItem.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";

function TextbookBoxItem(){
  const { textbookId } = useParams();

return (
    <div className = "textbookBoxProp">
       <Link to = "/textbook">
               <img className = "textbookImage">
               </img>
       </Link>
       <Link className = "textbookInfo" to = '/textbook/${textbookID}'>
           <br></br>
           Textbook Name
           <br></br>
           ISBN
           <br></br>
           Price
       </Link>



    </div>
);
}

export default TextbookBoxItem;


