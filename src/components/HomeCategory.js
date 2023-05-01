import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "./CategoryList";
import Footer from "./Footer";
import Header from "./Header";
import HomeCard from "./HomeCard";
import "../styles/home.css"


const HomeCategory = () => {
  const navigate = useNavigate();
  const tokenValue =  JSON.parse(sessionStorage.getItem("loginToken"));
  const idCategoryHome = JSON.parse(sessionStorage.getItem("idCategoryHome"));
  const idUser = JSON.parse(sessionStorage.getItem("userConect"));
  const [news, setNews] = useState([]);


  


  useEffect(()=> {
    console.log(idUser)
    const urlNews = `http://localhost:4000/api/news/${idUser}?category=${idCategoryHome}`;
    axios.get(urlNews , { headers: {"Authorization" : `Bearer ${tokenValue}`}})
    .then(res => {
      console.log(res.data.data);
      setNews(res.data.data);
    })
    .catch((error) => {
      if(error.response.status === 404) setNews([]);
      console.log(error.response)
    })
  },[idUser, idCategoryHome]);


  function dateNew(dateString) {
    const date = new Date(Date.parse(dateString.substr(5, 20)));
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses empiezan en 0
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();
    const formatDate = `${day}/${month}/${year} ${hour}:${min}`;

    return formatDate;
  }
  return (
    <div className="container">
      <Header key={Math.random()*1000} />
      <CategoryList key={Math.random()*1000}/>
      <h2>Your Unique News Cover</h2>
      <div className="conteiner-cart">
      {news.length
        ? news.map((element) => (
            <HomeCard
              key={Math.random() * 1000}
              imageSrc={element.image}
              title={element.title}
              description={element.shortDescrip}
              date={dateNew(element.date)}
              link={element.permanLink}
            />
          ))
        : (<p>There is no information about this category</p>)}
      </div>
      <Footer />
    </div>
  );
};

export default HomeCategory;
