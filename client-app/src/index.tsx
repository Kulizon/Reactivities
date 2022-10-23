import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { store, StoreContext } from "./stores/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </StoreContext.Provider>
);
