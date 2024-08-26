import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChooseUser from "./pages/ChooseUser";
import AdminRegister from "./pages/AdminRegister";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/choose" element={<ChooseUser />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
