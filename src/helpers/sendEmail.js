import axios from "axios";

export const sendEmail = (nameWin, email, token) => {
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
        //navigate("/waiting-email");
      })
      .catch((err) => {});
  };

