import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/landing/AppBar";
import Landing from "./components/landing/Landing";
import React from "react";
import DashBoard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/experience" element={<ExperiencePage />} /> */}
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;