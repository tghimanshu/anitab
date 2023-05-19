import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app/app";

import "./style.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.querySelector("#app") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
