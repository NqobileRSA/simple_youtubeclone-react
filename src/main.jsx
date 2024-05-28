import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
);
