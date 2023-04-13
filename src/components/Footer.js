import React from 'react';
import '../styles/footer.css'
import Copyright from "../images/copyright.png";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleCover = (e) => {
    e.preventDefault();
    navigate("/home");

  }

  return (
      <footer>
        <nav>
            <ul>
                <li><a href="#" rel="noopener" onClick={handleCover}>My cover</a></li>
                <li>|</li>
                <li><a href="" rel="noopener">About</a></li>      
                <li>|</li>
                <li><a href="" rel="noopener">Help</a></li>     
            </ul>      
        </nav> 
        <img id="cr" src={Copyright} alt=""/>
        <p>My News Cover.net</p> 
    </footer>
  )
}

export default Footer;