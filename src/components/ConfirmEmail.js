import React, { useEffect, useState } from "react";
import Loading from "./Loading ";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageNotVf from "./MessageNotVf";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("tokenConfirm");
  sessionStorage.setItem("winConfirm", JSON.stringify(true));
  const [error, setError] = useState("");
  const [errorWin, setErrorWin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msjButton, SetMsjButton] = useState("");
  const [handleButton, setHandleButton] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const url = "http://localhost:4000/api/user/";
      const data = {
        verified: true,
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .patch(url, data, config)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          setLoading(false);
          setErrorWin(true);
          SetMsjButton("Back to register");
          setHandleButton("/register");
          if (err.response) {
            const statusErr = err.response.status;
            if (statusErr === 404) {
              setError(err.response.data.error);
            } else if (err.response.status === 401)
              setError(err.response.data.error);
            else if (err.response.status === 403)
              setError(err.response.data.error);
          }
        });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && (
        <Loading msj={"Please wait a moment"} valueLoading={loading} />
      )}
      {errorWin && (
        <MessageNotVf
          mjsInfo={error}
          msjButton={msjButton}
          handlebtn={handleButton}
        />
      )}
    </div>
  );
};

export default ConfirmEmail;
