import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/categoryList.css"

const CategoryList = () => {
  const navigate = useNavigate();
  const tokenValue = JSON.parse(sessionStorage.getItem("loginToken"));
  const [categories, setCategories] = useState([]);


  
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
        // console.log(response)
        setCategories(categories);
        // console.log(categories)
   
      } catch (error) {
        if (error.response.status >= 400) setCategories([]);
      }
    }
    fetchCategories();

  },[])

  const handleBtn = (e) => {
    e.preventDefault();
    const idCategory = e.target.dataset.id;
    console.log(idCategory);
    sessionStorage.setItem("idCategoryHome", JSON.stringify(idCategory));
    navigate("/home-category");
    // window.location.reload();
  }

  return (
    <div className="conteiner-list">
      <h3 className="h3">Categories</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <button data-id={category._id} onClick={handleBtn}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
