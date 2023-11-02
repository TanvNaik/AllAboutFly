import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./user/Cart";
import TermsandConditions from "./core/TermsandConditions";
import Checkout from "./order/Checkout.js";
import Orders from "./admin/Orders";
import Contact from "./core/Contact";
import NotFound from "./core/NotFound";
export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/signup' exact element={<Signup/>} />
        <Route path='/signin' exact element={<Signin/>} />
        <Route path='/contact-us' exact element={<Contact/>} />
        <Route path='/terms-conditions' exact element={<TermsandConditions/>} />

        <Route
            path="/user/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
        <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
        <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
        
        <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />
        <Route
            path="/admin/create/category"
            element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            }
          />
        <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <ManageCategories />
              </AdminRoute>
            }
          />
        <Route
            path="/admin/create/product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
        <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ManageProducts />
              </AdminRoute>
            }
          />
        <Route
            path="/admin/product/update/:productId"
            element={
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            }
          />
        <Route
            path="/admin/category/update/:categoryId"
            element={
              <AdminRoute>
                <UpdateCategory />
              </AdminRoute>
            }
          />
        
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
