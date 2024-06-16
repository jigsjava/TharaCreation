// routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import EmailVerify from "../pages/Auth/EmailVerify";
import Dashboard from "../pages/Dashboard";
import SubCategory from "../pages/SubCategory";
import ProductListing from "../pages/ProductListing";
import ProductDetails from "../pages/ProductDetails";
import AddToCart from "../pages/AddToCart";
import Address from "../pages/Address";
import ProductHistory from "../pages/ProductHistory";
import ForgotPassWord from "../pages/Auth/ForgotPassWord";
import ProfilePage from "../pages/ProfilePage";
import UpdatePassword from "../pages/Auth/UpdataPassword";

const routes = () => {
  return (
    <>
        <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/emailverify" element={<EmailVerify />} />
      <Route path="/forgot" element={<ForgotPassWord />} />
      <Route path="/update" element={<UpdatePassword />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/subcategory" element={<SubCategory/>} />
      <Route path="/productlist" element={<ProductListing/>} />
      <Route path="/producdetails" element={<ProductDetails/>} />
      <Route path="/addcart" element={<AddToCart/>} />
      <Route path="/address" element={<Address/>} />
      <Route path="/history" element={<ProductHistory/>} />
      <Route path="/profile" element={<ProfilePage/>} />
    </Routes>
    </>
  );
};

export default routes;
