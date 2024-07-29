import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/scss/style.scss";
import Routes from "./routes/index"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Common/Header";

function App() {

  return (
    <>
    <Header />
       <Routes />
       <ToastContainer />
    </>
  );
}

export default App;
