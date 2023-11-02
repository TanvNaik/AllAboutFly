import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
const AdminDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className='card'>
        <h4 className='card-header bg-dark text-white'> Admin Navigation </h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/admin/create/category' className='nav-link text-info'>
              Create Category
            </Link>
            <Link to='/admin/categories' className='nav-link text-info'>
              Manage Categories
            </Link>
            <Link to='/admin/create/product' className='nav-link text-info'>
              Create Products
            </Link>
            <Link to='/admin/products' className='nav-link text-info'>
              Manage Products
            </Link>
            <Link to='/admin/orders' className='nav-link text-info'>
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className='card mb-4'>
        <h4 className='card-header'>Admin Information</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <span
              className='badge bg-success 
               mr-2'
            >
              Name:
            </span>
            &nbsp;
            {name}
          </li>
          <li className='list-group-item'>
            <span
              className='badge bg-success 
               mr-2 '
            >
              Email:
            </span>
            &nbsp;
            {email}
          </li>
          <li className='list-group-item'>
            <span className='badge bg-danger'>Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      
    >  {/* <!-- Start Banner Area --> */}
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1>Admin Dashboard</h1>
            <nav className="d-flex align-items-center">
              <a href="index.html">
                Home<span className="lnr lnr-arrow-right"></span>
              </a>
              <a href="single-product.html">Dashboard</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End Banner Area --> */}
      <div className='row mb-3'>
        <div className='col-3'>{adminLeftSide()}</div>
        <div className='col-9'>{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
