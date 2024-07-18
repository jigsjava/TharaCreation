// routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import EmailVerify from "../pages/Auth/EmailVerify";
import AddToCart from "../pages/AddToCart";
import Address from "../pages/Address";
import ProductHistory from "../pages/ProductHistory";
import ForgotPassWord from "../pages/Auth/ForgotPassWord";
import ProfilePage from "../pages/ProfilePage";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import CategoryManager from "../pages/Admin/CategoryManager";
import AdminDashoboard from "../pages/Admin/AdminDashoboard";
import AdminSubCategory from "../pages/Admin/AdminSubCategory";
import AdminAddProduct from "../pages/Admin/AdminProduct";
import AdminLayout from "../pages/Admin/SideBarLayout/AdminLayout";
import OrderList from "../pages/Admin/OrderList";
import Setting from "../pages/Admin/Setting";
import AdminSlider from "../pages/Admin/AdminSlider";
import Dashboard from "../pages/webApp/Dashboard";
import SubCategory from "../pages/webApp/SubCategory";
import ProductListing from "../pages/webApp/ProductListing";
import ProductDetails from "../pages/webApp/ProductDetails";

const routes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/emailverify" element={<EmailVerify />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassWord />} />
        <Route path="/update" element={<UpdatePassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/subcategory" element={<SubCategory />} />
        <Route path="/productlist" element={<ProductListing />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/addcart" element={<AddToCart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/history" element={<ProductHistory />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* -------Admin Dashboard ------------ */}

        <Route path="/admindashboard" element={<AdminLayout><AdminDashoboard /></AdminLayout>} />
        <Route path="/categorymanager" element={<AdminLayout><CategoryManager /></AdminLayout>} />
        <Route path="/adminsubcategory" element={<AdminLayout><AdminSubCategory /></AdminLayout>} />
        <Route path="/adminaddproduct" element={<AdminLayout><AdminAddProduct /></AdminLayout>} />
        <Route path="/order" element={<AdminLayout><OrderList /></AdminLayout>} />
        <Route path="/adminslider" element={<AdminLayout><AdminSlider /></AdminLayout>} />
        <Route path="/setting" element={<AdminLayout><Setting /></AdminLayout>} />
      </Routes>
    </>
  );
};

export default routes;
