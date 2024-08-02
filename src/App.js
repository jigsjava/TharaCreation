import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/scss/style.scss";
import Routes from "./routes/index"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Common/Header";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if token exists in local storage

  // List of routes where Header should not be displayed (e.g., login, signup, etc.)
  const noHeaderRoutes = ['/login', '/signup', '/forgotpassword', '/emailverify', '/updatepassword'];

  // Conditionally render Header based on the route and authentication status
  const shouldRenderHeader = isAuthenticated && !noHeaderRoutes.includes(location.pathname);

  return (
    <>
    {shouldRenderHeader && <Header />}
       <Routes />
       <ToastContainer />
    </>
  );
}

export default App;
