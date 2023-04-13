import React, { useEffect, useState } from "react";
import "../styles/newsSources.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewsSources = () => {
  const navigate = useNavigate();
  const tokenValue = JSON.parse(sessionStorage.getItem("loginToken"));
  const [newsSource, setNewsSource] = useState([]);
  //-------
  useEffect(() => {
    const idUser = JSON.parse(sessionStorage.getItem("userConect"));
    console.log(idUser);
    const url = `http://localhost:4000/api/newsource/${idUser}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${tokenValue}` } })
      .then((res) => {
        console.log(res.data.data);
        setNewsSource(res.data.data);
      })
      .catch((error) => {
        if (error.response.status >= 400) setNewsSource([]);
        console.log(error.response);
      });
  }, []);
  
  //-------
  const handleAdd = (e) => {
    e.preventDefault();
    navigate("/news-add");
  }
  //-------
  const handleEdit = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("idNewSource");
    sessionStorage.setItem("idNewSource", JSON.stringify(e.target.dataset.id));
    navigate("/news-edit");
  }
    //-------
  const handleDelete = (e) => {
    e.preventDefault();
    const idNewSource = e.target.dataset.id;
    if(idNewSource){
      const url = `http://localhost:4000/api/newsource/${idNewSource}`;
      const config = {
        headers: { Authorization: `Bearer ${tokenValue}` },
      };
      //---
      axios.delete(url, config)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
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
    <div className="container">
      <Header key={Math.random()*1000} />
      <h2>News Sources</h2>
      
      <table className="t_newsource">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsSource.length ? (
            newsSource.map((dato, index) => (
              <tr  key={Math.random()*1000}>
                <td>{dato.name}</td>
                <td>{dato.nameCategory}</td>
                <td>
                  <button  name="Edit" data-id={dato._id} onClick={handleEdit}>Edit</button> <button data-id={dato._id} onClick= {handleDelete}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>Add a new source</tr>
          )}
        </tbody>
      </table>
      <button id="b_buscador" name="Add" onClick={handleAdd}>Add new</button>
      <Footer />
    </div>
  );
};

export default NewsSources;
