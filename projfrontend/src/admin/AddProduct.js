import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData
  } = values;

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
          getRedirect: true
        });
      }
    });
  };
  const getaRedirect = () => {
    if (loading === false && getRedirect === true) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  const succesMessage = () => {
    return (
      <div
        className='alert alert-success mt-3'
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4> {createdProduct} created succesfully!</h4>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className='alert alert-warning mt-3'
        style={{ display: error ? "" : "none" }}
      >
        <h4> {error}</h4>
      </div>
    );
  };
  const handleChange = (name) => (event) => {
    let value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className='form-group '>
        <label className='btn btn-block btn-success'>
          <input
            onChange={handleChange("photo")}
            type='file'
            name='photo'
            id="photo"
            accept='image'
            placeholder='choose a file'
          />
        </label>
      </div>
      <div className='form-group p-1'>
        <input
          onChange={handleChange("name")}
          name='name'
          className='form-control'
          placeholder='Name'
          value={name}
        />
      </div>
      <div className='form-group p-1'>
        <textarea
          onChange={handleChange("description")}
          name='description'
          className='form-control'
          placeholder='Description'
          value={description}
        />
      </div>
      <div className='form-group p-1'>
        <input
          onChange={handleChange("price")}
          type='number'
          className='form-control'
          placeholder='Price'
          value={price}
        />
      </div>
      <div className='form-group p-1'>
        <select
          onChange={handleChange("category")}
          className='form-control'
          placeholder='Category'
        >
          <option>Select Category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group p-1'>
        <input
          onChange={handleChange("stock")}
          type='number'
          className='form-control'
          placeholder='Quantity/Stock'
          value={stock}
        />
      </div>

      <button
        type='submit'
        onClick={onSubmit}
        className='btn btn-outline-success mb-3'
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      
    >{/* <!-- Start Banner Area --> */}
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1>Add Product</h1>
            <nav className="d-flex align-items-center">
              <a href="index.html">
                Home<span className="lnr lnr-arrow-right"></span>
              </a>
              <a href="single-product.html">Admin Dashboard<span className="lnr lnr-arrow-right"></span></a><a href="single-product.html">Add Products</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End Banner Area --> */}
 
      <Link to='/admin/dashboard' className='btn btn-md btn-success mb-3'>
        Admin Home
      </Link>
      <div className='row bg-light text-dark rounded mb-2' >
        <div className='col-md-8 offset-md-2 rounded' style={{border: "1px solid grey"}}>
          {errorMessage()}
          {succesMessage()}
          {getaRedirect()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
