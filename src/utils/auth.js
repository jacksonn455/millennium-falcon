import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;