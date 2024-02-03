import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/landing/AppBar";
import Landing from "./components/landing/Landing";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/experience" element={<ExperiencePage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
