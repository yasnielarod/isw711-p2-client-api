import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "../styles/messajeError.css";
import "../styles/newsSave.css";

const newInicial = {
  url: "",
  name: "",
};
const NewsSave = () => {
  const navigate = useNavigate();
  const tokenValue = JSON.parse(sessionStorage.getItem("loginToken"));
  const userId = JSON.parse(sessionStorage.getItem("userConect")); //Get id user connect

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [addNews, setAddNews] = useState(newInicial);
  const [err, setErr] = useState({});
  const [errorServer, setErrorServer] = useState("");

  //Load categories
  useEffect(()=> {
    const fetchCategories = async () => {
      try {
        const response = await axios.post("http://localhost:5000/", {
          query: `
          query{
            allCategories {
               _id
              name
            }
          }
          `,
        });

        const categories = await response?.data?.data?.allCategories || [];
        console.log(response)
        setCategories(categories);
        console.log(categories)
   
      } catch (error) {
        if (error.response.status >= 400) setCategories([]);
      }
    }
    fetchCategories();

  },[])

  //-------
  const handleInput = (e) => {
    setAddNews({
      ...addNews,
      [e.target.name]: e.target.value,
    });
  };

  //-------
  const handleSelect = (e) => {
    e.preventDefault();
    setCategoryId(e.target.dataset.id);
  };
  //-------
  const handleBtn = (e) => {
    e.preventDefault();
    const errors = validateForm(addNews);
    if (Object.keys(errors).length === 0) {
      const url = "http://localhost:4000/api/newsource/";
      const data = {
        url: addNews.url,
        name: addNews.name,
        categoryId: categoryId,
        userId,
      };
      console.log(data);
      const config = {
        headers: { Authorization: `Bearer ${tokenValue}` },
      };
      axios
        .post(url, data, config)
        .then((res) => {
          console.log(res.data.data._id);
          const idNewSource = res.data.data._id;
          addNew(idNewSource);
        })
        .catch((err) => {
          if (err.response) {
            const statusErr = err.response.status;
            if (statusErr === 404) {
              setErrorServer(err.response.data.error);
            } else if (statusErr === 401) {
              navigate("/login");
            }
          }
        });
    } else {
      setErr(errors);
      console.log(errors);
    }
  };
  //Get info user new sorce 
  const addNew = (idNewSource) => {
    const tokenValue = JSON.parse(sessionStorage.getItem("loginToken"));
    const urlNew = `http://localhost:4000/api/newsource/${idNewSource}`;
    axios
      .post(urlNew, null, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      })
      .then((res) => {
        console.log(res.status);
        navigate("/news-sources");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //hanlde btn cancel
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/news-sources");
  };
//handle emtry input
  const validateForm = (values) => {
    let errors = {};
    if (!values.url) {
      errors.url = "Url is required";
    }
    if (!values.name) {
      errors.name = "Name is required";
    }
    return errors;
  };
  return (
    <div className="container">
      <Header key={Math.random() * 1000} />
      <h2>News source</h2>
      <div className="category-edit-c">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleInput}
          required
        />
        {err.name && <div className="error">{err.name}</div>}
        <br />
        <input
          type="text"
          placeholder="RSS URL"
          name="url"
          onChange={handleInput}
          required
        />
        {err.url && <div className="error">{err.url}</div>}
        <br />
        <select className="i_sources" key={Math.random() * 1000}>
          {categories.length ? (
            categories.map((ele) => (
              <option data-id={ele._id} onClick={handleSelect}>
                {ele.name}
              </option>
            ))
          ) : (
            <option>Category</option>
          )}
        </select>
        {errorServer && <div className="error">{errorServer}</div>}
        <button  id="b_buscador"onClick={handleBtn}>
          Add
        </button>
        <button  id="b_buscador" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default NewsSave;
