import * as React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function NavBar() {
  return (
    <div className="navbar_container" style={{ backgroundColor: "" }}>
      {/* <Link to={"/"} className="appbar-text"> */}
      <img src={logo} className="main_logo" alt="logo" />
      {/* </Link> */}
    </div>
  );
}
