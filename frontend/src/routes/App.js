import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/App.css";

const App = () => {
  const [textbookId, setTextbookId] = useState("");
  const history = useHistory();

  const searchTextbook = () => {
    history.push(`/textbook/${textbookId}`);
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setTextbookId(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className = "titleLogo"> FindABook</p>
        <p>Routes:</p>
        <Link to="/profile/">Profile</Link>
        <Link to="/cart/">Cart</Link>
        <Link to="/search/">Search</Link>
        <Link to="/messages/">Messages</Link>
        <Link to="/login/">Login</Link>
        <form onSubmit={searchTextbook}>
          <label>
            <p>Textbook Search (Concept):</p>
            <input type="text" name="textbookId" onChange={handleTextChange} />
          </label>
          <input type="submit" value="Go" />
        </form>
      </header>
    </div>
  );
};

export default App;
