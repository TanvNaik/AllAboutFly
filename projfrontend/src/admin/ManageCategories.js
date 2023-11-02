import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const deleteaCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base >
    {/* <!-- Start Banner Area --> */}
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1>Manage Categories</h1>
            <nav className="d-flex align-items-center">
              <a href="index.html">
                Home<span className="lnr lnr-arrow-right"></span>
              </a>
              <a href="single-product.html">Dashboard<span className="lnr lnr-arrow-right"></span> </a>
              <a href="single-product.html"> Manage Categories </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End Banner Area --> */}
      <Link className='btn btn-success' to={`/admin/dashboard`}>
        <span className=''>Admin Home</span>
      </Link>

      <div className='row bg-light rounded w-100 text-dark justify-content-center'>
        <div className='col-8  '>
          
          <table class="table table-secondary m-3  ">
                    <thead>
                      <tr>
                        <th scope="col">Category name</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category, key) => {
                        return (
                          <tr key={key}>
                            <td>{category.name} </td>
                            <td><Link
                    className='btn btn-success'
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className=''>Update</span>
                  </Link></td>
                            <td><button
                    onClick={() => {
                      deleteaCategory(category._id);
                    }}
                    className='btn btn-danger'
                  >
                    Delete
                  </button></td>
                          </tr>
                        );
                      })}
                      </tbody>
                      </table>
                <hr/>
              </div>
            
          
      </div>
    </Base>
  );
};

export default ManageCategories;
