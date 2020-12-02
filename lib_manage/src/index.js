import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from 'react-router-dom';

import "./App.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";

const loader = document.querySelector(".book");

const showLoader = () => loader.classList.remove("loader--hide");

const hideLoader = () => loader.classList.add("loader--hide");


ReactDOM.render(
  <div>
    <Router>
      <App hideLoader={hideLoader} showLoader={showLoader} />
    </Router>
  </div>,
  document.getElementById("root")
);
