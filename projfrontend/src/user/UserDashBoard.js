import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getUser, getUserOrders } from "./helper/userapicalls";

const UserDashBoard = () => {
  const { user, token } = isAuthenticated();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    contact_no: "",
  });
  const [error, setError] = useState("");
  const [orders, setUserOrders] = useState([]);
  useEffect(() => {
    getUser(user._id, token).then((data) => {
      if (data.error) {
        setError("Unable to retrieve account details. Please try later");
      } else {
        return setUserDetails(data.user);
      }
    });
    getUserOrders(user._id).then((data) => {
      if (data.error) {
        setError("Unable to retrieve orders. Please try later");
      } else {
        return setUserOrders(data.orders);
      }
    });
  }, []);
  const dashBoard = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="row blog_right_sidebar">
            <div className="col-4">
              <aside className="single_sidebar_widget author_widget justify-content-center">
                <img
                  className="author_img rounded-circle"
                  src="../images/undraw_pic_profile_re_7g2h.svg"
                  alt=""
                  width={"50%"}
                />

                <div className="br"></div>
              </aside>
            </div>
            <div className="col-8">
              <aside className="single_sidebar_widget author_widget text-start">
                <h4>{userDetails.name}</h4>
                <p>
                  <span
                    className="badge bg-success 
               mr-2 "
                  >
                    Email:
                  </span>{" "}
                  {userDetails.email}
                </p>
                <p>
                  <span
                    className="badge bg-success 
               mr-2 "
                  >
                    Contact No:
                  </span>
                  {userDetails.contact_no}
                </p>
              </aside>
            </div>

            <aside className="single_sidebar_widget ads_widget">
              <a href="#">
                <img className="img-fluid" src="img/blog/add.jpg" alt="" />
              </a>
              <div className="br"></div>
            </aside>
            <aside className="single_sidebar_widget post_category_widget">
              <h4 className="widget_title">Orders</h4>
              <ul className="list cat-list">
                <span
                  className="d-flex justify-content-between "
                  style={{ fontWeight: "800" }}
                >
                  <p>Products</p>
                  <p>Order Status</p>
                  <p>Order Total</p>
                </span>
              </ul>
              {orders.length == 0 && (
                <p className="text-center">You don't have any orders yet</p>
              )}

              <ul className="list cat-list">
                {orders &&
                  orders.map((order, key) => {
                    return (
                      <li key={key}>
                        <span className="d-flex justify-content-between">
                          <ul>
                            {console.log(order)}
                            {order.productCart.products.map((prod, key) => {
                              return (
                                <li>
                                  {prod.productId.name} x {prod.count}
                                </li>
                              );
                            })}
                          </ul>

                          <p>{order.status}</p>
                          <p>{order.amount}</p>
                        </span>
                      </li>
                    );
                  })}
                <li style={{ borderBottom: "2px solid grey" }}>
                  <span href="#" className="d-flex justify-content-between">
                    <ul>
                      <li>prod1 x 1</li>
                      <li>prod2 x 2</li>
                    </ul>

                    <p>Confirmed</p>
                    <p>48000</p>
                  </span>
                </li>
                <li style={{ borderBottom: "2px solid grey" }}>
                  <span href="#" className="d-flex justify-content-between">
                    <ul>
                      <li>prod1 x 1</li>
                      <li>prod2 x 2</li>
                    </ul>

                    <p>Delivered</p>
                    <p>48000</p>
                  </span>
                </li>
              </ul>
              <div className="br"></div>
            </aside>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base title="User Dash Board">
      {/* <!-- Start Banner Area --> */}
      <section className="banner-area organic-breadcrumb">
        <div className="container">
          <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
            <div className="col-first">
              <h1>Dashboard</h1>
              <nav className="d-flex align-items-center">
                <a href="index.html">
                  Home<span className="lnr lnr-arrow-right"></span>
                </a>
                <a href="single-product.html">Dashboard</a>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Banner Area --> */}
      {dashBoard()}
    </Base>
  );
};

export default UserDashBoard;
