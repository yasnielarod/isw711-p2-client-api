import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import "../styles/messajeError.css";
import user from "../images/user.png";
import email from "../images/email.jpg";
import password from "../images/password.png";

const userInicial = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(userInicial);
  const [error, setError] = useState("");
  const [err, setErr] = useState({});

  const handleChangeInput = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validateForm(login);
    if (Object.keys(errors).length === 0) {
      axios
        .post(
          "http://localhost:4000/api/auth/",
          {
            email: login.email,
            password: login.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data.data);
          sessionStorage.setItem(
            "loginToken",
            JSON.stringify(res.data.data.token)
          );
          sessionStorage.setItem(
            "userConect",
            JSON.stringify(res.data.data.user._id)
          );
          sessionStorage.setItem(
            "roleUser",
            JSON.stringify(res.data.data.user.role[0])
          );
          navigate("/home");
        })
        .catch((err) => {
          if (err.response) {
            const statusErr = err.response.status;
            if (statusErr === 404) {
              setError(err.response.data.error);
            } else if (err.response.status === 401)
              setError(err.response.data.error);
          }
        });
    } else {
      setErr(errors);
      console.log(errors);
    }
  };

  const validateForm = (values) => {
    let errors = {};

    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    return errors;
  };

  const handleRegister = (e) => navigate("/register");

  return (
    <div className="wrapper">
      <div className="imgs">
        <div className="container-image">
          <img src={user} alt="user" className="profile" />
        </div>
      </div>
      <div>
        <form>
          <h1>User Login</h1>
          <img src={email} alt="email" className="email" />
          <input
            type="text"
            placeholder="Email Address"
            className="name"
            name="email"
            onChange={handleChangeInput}
          />
          {err.email && <div className="error">{err.email}</div>}
          <div className="second-input">
            <img src={password} alt="pass" className="email" />
            <input
              type="password"
              placeholder="Password"
              className="name"
              name="password"
              onChange={handleChangeInput}
            />
            {err.password && <div className="error">{err.password}</div>}
          </div>
          {error && <div className="error">{error}</div>}
          <button onClick={handleLogin}>Login</button>
        </form>
        <p>
          If you don't have an account,{" "}
          <a href="register" onClick={handleRegister}>
            sign up here.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
