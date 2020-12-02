import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PageHeader from "./components/PageHeader";
import "./index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./routes/App";
import Profile from "./routes/Profile";
import Cart from "./routes/Cart";
import Search from "./routes/Search";
import Messages from "./routes/Messages";
import Login from "./routes/Login";
import Textbook from "./routes/Textbook";
import Sell from "./routes/Sell";
import Registration from "./routes/Registration";

import TokenValidator from "./components/TokenValidator";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Fragment>
              <TokenValidator />
              <PageHeader />
              <Route exact path="/" component={App} />
              <Route exact path="/profile/" component={Profile} />
              <Route exact path="/profile/:username" component={Profile} />
              <Route exact path="/cart/" component={Cart} />
              <Route exact path="/search/" component={Search} />
              <Route exact path="/messages/" component={Messages} />
              <Route exact path="/login/" component={Login} />
              <Route exact path="/textbook/:pk/" component={Textbook} />
              <Route exact path="/sell/" component={Sell} />
              <Route exact path="/register/" component={Registration} />
            </Fragment>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
