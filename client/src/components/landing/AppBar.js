import * as React from "react";
import { useEffect } from "react";
import "./landing.css";
import logo from "../../assets/images/logo.png";
import Button from "../../widgets/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const valueFromLocalStorage = localStorage.getItem("token");
  const user = useSelector(selectUser);
  useEffect(() => {}, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="navbar_container">
      <div className="navbar_logo_container">
        <img
          src={logo}
          onClick={() => {
            navigate("/");
            console.log("Clicked");
          }}
          className="main_logo"
          alt="logo"
        />
        Mindbloom.ai
      </div>

      {valueFromLocalStorage === null ? (
        <div className="navbar_links">
          <Button text="Login" to="/login" />
          <Button text="Register" to="/register" />
        </div>
      ) : (
        <div className="btn_container" onClick={handleLogout}>
          Logout
        </div>
      )}
    </div>
  );
}
