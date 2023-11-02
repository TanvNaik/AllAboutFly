import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { getAllOrders, updateOrderStatus } from './helper/adminapicall'
import { Link } from 'react-router-dom'

export default function Orders() {

  const {user, token} = isAuthenticated()
  const [orders, setOrders] = useState([])
  const [error, setError] = useState("")
  

  const preload = () => {
    getAllOrders().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const updateStatus = (orderId, status) => {
    updateOrderStatus(orderId, user._id, token, status).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        preload();
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  return (
    <Base>
    {/* <!-- Start Banner Area --> */}
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1>Orders</h1>
            <nav className="d-flex align-items-center">
              <a href="index.html">
                Home<span className="lnr lnr-arrow-right"></span>
              </a>
              <a href="single-product.html">Dashboard<span className="lnr lnr-arrow-right"></span> </a>
              <a href="single-product.html">Orders</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End Banner Area --> */}
    
    <section className='p-3'>
    <aside className="single_sidebar_widget post_category_widget">
              <ul className="list cat-list">
                <span
                  className="d-flex justify-content-between "
                  style={{ fontWeight: "800" }}
                >
                  <p>Billing Name</p>

                  <p>Products</p>
                  <p>Order Status</p>
                  <p>Order Total</p>
                  <p></p>
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
                        <p>{order.user.name}</p>

                          <ul>
                            
                            {order.productCart.products.map((prod, key) => {
                              return (
                                <li>
                                  {prod.productId.name} x {prod.count}
                                </li>
                              );
                            })}
                          </ul>

                          <p>{order.status}</p>
                          <p>
                            
                            
                          </p>
                          <p>{order.amount}</p>
                          <p><Link
                
                className="nav-link btn-success m-1 p-2"
                to="/update-order"
              >
                Update
              </Link></p>
                        </span>
                      </li>
                    );
                  })}
                <li style={{ borderBottom: "2px solid grey" }}>
                  <span href="#" className="d-flex justify-content-between">
                    <p>Tanvi</p>
                    <ul>
                      <li>prod1 x 1</li>
                      <li>prod2 x 2</li>

\                    </ul>

                    <p>
                    
								
                <select class="custom-select custom-select-md mb-3 secondary" >
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
                
                </p>
                    <p>48000</p>
                    <p>
                    <Link
                
                className="nav-link btn-success m-1 p-2"
                to="/update-order"
              >
                Update
              </Link>
                    </p>
                  </span>
                </li>
                <li style={{ borderBottom: "2px solid grey" }}>
                  <span href="#" className="d-flex justify-content-between">
                    <ul>
                      <li>prod1 x 1</li>
                      <li>prod2 x 2</li>
                    </ul>

                    <p>Delivered</p><p>
                    <select class="custom-select custom-select-md mb-3 secondary" >
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
                    </p>
                    <p>48000</p>
               
                    <p>
                    <Link
                
                className="nav-link btn-success m-1 p-2"
                to="/update-order"
              >
                Update
              </Link>
                    </p>
                  </span>
                </li>
              </ul>
              <div className="br"></div>
            </aside>
    </section>
    </Base>
  )
}
