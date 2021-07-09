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
          <p className='lead'>Update the category</p>
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
      title='Create a Category'
      description='Add a new category for new t-shirts'
      className='container bg-info p-4'
    >
      <div className='row bg-white rounded'>
        <div className='col-md-8 offset-md-2'>
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
