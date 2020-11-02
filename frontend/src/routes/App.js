import React from "react";
import { Link } from "react-router-dom";
import "../css/App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Routes:</p>
        <Link to="/profile/">Profile</Link>
        <Link to="/cart/">Cart</Link>
        <Link to="/search/">Search</Link>
        <Link to="/messages/">Messages</Link>
        <Link to="/login/">Login</Link>
      </header>
    </div>
  );
};

export default App;
