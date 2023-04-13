import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "../styles/messajeError.css";

const inicialCate = {
  name: "",
};
const CategoriesSave = () => {
  const navigate = useNavigate();
  // const userId = JSON.parse(sessionStorage.getItem("userConect")); //Get id user connect
  const tokenValue = JSON.parse(sessionStorage.getItem("loginToken")); // token
  // const categoryId = JSON.parse(sessionStorage.getItem("loginToken")); // Get category id
  const [category, setCategory] = useState(inicialCate);
  const [err, setErr] = useState({});
  const [errorServer, setErrorServer] = useState("");

  const handleInput = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errors = validateForm(category);
    if (Object.keys(errors).length === 0) {
      const url = "http://localhost:4000/api/categories/";
      const data = {
        name: category.name,
      };
      console.log(data);
      const config = {
        headers: { Authorization: `Bearer ${tokenValue}` },
      };
      axios
        .post(url, data, config)
        .then((res) => {
          console.log(res.data);
          navigate("/categories");
        })
        .catch((err) => {
          if (err.response) {
            const statusErr = err.response.status;
            if (statusErr === 409) {
              setErrorServer(err.response.data.error);
            }else if (statusErr === 403) {
              navigate("/home");
            }else if (statusErr === 401) {
              navigate("/login");
            }
          }
        });
    } else {
      setErr(errors);
      console.log(errors);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/categories");
  };
  const validateForm = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    return errors;
  };

  return (
    <div className="container">
      <Header />
      <h2>Categories</h2>
      <div className="category-edit-c">
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleInput}
        required
      />
      {err.name && <div className="error">{err.name}</div>}
      {errorServer && <div className="error">{errorServer}</div>}
      <button className="b_newsources" onClick={handleSave}>
        Save
      </button>
      <button className="b_newsources" onClick={handleCancel}>
        Cancel
      </button>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesSave;
