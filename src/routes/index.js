// routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Messanger from "../pages/Messanger";

const routes = () => {
  return (
    <>
        <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/messenger/:id" element={<Messanger/>} />
    </Routes>
    </>
  );
};

export default routes;
