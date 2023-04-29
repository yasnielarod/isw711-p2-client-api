import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading ';
import MessageNotVf from './MessageNotVf';

const ConfirmPass = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('tokenConfirm');
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [errorWin, setErrorWin] = useState(false);
    const [msjButton, SetMsjButton] = useState("");
    const [handleButton, setHandleButton] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = () => {
        const url = "http://localhost:4000/api/passwordless/";
        const tokenValue = token;
        axios
          .get(url, { headers: { Authorization: `Bearer ${tokenValue}` } })
          .then((res) => {
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
            setLoading(false);
            setErrorWin(true);
            SetMsjButton("Back to login");
            setHandleButton("/login")
            if (err.response) {
              const statusErr = err.response.status;
              if (statusErr === 404) {
                setError(err.response.data.error);
              } else if (err.response.status === 401)
                setError(err.response.data.error);
                else if (err.response.status === 500)
                setError(err.response.data.error);
            }
          });
    }
    useEffect(() => {
        const timer = setTimeout( ()=> {
             login();
        }, 2000);
    
        return () => clearTimeout(timer);
      }, []);


  return (
    <div>
       {loading && <Loading  msj = {"Please wait a moment"} valueLoading={loading}/>}
       {errorWin && <MessageNotVf mjsInfo= {error} msjButton={msjButton} handlebtn={handleButton}/>}
    </div>
  )
}

export default ConfirmPass