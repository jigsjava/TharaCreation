import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); 
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!isAuthenticated) {
    toast.info("You don't have access to this page.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin') {
    toast.info("You are not authorized to access this page.");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
