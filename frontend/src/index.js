import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SubjectsContextProvider } from "./context/SubjectContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SubjectsContextProvider>
      <App />
    </SubjectsContextProvider>
  </React.StrictMode>
);
