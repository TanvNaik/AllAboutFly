import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper/index";
const currentTab = (pathname, path) => {
  if (pathname === path) {
    return { color: "#507C9" };
  } else {
    return { color: "#222222" };
  }
};
const Nav = (props) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light main_box ">
      <div className="container">
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
        <Link className="navbar-brand logo_h" to={"/"} >
          <img src="./favicon-32x32.png" alt="" />
          <img width="50%" src="../images/webname.svg" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
        <div
          className="collapse navbar-collapse offset"
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav menu_nav ml-auto p-2">
            <li className="nav-item ">
              <Link
                style={currentTab(window.location.pathname, "/")}
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item  ">
                <Link
                  style={currentTab(window.location.pathname, "/cart")}
                  className="nav-link "
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item  ">
                <Link
                  style={currentTab(
                    window.location.pathname,
                    "/user/dashboard"
                  )}
                  className="nav-link "
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  style={currentTab(
                    window.location.pathname,
                    "/admin/dashboard"
                  )}
                  className="nav-link "
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={currentTab(window.location.pathname, "/signup")}
                    className="nav-link "
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={currentTab(window.location.pathname, "/signin")}
                    className="nav-link "
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  className="nav-link text-warning"
                  onClick={() => {
                    signout(() => {
                      navigate("/");
                    });
                  }}
                >
                  Signout
                </span>
              </li>
            )}
            <li className="nav-item">
            <Link
                  style={currentTab(window.location.pathname, "/cart")}
                  className="nav-link "
                  to="/contact-us"
                >
                  Contact Us
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;

//   <div className="d-flex justify-content-between nav nav-tabs">
//     <div className=" w-50 text-white d-flex align-items-center">
//     <Link

//             to='/'
//           >
//            <img src={logo} alt=""  width={70} className="p-2" />
//           </Link>
//      <span className="heading">All About Fly</span>
//     </div>
//     <div className="w-50 d-flex justify-content-end align-items-center">
//     <ul className='nav nav-tabs bg-dark  ' style={{border:"none"}}>
//       <li className='nav-item'>
//         <Link style={currentTab(history, "/")} className='nav-link ' to='/'>
//           Home
//         </Link>
//       </li>
//       {isAuthenticated() && isAuthenticated().user.role === 0 && (<li className='nav-item'>
//         <Link
//           style={currentTab(history, "/cart")}
//           className='nav-link '
//           to='/cart'
//         >
//           Cart
//         </Link>
//       </li>)}
//       {isAuthenticated() && isAuthenticated().user.role === 0 && (
//         <li className='nav-item'>
//           <Link
//             style={currentTab(history, "/user/dashboard")}
//             className='nav-link '
//             to='/user/dashboard'
//           >
//             Dashboard
//           </Link>
//         </li>
//       )}
//       {isAuthenticated() && isAuthenticated().user.role === 1 && (
//         <li className='nav-item'>
//           <Link
//             style={currentTab(history, "/admin/dashboard")}
//             className='nav-link '
//             to='/admin/dashboard'
//           >
//             Admin Dashboard
//           </Link>
//         </li>
//       )}
//       {!isAuthenticated() && (
//         <Fragment>
//           <li className='nav-item'>
//             <Link
//               style={currentTab(history, "/signup")}
//               className='nav-link '
//               to='/signup'
//             >
//               Signup
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link
//               style={currentTab(history, "/signin")}
//               className='nav-link '
//               to='/signin'
//             >
//               Sign In
//             </Link>
//           </li>
//         </Fragment>
//       )}
//       {isAuthenticated() && (
//         <li className='nav-item'>
//           <span
//             className='nav-link text-warning'
//             onClick={() => {
//               signout(() => {
//                 history.push("/");
//               });
//             }}
//           >
//             Signout
//           </span>
//         </li>
//       )}
//     </ul>
//     </div>

//   </div>
// );
