import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/App.css";
import PageHeader from "./components/PageHeader.js";
import TextbookBoxItem from "./components/TextbookBoxItem.js";
import SearchFilterBox from "./components/SearchFilterBox"

const App = () => {
  return (
      <div>
        <PageHeader />
        <SearchFilterBox />
        <div className="textbookDisplayBlock">
          <TextbookBoxItem />
          <TextbookBoxItem />
          <TextbookBoxItem />
          <TextbookBoxItem />
          <TextbookBoxItem />
          <TextbookBoxItem />
          <TextbookBoxItem />
          <TextbookBoxItem />
          <TextbookBoxItem />
        </div>
    </div>
  );
};

export default App;
