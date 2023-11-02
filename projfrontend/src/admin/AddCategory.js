import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

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
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };
  const succesMessage = () => {
    if (success) {
      return <h4 className='text-success'> Category created succesfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className='text-danger'> Failed to create category</h4>;
    }
  };
  const addCategoryForm = () => {
    return (
      <form>
        <div className='form-group'>
          <p className='lead'>Enter the category</p>
          <input
            type='text'
            className='form-control my-3'
            autoFocus
            onChange={handleChange}
            value={name}
            required
            placeholder='For Ex. Summer'
          />
          <button onClick={onSubmit} className='btn btn-success  '>
            Create category
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
            <h1>Admin Category</h1>
            <nav className="d-flex align-items-center">
              <a href="index.html">
                Home<span className="lnr lnr-arrow-right"></span>
              </a>
              <a href="single-product.html">Dashboard<span className="lnr lnr-arrow-right"></span> </a>
              <a href="single-product.html">Add Category </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End Banner Area --> */}
      <div className='row   pt-2'>
        <div className='col-md-8 offset-md-2 bg-white rounded p-2 '>
          {succesMessage()}
          {errorMessage()}
          {addCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
