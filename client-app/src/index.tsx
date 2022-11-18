import React from "react";
import ReactDOM from "react-dom/client";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import CustomRouter from "./CustomRouter";
import App from "./App";
import { store, StoreContext } from "./stores/store";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    {/* <React.StrictMode> */}
    <CustomRouter history={history}>
      <App />
    </CustomRouter>

    {/* </React.StrictMode> */}
  </StoreContext.Provider>
);
