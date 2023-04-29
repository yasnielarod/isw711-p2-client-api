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
  //const [viewModal, setViewModal] = useState(false);





  const handleChangeInput = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
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

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validateForm(login);
    if (Object.keys(errors).length === 0) {
      axios
        .post(
          "http://localhost:4000/api/login-initial/",
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
          //console.log(res.data);
          const email = res.data.data.email;
          sendSMS(email);
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

  const handlePowerLes = (e) => {
    e.preventDefault();
    navigate("/passwordles")
  }

  const sendSMS = (email) => {
    axios
      .post(
        "http://localhost:4000/api/send-code/",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        sessionStorage.setItem(
          "emailUser",
          JSON.stringify(res.data.data.email)
        );
        sessionStorage.setItem(
          "idEmailCode",
          JSON.stringify(res.data.data._id)
        );
        navigate("/verify-code");
      })
      .catch((err) => {
        if (err.response) {
          const statusErr = err.response.status;
          if (statusErr === 404) {
            setError(err.response.data.error);
          } else if (err.response.status === 400)
            setError(err.response.data.error);
        }
      });
  };

  const sendEmail = (nameWin, email, token) => {
    axios
      .post(
        "http://localhost:4000/api/send-email/",
        {
          nameWin,
          email,
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // navigate("/waiting-email");
      })
      .catch((err) => {});
  };


  const handleRegister = (e) => navigate("/register");

  return (
    <div>
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
              className="login-name login-input"
              name="email"
              onChange={handleChangeInput}
            />
            {err.email && <div className="error">{err.email}</div>}
            <div className="second-input">
              <img src={password} alt="pass" className="email" />
              <input
                type="password"
                placeholder="Password"
                className="login-name login-input"
                name="password"
                onChange={handleChangeInput}
              />
              {err.password && <div className="error">{err.password}</div>}
            </div>
            {error && <div className="error">{error}</div>}
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
            <br />
            <button className="login-btn" onClick={handlePowerLes}>
              Passwordless
            </button>
          </form>
          <p>
            If you don't have an account,{" "}
            <a href="register" onClick={handleRegister}>
              sign up here.
            </a>
          </p>
        </div>
      </div>
      {/* {viewModal && <ModalCode/>} */}
    </div>
  );
};

export default Login;
