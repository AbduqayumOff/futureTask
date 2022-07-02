import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundry from "./components/error-boundry/error-boundry";
import store from "./store/store";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <Router>
        <App />
      </Router>
    </ErrorBoundry>
  </Provider>,

  document.getElementById("root")
);
