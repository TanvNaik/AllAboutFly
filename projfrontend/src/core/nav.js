import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper/index";
//TODO: change image srcs
import logo from "./logo.svg"
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#1FAA59" };
  } else {
    return { color: "#ffffff" };
  }
};
const Nav = ({ history }) => (
  <div className="d-flex justify-content-between nav nav-tabs">
    <div className=" w-50 text-white d-flex align-items-center">
    <Link
            
            to='/'
          >
           <img src={logo} alt=""  width={70} className="p-2" />
          </Link>
     <span className="heading">All About Fly</span> 
    </div>
    <div className="w-50 d-flex justify-content-end align-items-center">
    <ul className='nav nav-tabs bg-dark  ' style={{border:"none"}}>
      <li className='nav-item'>
        <Link style={currentTab(history, "/")} className='nav-link ' to='/'>
          Home
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (<li className='nav-item'>
        <Link
          style={currentTab(history, "/cart")}
          className='nav-link '
          to='/cart'
        >
          Cart
        </Link>
      </li>)}
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className='nav-item'>
          <Link
            style={currentTab(history, "/user/dashboard")}
            className='nav-link '
            to='/user/dashboard'
          >
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className='nav-item'>
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className='nav-link '
            to='/admin/dashboard'
          >
            Admin Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <li className='nav-item'>
            <Link
              style={currentTab(history, "/signup")}
              className='nav-link '
              to='/signup'
            >
              Signup
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              style={currentTab(history, "/signin")}
              className='nav-link '
              to='/signin'
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className='nav-item'>
          <span
            className='nav-link text-warning'
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
    </div>
    
  </div>
);
export default withRouter(Nav);
