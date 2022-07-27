import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";



if (localStorage.getItem("theme") == null) {
  const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  localStorage.setItem("theme", deviceTheme ? "dark" : "light");
}

const theme = localStorage.getItem("theme");
const rootElement = document.documentElement;

if (theme === "dark") {
  rootElement.style.backgroundColor = `hsl(235, 21%, 11%)`;
  rootElement.classList.add("dark");
} else {
  rootElement.style.backgroundColor = `hsl(0, 0%, 98%)`;
  rootElement.classList.add("light");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
