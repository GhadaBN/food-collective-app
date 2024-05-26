import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import StoreContextProvider from "./context/StoreContext";
import "./index.css";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StoreContextProvider>
    <Router>
      <App />
    </Router>
  </StoreContextProvider>
);
