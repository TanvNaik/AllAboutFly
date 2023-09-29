import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ children }) => {
  if( !isAuthenticated())
  return <Navigate to={"/signin"} />  
  else
  return children

  
};

export default PrivateRoute;
