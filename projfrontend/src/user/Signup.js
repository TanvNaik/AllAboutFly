import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    cfpassword: "",
    contact_no: "",
    error: "",
    success: false
  });
  const { name, email, password, cfpassword, contact_no, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    if( name == "" || email == "" || contact_no == "" || password == ""){
      return setValues({...values, error: "Please fill all the details"})

    }

    if(password !== cfpassword){
      return setValues({...values, error: "Password and Confirm Password should match"})
    }
    signup({ name, email, contact_no, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error.msg, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            cfpassword: "",
            contact_no: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };
  const signUpForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Name:</label>
              <input
                className='form-control'
                onChange={handleChange("name")}
                type='text'
                value={name}
              />
            </div><br/>
            <div className='form-group'>
              <label className='text-light'>Email:</label>
              <input
                className='form-control'
                onChange={handleChange("email")}
                type='email'
                value={email}
              />
            </div><br/>
            <div className='form-group'>
              <label className='text-light'>Contact Number:</label>
              <input
                className='form-control'
                onChange={handleChange("contact_no")}
                type='number'
                value={contact_no}
              />
            </div><br/>
            <div className='form-group'>
              <label className='text-light'>Password:</label>
              <input
                className='form-control'
                onChange={handleChange("password")}
                type='password'
                value={password}
              />
            </div>
            <br />
            <div className='form-group'>
              <label className='text-light'>Confirm Password:</label>
              <input
                className='form-control'
                onChange={handleChange("cfpassword")}
                type='password'
                value={cfpassword}
              />
            </div>
            <br />
            <button onClick={onSubmit} className='btn btn-success w-100'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to='/signin'>Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base title='' description='Register yourself to start shopping!'>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
