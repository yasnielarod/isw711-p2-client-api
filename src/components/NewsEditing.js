import React, { useEffect, useState } from "react";
import "../styles/messajeError.css";
import "../styles/newsSave.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewsEditing = () => {
  const navigate = useNavigate();

  //Variable session storage
  const userId = JSON.parse(sessionStorage.getItem("userConect")); //Get id user connect
  const tokenValue = JSON.parse(sessionStorage.getItem("loginToken")); // token

  //Section category
  const [categories, setCategories] = useState([]);
  const newSourceId = JSON.parse(sessionStorage.getItem("idNewSource")); //Get id new source to edit
  const [oneNewSource, setOneNewSource] = useState([]); //Get only the new source data to edit
  const [categoryId, setCategoryId] = useState("");
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

  // useEffect(() => {
  //   const url = "http://localhost:4000/api/categories/";
  //   axios
  //     .get(url, { headers: { Authorization: `Bearer ${tokenValue}` } })
  //     .then((res) => {
  //       setCategories(res.data.data);
  //     })
  //     .catch((error) => {
  //       if (error.response.status >= 400) setCategories([]);
  //     });
  // }, []);
  //Get data to edit
  // useEffect(()=> {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:5000/", {
  //         query: `
  //         query{
  //           allCategories {
  //              _id
  //             name
  //           }
  //         }
  //         `,
  //       });

  //       const categories = await response?.data?.data?.allCategories || [];
  //       console.log(response)
  //       setCategories(categories);
  //       console.log(categories)
   
  //     } catch (error) {
  //       if (error.response.status >= 400) setCategories([]);
  //     }
  //   }
  //   fetchCategories();

  // },[])
  useEffect(() => {
    const url = `http://localhost:4000/api/newsource/${userId}`;
    const config = {
      headers: { Authorization: `Bearer ${tokenValue}` },
    };
    axios
      .get(url, config)
      .then((res) => {
        const dataEdit = res.data.data; // Guardar los datos de la API en una variable
        // setDataEdit(dataEdit);
        const myObject = dataEdit.find((item) => item._id === newSourceId);
        setOneNewSource(myObject);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  //Set infomacion to edit in inputs
  const handleInput = (e) => {
    const { name, value } = e.target;
    setOneNewSource({ ...oneNewSource, [name]: value });
  };
  // //Set information in select
  const handleSelect = (e) => {
    e.preventDefault();
    console.log(e.target.dataset.id);
    setCategoryId(e.target.dataset.id);
  };
  //Handle in btn edit
  const handleBtn = (e) => {
    e.preventDefault();
    const errors = validateForm(oneNewSource);
    if (Object.keys(errors).length === 0) {
      const url = `http://localhost:4000/api/newsource/${newSourceId}`;
      const data = {
        url: oneNewSource.url,
        name: oneNewSource.name,
        categoryId: categoryId,
        userId,
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
          navigate("/news-sources");
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
  //Handle btn cancel
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/news-sources");
  };
  const [selectedOption, setSelectedOption] = useState(
    oneNewSource.nameCategory
  );

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  //Error handler on empty inputs 
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
      {/* <p>-----------------------------------</p> */}
      <div className="category-edit-c">
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleInput}
        value={oneNewSource.name}
        required
      />
      {err.name && <div className="error">{err.name}</div>}
      <br />
      <input
        type="text"
        placeholder="RSS URL"
        name="url"
        onChange={handleInput}
        value={oneNewSource.url}
        required
      />
      {err.url && <div className="error">{err.url}</div>}
      <br />
      <select className="i_sources" value={selectedOption} onClick={handleSelectChange}>
        {categories.length ? (
          categories.map((ele) => (
            <option key={ele.id} data-id={ele._id} onClick={handleSelect}>
              {ele.name}
            </option>
          ))
        ) : (
          <option>Category</option>
        )}
      </select>
      {errorServer && <div className="error">{errorServer}</div>}
      {/* <p>-----------------------------------</p> */}
      <button id="b_buscador" onClick={handleBtn}>
        Edit
      </button>
      <button id="b_buscador" onClick={handleCancel}>
        Cancel
      </button>
      </div>
      <Footer />
    </div>
  );
};

export default NewsEditing;
