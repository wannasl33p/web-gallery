import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.module.scss";

import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>,
);
