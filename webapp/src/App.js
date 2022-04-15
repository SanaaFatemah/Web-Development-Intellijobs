import React from "react";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Home />
      <Routes>
        <Route path="/" exact component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
