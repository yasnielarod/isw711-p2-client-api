import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/messajeNotVf.css";

const MessageNotVf = (props) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        const direc = props.handlebtn;
        navigate(direc);
    }
    //The data has not been verified. Please check the data and try again...
    //Back to sign up
  return (
    <div className="message-not-vf-container">
      <p>{props.mjsInfo}</p>
      <button className="message-not-vf-button" onClick={handleClick}>{props.msjButton}</button>
    </div>
  )
}

export default MessageNotVf