import React from "react";
import PageHeader from "../components/PageHeader.js"
import "../css/Sell.css"

const Sell = () => {
    return(
        <div>
            <PageHeader/>
            <div className = "sellBlock">
                <h1>Create your textbook listing</h1>
                ISBN: <input type="text" className = "ISBNInput" placeholder = "ISBN"></input>
                <br></br>
                Author: <input type="text" className = "authorInput" placeholder = "Author"></input>
                <br></br>
                Book Title: <input type="texts" className = "bookTitleInput" placeholder = "Book Title"></input>
                <br></br>

                Upload Image<button className ="uploadImgBtn">Upload</button>
                <button className = "listBtn" >List</button>
            </div>

        </div>

    );

};

export default Sell;