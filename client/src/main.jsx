import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/400-italic.css";

import { RouterProvider } from "react-router-dom";
import router from "./router";
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
