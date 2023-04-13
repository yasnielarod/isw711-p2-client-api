import React, { useEffect, useState } from "react";
import "../styles/categoriesEditing.css";
import "../styles/messajeError.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoriesEditing = () => {
  const navigate = useNavigate();
  // const userId = JSON.parse(sessionStorage.getItem("userConect")); //Get id user connect
  const tokenValue = JSON.parse(sessionStorage.getItem("loginToken")); // token
  const categoryId = JSON.parse(sessionStorage.getItem("idCategory")); // Get category id
  const [category, setCategory] = useState([]);
  const [err, setErr] = useState({});
  const [errorServer, setErrorServer] = useState("");

  //Load data to edit
  useEffect(() => {
    const url = `http://localhost:4000/api/categories/${categoryId}`;
    const config = {
      headers: { Authorization: `Bearer ${tokenValue}` },
    };
    axios
      .get(url, config)
      .then((res) => {
        const dataSee = res.data.data;
        setCategory(dataSee);
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
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const errors = validateForm(category);
    if (Object.keys(errors).length === 0) {
      const url = `http://localhost:4000/api/categories/${categoryId}`;
      const data = {
        name: category.name,
      };
      console.log(data);
      const config = {
        headers: { Authorization: `Bearer ${tokenValue}` },
      };
      //---
      axios
        .put(url, data, config)
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
      <Header key={Math.random()*1000}/>
      <h2>Categories</h2>
      <div className="category-edit-c">
        <input
          id= "i_category-edit"
          type="text"
          placeholder="Name"
          name="name"
          value={category.name}
          onChange={handleInput}
          required
        /><br/>
        {err.name && <div className="error">{err.name}</div>}
        {errorServer && <div className="error">{errorServer}</div>}
        <button className="buttonCategoryEdit" onClick={handleEdit}>
          Edit
        </button>
        <button className="buttonCategoryEdit" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesEditing;
