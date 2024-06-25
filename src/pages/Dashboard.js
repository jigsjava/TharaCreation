import React from "react";
import {useNavigate } from "react-router-dom";
import SwiperSlider from "../components/SwiperSlider";
import Categories from "../components/Categories";
import SearchForm from "../components/SearchForm";
import LogOut from "./Auth/Logout";


const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <SwiperSlider />
      <SearchForm />
      <Categories />
      <button className="btn btn-success m-5" onClick={() =>{navigate("/subcategory")}}>subcategory</button>
      <div><LogOut /></div>
    </div>
  );
};

export default Dashboard;