import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ContextProviders from './context'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProviders>
        <App />
      </ContextProviders>
    </BrowserRouter>
  </React.StrictMode>
);
