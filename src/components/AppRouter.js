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
import ConfirmEmail from "./ConfirmEmail";
import WaitingWin from "./WaitingWin";
import VerifyCode from "./VerifyCode";
import LoginPasswordless from "./LoginPasswordless";
import Passwordles from "./Passwordles";
import WaitingLogin from "./WaitingLogin";
import ConfirmPass from "./ConfirmPass";
import Loading from "./Loading ";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/waiting-email" element={<WaitingWin />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/login-email" element={<LoginPasswordless />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/passwordles" element={<Passwordles />} />
          <Route path="/waiting-pass" element={<WaitingLogin />} />
          <Route path="/confirm-pass" element={<ConfirmPass />} />
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
