import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const history = useHistory();
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
        history.push("/");
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
    console.log(formData);
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
              <option key='index' value={cate._id}>
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
      title='Add a Product here!'
      description='Welcome to product creation section'
      className='container  p-4'
    >
      <Link to='/admin/dashboard' className='btn btn-md btn-success mb-3'>
        Admin Home
      </Link>
      <div className='row bg-light text-dark rounded'>
        <div className='col-md-8 offset-md-2'>
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
