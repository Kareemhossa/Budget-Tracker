import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BudgetProvider } from "./Context/BudgetContext";
//tosty
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BudgetProvider>
    <ToastContainer
      // position="top-center"
      autoClose={1000}
      closeOnClick
      pauseOnHover={false}
    />
    <App />
    <ToastContainer />
  </BudgetProvider>
);
