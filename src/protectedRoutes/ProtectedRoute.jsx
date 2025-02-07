// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";


const ProtectedRoute = ({ children }) => {
  // Check token in cookies or local storage
  const { token } = useContext(MyContext);

  if (!token || token === "undefined") {
    // Redirect to login if no token
    return <Navigate to="/login" replace />;
  }
  
  

  // Render children if authenticated
  return  <>{children}</>;;
};

export default ProtectedRoute;
