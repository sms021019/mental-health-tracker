import React, { useState } from "react";
import "./register.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserAPIMethod } from "../../api/client";
import { login } from "../../features/userSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPwd, setConfirmPwd] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRegister = (e) => {
    if (registerData.password !== confirmPwd) {
      alert("Passwords do not match");
      return;
    }
    console.log(registerData, confirmPwd);
    e.preventDefault();
    createUserAPIMethod(registerData).then((res) => {
      if (res.ok) {
        res.json().then((jsonResult) => {
          dispatch(login(jsonResult));
          console.log(jsonResult);
          localStorage.setItem("token", jsonResult._id);
        });
        navigate("/personalinfo");
      }
    });
  };
  return (
    <div className="register_container">
      <form onSubmit={handleRegister} className="register_form">
        <div className="register_title">Create An Account</div>
        <div className="register_subtitle">
          Your just one click away from a happier, healthier you.
          <br /> Take the first step today.
        </div>
        <div className="field">
          <i className="input-icon bi bi-alphabet-uppercase" />
          <input
            autoComplete="off"
            placeholder="First Name"
            className="input-field"
            type="text"
            onChange={handleInputChange}
            name="firstName"
          />
        </div>
        <div className="field">
          <i className="input-icon bi bi-alphabet-uppercase" />
          <input
            autoComplete="off"
            placeholder="Last Name"
            className="input-field"
            type="text"
            onChange={handleInputChange}
            name="lastName"
          />
        </div>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="Email"
            className="input-field"
            type="text"
            onChange={handleInputChange}
            name="email"
          />
        </div>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Password"
            className="input-field"
            type="password"
            onChange={handleInputChange}
            name="password"
          />
        </div>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Confirm Password"
            className="input-field"
            type="password"
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </div>

        <div
          className="register_login_link"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already Have an Account?
        </div>
        <div className="btn">
          <button className="register_btn">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign
            Up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
