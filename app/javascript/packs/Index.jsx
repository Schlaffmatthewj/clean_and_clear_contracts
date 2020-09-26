import React from "react";
import { render } from "react-dom";
import App from "../components/App";
import "../stylesheets/Index.css"

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});