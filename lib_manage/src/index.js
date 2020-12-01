import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";

const loader = document.querySelector(".book");

const showLoader = () => loader.classList.remove("loader--hide");

const hideLoader = () => loader.classList.add("loader--hide");


ReactDOM.render(
  <div>
    <App hideLoader={hideLoader} showLoader={showLoader} />
  </div>,
  document.getElementById("root")
);
