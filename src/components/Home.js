import React, { useEffect, useState } from "react";
import Select from "react-select";
import Header from "./Header.js";
import Footer from "./Footer.js";
import HomeCard from "./HomeCard.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryList from "./CategoryList.js";
import "../styles/home.css";

const keywordInicial = {
  keyword: "",
};

const Home = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [keyw, setKeyw] = useState(keywordInicial);
  //--
  const [listSelect, setListSelect] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const idUser = JSON.parse(sessionStorage.getItem("userConect"));

  const handleChangeInput = (e) => {
    setKeyw({
      ...keyw,
      [e.target.name]: e.target.value,
    });
  };

  const searchNewsKeyword = () => {
    const GRAPHQL_ENDPOINT = "http://localhost:5000/";
    const keyword = keyw.keyword; // Define el valor de la palabra clave a buscar
    const query = `
      query {
        filterNews(id: "${idUser}", keyword: "${keyword}") {
          _id,
          image,
          title,
          shortDescrip,
          permanLink,
          date,
          newSourseId,
          userId,
          categoryId,
          nameCategory,
        }
      }
    `;
    axios
      .post(GRAPHQL_ENDPOINT, { query })
      .then((response) => {
        console.log(response.data.data.filterNews);
        setNews(response.data.data.filterNews);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchNewsKeyword();
  };

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

  function handleOptionChange(newOptions) {
    setSelectedOptions(newOptions);
  }

  const handleSearchManyCategory = async () => {
    const listCategories = [];
    //console.log(selectedOptions[0])
    //console.log(selectedOptions);
    for (let i = 0; i < selectedOptions.length; i++) {
      const value = selectedOptions[i]["value"];
      console.log(value);
      listCategories.push(value);
    }
    console.log(listCategories);
    const idUser = JSON.parse(sessionStorage.getItem("userConect"));
    const GRAPHQL_ENDPOINT = "http://localhost:5000/";
    const query = `
      query {
        newsCategories(id: "${idUser}", categories: ["${listCategories.join(
      '","'
    )}"]) {
          _id,
          image,
          title,
          shortDescrip,
          permanLink,
          date,
          newSourseId,
          userId,
          categoryId,
          nameCategory,
        }
      }
    `;

    try {
      const response = await axios.post(GRAPHQL_ENDPOINT, { query });
      console.log(response.data.data.newsCategories);
      setNews(response.data.data.newsCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchManyCategory();
  };
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post("http://localhost:5000/", {
          query: `
            query {
              uniqueCategories {
                name
              }
            }
          `,
        });

        const categories = response?.data?.data?.uniqueCategories || [];
        const formattedCategories = categories.map(({ name }) => ({
          value: name,
          label: name,
        }));

        setListSelect(formattedCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const getAllNews = async () => {
      const urlNews = `http://localhost:4000/api/news/${idUser}`;
      const tokenValue = JSON.parse(sessionStorage.getItem("loginToken"));
      try {
        const res = await axios.get(urlNews, {
          headers: { Authorization: `Bearer ${tokenValue}` },
        });
        console.log(res.data.data);
        setNews(res.data.data);
      } catch (error) {
        if (error.response.status === 404) setNews([]);
        console.log(error.response);
      }
    };
    getAllNews();
  }, [keyw]);

  return (
    <div className="container">
      <Header key={Math.random() * 1000} />
      <CategoryList />
      <div className="container-s">
        <div className="container-search">
          <input
            className="container-search-input"
            name="keyword"
            onChange={handleChangeInput}
            placeholder="Keyword"
          />
          <button className="container-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="container-select">
          <Select
            className="select"
            options={listSelect}
            isMulti
            onChange={handleOptionChange}
          />
          <button className="select-btn" onClick={handleSubmit}>
            Search Categories
          </button>
        </div>
      </div>
      <h2>Your Unique News Cover</h2>
      <div className="conteiner-cart">
        {news.length > 0 &&
          news.map((element) => (
            <HomeCard
              key={Math.random() * 1000}
              imageSrc={element.image}
              title={element.title}
              description={element.shortDescrip}
              date={dateNew(element.date)}
              link={element.permanLink}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
