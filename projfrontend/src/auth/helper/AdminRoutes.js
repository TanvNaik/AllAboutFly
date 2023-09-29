import React from "react";
import {  Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ( {children} ) => {
  if( !isAuthenticated())
    return <Navigate to={"/signin"} />


  else if (isAuthenticated().user.role === 1)
  return  children




};

export default AdminRoute;
