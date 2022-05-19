import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import User from "./components/User";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <BrowserRouter>
   <Routes>
      <Route path="/login" element={<User />} />
      <Route path="*" element={<App />} />
   </Routes>
 </BrowserRouter>
);

reportWebVitals();


