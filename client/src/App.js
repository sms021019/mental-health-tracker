import "./App.css";
import DailyQuestions from './components/dailyQuestions/dailyQuestions'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/landing/AppBar";
import Landing from "./components/landing/Landing";
import React from "react";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import PersonalInfo from "./components/personalInfo/personalInfo";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/experience" element={<ExperiencePage />} /> */}
          <Route path="/dailyQuestions" element={<DailyQuestions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personalInfo" element={<PersonalInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
