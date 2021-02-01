import React from "react";
import ReactDOM from "react-dom";
import { AuthorizedAppWrap, TopNavigation } from "@fozg/fozg-ui-elements";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthorizedAppWrap>
      <div id="topNav">
        <TopNavigation />
      </div>
      <App />
    </AuthorizedAppWrap>
  </React.StrictMode>,
  document.getElementById("root")
);
