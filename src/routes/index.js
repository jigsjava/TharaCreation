import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import EmailVerify from "../pages/Auth/EmailVerify";
import AddToCart from "../pages/webApp/AddToCart";
import Address from "../pages/webApp/Address";
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
import SuccessPage from "../pages/webApp/SuccessPage";
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

const routes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/emailverify" element={<EmailVerify />} />
      <Route path="/updatepassword" element={<UpdatePassword />} />
      <Route path="/forgotpassword" element={<ForgotPassWord />} />
      <Route path="/update" element={<UpdatePassword />} />
      <Route path="/" element={<Dashboard />} />

      {/* Public Routes */}
      
      <Route path="/subcategory" element={<PrivateRoute element={<SubCategory />} />} />
      <Route path="/productlist" element={<PrivateRoute element={<ProductListing />} />} />
      <Route path="/productdetails" element={<PrivateRoute element={<ProductDetails />} />} />
      <Route path="/addcart" element={<PrivateRoute element={<AddToCart />} />} />
      <Route path="/address" element={<PrivateRoute element={<Address />} />} />
      <Route path="/order-successful" element={<PrivateRoute element={<SuccessPage />} />} />
      <Route path="/history" element={<PrivateRoute element={<ProductHistory />} />} />
      <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />

      {/* Admin Routes */}
      <Route path="/admindashboard" element={<PrivateRoute element={<AdminLayout><AdminDashoboard /></AdminLayout>} />} />
      <Route path="/categorymanager" element={<PrivateRoute element={<AdminLayout><CategoryManager /></AdminLayout>} />} />
      <Route path="/adminsubcategory" element={<PrivateRoute element={<AdminLayout><AdminSubCategory /></AdminLayout>} />} />
      <Route path="/adminaddproduct" element={<PrivateRoute element={<AdminLayout><AdminAddProduct /></AdminLayout>} />} />
      <Route path="/order" element={<PrivateRoute element={<AdminLayout><OrderList /></AdminLayout>} />} />
      <Route path="/adminslider" element={<PrivateRoute element={<AdminLayout><AdminSlider /></AdminLayout>} />} />
      <Route path="/setting" element={<PrivateRoute element={<AdminLayout><Setting /></AdminLayout>} />} />
    </Routes>
  );
};

export default routes;
