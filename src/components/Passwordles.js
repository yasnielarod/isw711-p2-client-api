import React, { useState } from "react";
import "../styles/passwordles.css";
import {sendEmail} from "../helpers/sendEmail.js"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userPasswordles= {
  email: "",
};
const Passwordles = () => {
  const navigate = useNavigate();
  const[passwordles, setPasswordles] = useState(userPasswordles);
  const[error, setError] = useState("");


  const handleChangeInput = (e) => {
    setPasswordles({
      ...passwordles,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
        .post(
          "http://localhost:4000/api/passwordless/",
          {
            email: passwordles.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const email = res.data.data.user.email;
          const token = res.data.data.token;
          const nameWin = "confirm-pass";
          sendEmail(nameWin, email, token);
          navigate("/waiting-pass")
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
    }

  const handleExit = (e) => {
    e.preventDefault();
    navigate("/login");
  }
  
  return (
    <div className="passwordles">
      <div className="passwordles-content">
        <h2>Passwordles</h2>
        <p>Please enter your email address:</p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChangeInput}
          className="input"
        />
        {error && <div className="error">{error}</div>}
        <div className="passwordles-conteInput">
          <button onClick={handleLogin} className="login-button">
            Log in
          </button>
          <button onClick={handleExit} className="exit-button">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Passwordles;
