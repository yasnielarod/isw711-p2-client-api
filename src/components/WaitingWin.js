import React, { useEffect, useState } from "react";
import Loading from "./Loading ";
import axios from "axios";
import MessageNotVf from "./MessageNotVf";

const WaitingWin = () => { 

  const [finallyTime, setFnallyTime] = useState(false);
  const [msjInfo, setMsjInfo] = useState("");
  const [msjButton, SetMsjButton] = useState("");
  const [handleButton, setHandleButton] = useState(null);
  const [loading, setLoading] = useState(true);
  //messaje prop
  const messaje = "Verifying data";
  const idUser = JSON.parse(sessionStorage.getItem("userRegister"));
  //funtion prop


  //Delete user
  const deleteUser = () => {
    axios
      .delete(
        `http://localhost:4000/api/user/${idUser}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifiedUser = () => {
    axios.get(
      `http://localhost:4000/api/user/${idUser}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res)
      const infoUser = res.data.data;
      if(infoUser.verified){
        setMsjInfo("Your registration has been completed successfully.");
        SetMsjButton("Back to login");
        setHandleButton("/login")
      }else{
        deleteUser();
        setMsjInfo("The data has not been verified. Please check the data and try again...");
        SetMsjButton("Back to sign up");
        setHandleButton("/register")
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  //is finally time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setFnallyTime(true);
      verifiedUser();
    }, 59000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading &&  <Loading msj={messaje} valueLoading={loading} />}
      {finallyTime && <MessageNotVf mjsInfo= {msjInfo} msjButton={msjButton} handlebtn={handleButton} />}
    </div>
  );
};

export default WaitingWin;
