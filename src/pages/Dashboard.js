import React, { useEffect, useState } from "react";
import AxiosInstance from "../helpers/AxiosRequest";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SwiperSlider from "../components/SwiperSlider";
import Categories from "../components/Categories";
import SearchForm from "../components/SearchForm";
import { Button } from "bootstrap";


const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <SwiperSlider />
      <SearchForm />
      <Categories />
      <button className="btn btn-success m-5" onClick={() =>{navigate("/subcategory")}}>subcategory</button>
    </div>
  );
};

export default Dashboard;