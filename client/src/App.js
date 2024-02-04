import "./App.css";
import DailyQuestions from "./components/dailyQuestions/dailyQuestions";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/landing/AppBar";
import Landing from "./components/landing/Landing";
import React from "react";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import PersonalInfo from "./components/personalInfo/personalInfo";

import DashBoard from "./components/dashboard/Dashboard";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dailyquestions" element={<DailyQuestions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personalInfo" element={<PersonalInfo />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
