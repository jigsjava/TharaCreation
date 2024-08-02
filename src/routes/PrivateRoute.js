import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); 
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Show toast message when redirecting to login
      toast.info("You need to log in to access this page.");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return Component;
};

export default PrivateRoute;
