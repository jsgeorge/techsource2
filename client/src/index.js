import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

//import App from "./App";

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
