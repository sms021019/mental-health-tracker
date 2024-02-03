import "./App.css";
import DailyQuestions from './components/dailyQuestions/dailyQuestions'

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
          <Route path="/dailyQuestions" element={<DailyQuestions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
