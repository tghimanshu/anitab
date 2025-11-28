import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app/app";

import "./style.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

/**
 * Entry point of the React application.
 *
 * This file is responsible for finding the root element in the DOM
 * and rendering the main `App` component wrapped in `React.StrictMode`
 * and the Redux `Provider`.
 */
ReactDOM.createRoot(document.querySelector("#app") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
