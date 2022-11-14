import React from "react";
import ReactDOM from "react-dom/client";

import "react-calendar/dist/Calendar.css";
import "./index.css";

import App from "./components/App/App";
import { store, StoreContext } from "./stores/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {/* </React.StrictMode> */}
  </StoreContext.Provider>
);
