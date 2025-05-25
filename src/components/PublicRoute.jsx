import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const access_token = localStorage.getItem("login_user");

  return !access_token ? children : <Navigate to="/home" />;
};

export default PublicRoute;
