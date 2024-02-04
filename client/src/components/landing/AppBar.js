import * as React from "react";
import "./landing.css";
import logo from "../../assets/images/logo.png";
import Button from "../../widgets/Button";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="navbar_container" style={{ backgroundColor: "" }}>
      <div className="navbar_logo_container">
        <img
          src={logo}
          onClick={() => navigate("/")}
          className="main_logo"
          alt="logo"
        />
        Mentallyyy
      </div>

      <div className="navbar_links">
        <Button text="Login" to="/login" />
        <Button text="Register" to="/register" />
      </div>
    </div>
  );
}
