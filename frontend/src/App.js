import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Encuesta from "./components/Encuesta";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/Registro"} element={<Registro />} />
        <Route path={"/Encuesta"} element={<Encuesta />} />
      </Routes>
    </Router>
  );
}

export default App;
