import React from "react";
import "../styles/header.css";
import tv from "../images/tv.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const roloUser = JSON.parse(sessionStorage.getItem("roleUser")); //Get role user

  const userMenu = [
    { nameT: "home", opcion: "My cover" },
    { nameT: "newsource", opcion: "News Sources" },
    { nameT: "logout", opcion: "Logout" },
  ];
  const adminMenu = [
    { nameT: "home", opcion: "My cover" },
    { nameT: "newsource", opcion: "News Sources" },
    { nameT: "categories", opcion: "Categories" },
    { nameT: "logout", opcion: "Logout" },
  ];

  const handleOption = (e) => {
    e.preventDefault();
    const opSelect = e.target.value;
    switch (opSelect) {
      case "My cover":
        navigate("/home");
        break;
      case "News Sources":
        navigate("/news-sources");
        break;
      case "Categories":
        navigate("/categories");
        break;
      case "Logout":
        sessionStorage.clear();
        navigate("/login");
        break;
      default:
        console.log("Option no valid");
    }
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <img src={tv} alt="tv" className="tv" />
          </li>
          <li>
            <h1 className="title_header">My News Cover</h1>
          </li>
          <li>
            <p>{"Connected: " + roloUser}</p>
            <select className="header_select">
              {roloUser && roloUser === "user"
                ? userMenu.map((ele) => (
                    <option key={Math.random()*1000} name={ele.nameT} onClick={handleOption}>
                      {ele.opcion}
                    </option>
                  ))
                : adminMenu.map((ele) => (
                    <option key={Math.random()*1000} name={ele.nameT} onClick={handleOption}>
                      {ele.opcion}
                    </option>
                  ))}
            </select>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
