import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };
  useEffect(() => {
    preload(match.params.categoryId);
  }, []);
  const goBack = () => {
    return (
      <div className='mt-5'>
        <Link className='btn btn-success btn-sm mb-3' to='/admin/dashboard'>
          Admin Home
        </Link>
      </div>
    );
  };
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    updateCategory(match.params.categoryId, name, user._id, token).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          preload(match.params.categoryId);
        }
      }
    );
  };
  const successMessage = () => {
    if (success) {
      return <h4 className='text-success'> Category updated succesfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className='text-danger'> Failed to update category</h4>;
    }
  };
  const updateCategoryForm = () => {
    return (
      <form>
        <div className='form-group'>
          <p className='lead'>Update the category : {name}</p>
          <input
            type='text'
            className='form-control my-3'
            autoFocus
            onChange={handleChange}
            value={name}
            required
            placeholder='For Ex. Summer'
          />
          <button onClick={onSubmit} className='btn btn-outline-info '>
            Update category
          </button>
        </div>
      </form>
    );
  };
  return (
    <Base
      
    >
      {/* <!-- Start Banner Area --> */}
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1>Update Categories</h1>
            <nav className="d-flex align-items-center">
              <a href="index.html">
                Home<span className="lnr lnr-arrow-right"></span>
              </a>
              <a href="single-product.html">Dashboard<span className="lnr lnr-arrow-right"></span> </a>
              <a href="single-product.html"> Update Category </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End Banner Area --> */}
      <div className='row pt-2'>
        <div className='col-md-8 offset-md-2 bg-white rounded p-2'>
          {successMessage()}
          {errorMessage()}
          {updateCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
