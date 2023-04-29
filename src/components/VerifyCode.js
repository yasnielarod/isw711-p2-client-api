import React, { useState } from "react";
import "../styles/modal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userCode = {
  code: "",
};

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState(userCode);
  const [error, setError] = useState("");
  const email = JSON.parse(sessionStorage.getItem("emailUser"));
  const navigate = useNavigate();
  
  const handleChangeInput = (e) => {
    setVerificationCode({
      ...verificationCode,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/auth/",
        {
          email,
          code: verificationCode.code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        //console.log(res.data.data);
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
          } else if (err.response.status === 400)
            setError(err.response.data.error);
        }
      });
  };

  const handleExit = (e) => {
    e.preventDefault();
    deleteCode();
    navigate("/login");
  };
  const handleResendCode = (e) => {
    e.preventDefault();
    deleteCode();
      axios
          .post(
            "http://localhost:4000/api/send-code/",
            {
              email
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            sessionStorage.setItem(
              "idEmailCode",
              JSON.stringify(res.data.data._id)
            );
          })
          .catch((err) => {
          });

  }

  const deleteCode = () => {
    const codeEmail = JSON.parse(sessionStorage.getItem("idEmailCode"));
    if(deleteCode){
      const url = `http://localhost:4000/api/send-code/${codeEmail}`;
      //---
      axios.delete(url)
      .then((res) => {
        console.log(res.status);
        localStorage.removeItem('idEmailCode')
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
          if (err.response.status === 401) {
            navigate("/login");
          } else {
            console.log(err.response.data.message);
          }
        } else if (err.request) {
          console.log("Network error:", err.request);
        } else {
          console.log("Unexpected error:", err.message);
        }
      });
    }

  }
  
return (
  <div className="verification-container">
    <div className="verification-content">
      <h2 className="verification-heading">Verification Code</h2>
      <p className="verification-text">Please enter the verification code you received:</p>
      <div className="verification-input-container">
        <input
          type="text"
          placeholder="Code"
          name="code"
          onChange={handleChangeInput}
          className="verification-input"
        />
        <button onClick={handleResendCode} className="verification-resend"> Resend Code</button>
      </div>
      {error && <div className="verification-error">{error}</div>}
      <div className="verification-button-container">
        <button onClick={handleVerify} className="verification-check">
          Check
        </button>
        <button onClick={handleExit} className="verification-exit">
          Exit
        </button>
      </div>
    </div>
  </div>
);
};


export default VerifyCode;
