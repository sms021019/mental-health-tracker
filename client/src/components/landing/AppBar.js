import * as React from "react";
import "./landing.css";
import logo from "../../assets/images/logo.png";
import Button from "../../widgets/Button";
import { useNavigate } from "react-router-dom";
import { selectUser } from '../../features/userSlice';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

export default function NavBar() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
      {console.log("USER: ", user)}
      {user == {} ? (
        <Button text="Logout" onClick={handleLogout} />
      ) : (
        <div className="navbar_links">
          <Button text="Login" to="/login" />
          <Button text="Register" to="/register" />
        </div>
      )}
    </div>
  );
}
