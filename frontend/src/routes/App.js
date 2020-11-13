import React from "react";
import "../css/App.css";
import PageHeader from "./components/PageHeader.js"


const App = () => {


  return (
      <div className = "App">
          <PageHeader />
          <div className="spacingFromHeader"></div>
          <div className="filterResults">
              <h1 className="filterResultsHeader">Filter Results</h1>

              <form className="filterForm">
                  <input className="sameUniCheckbox" type="checkbox"></input>
                      Items sold by students who attend my University
                  <div className="firstFilterGap"></div>
                      Search Within <br></br>
                  <input className="lowerLimitAreaInput" type="text"></input>
                          to
                  <input className="upperLimitAreaInput" type="text"></input>
                  <div className="secondFilterGap"></div>
                      Price Range
                  <br></br>
                  <input className="lowerPrinceRangeInput" type="text"></input>
                        to
                  <input className="upperPriceRangeInput" type="text"></input>

              </form>
          </div>
      </div>
  );
};

export default App;
