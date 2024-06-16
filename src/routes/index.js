// routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import SubCategory from "../pages/SubCategory";
import ProductListing from "../pages/ProductListing";
import ProductDetails from "../pages/ProductDetails";

const routes = () => {
  return (
    <>
        <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/subcategory" element={<SubCategory/>} />
      <Route path="/productlist" element={<ProductListing/>} />
      <Route path="/producdetails" element={<ProductDetails/>} />
    </Routes>
    </>
  );
};

export default routes;
