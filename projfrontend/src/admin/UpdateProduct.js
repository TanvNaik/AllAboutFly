import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Base from "../core/Base";
import {
  getProduct,
  updateProduct,
  getAllCategories
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
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
    updatedProduct: "",
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
    updatedProduct,
    getRedirect,
    formData
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData()
        });
      }
    });
  };

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
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
            updatedProduct: data.name,
            getRedirect: true
          });
        }
      }
    );
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
        style={{ display: updatedProduct ? "" : "none" }}
      >
        <h4> {updatedProduct} updated succesfully!</h4>
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

  const updateProductForm = () => (
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
          <option>Select</option>
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
          placeholder='Quantity'
          value={stock}
        />
      </div>

      <button
        type='submit'
        onClick={onSubmit}
        className='btn btn-outline-success mb-3'
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title='Update a Product here!'
      description='Welcome to product updation section'
      className='container bg-info p-4'
    >
      <Link to='/admin/dashboard' className='btn btn-md btn-dark mb-3'>
        Admin Home
      </Link>
      <div className='row bg-dark text-white rounded'>
        <div className='col-md-8 offset-md-2'>
          {errorMessage()}
          {succesMessage()}
          {getaRedirect()}
          {updateProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
