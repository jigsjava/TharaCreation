import React from "react";
import SwiperSlider from "../../components/SwiperSlider";
import Categories from "../../components/Categories";
import LogOut from "../Auth/Logout";


const Dashboard = () => {
  
  return (
    <div className="container">
      <SwiperSlider />
      <Categories />
      <LogOut />
    </div>
  );
};

export default Dashboard;