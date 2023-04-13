import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Categories from "./Categories";
import CategoriesEditing from "./CategoriesEditing";
import NewsEditing from "./NewsEditing";
import NewsSources from "./NewsSources";
import Home from "./Home";
import NewsSave from "./NewsSave";
import CategoriesSave from "./CategoriesSave";
import HomeCategory from "./HomeCategory";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home-category" element={<HomeCategory />} />
          <Route path="/news-sources" element={<NewsSources />} />
          <Route path="/news-edit" element={<NewsEditing />} />
          <Route path="/news-add" element={<NewsSave />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories-edit" element={<CategoriesEditing />} />
          <Route path="/categories-add" element={<CategoriesSave />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
