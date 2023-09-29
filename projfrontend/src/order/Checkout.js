import React, { useState } from "react";
import Base from "../core/Base";
import StripeCheckoutButton from "react-stripe-checkout";

export default function Checkout() {
  const [values, setValues] = useState({
    billingName: "",
    email: "",
    address: "",
    contact_no: "",
    zip: "",
    error: "",
    amount: JSON.parse(localStorage.getItem("price")),
    success: false,
  });
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")).products
  );
  const {
    billingName,
    email,
    address,
    contact_no,
    zip,
    amount,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //   const showStripeButton = () => {
  //     return (
  //         <StripeCheckoutButton
  //             stripeKey= {process.env.REACT_APP_STRIPE_KEY}
  //             token={makePayment}
  //             amount= {fare * 100}
  //             name='Pay for Ride'
  //         >
  //             <button className='btn-submit'>Pay with stripe</button>
  //         </StripeCheckoutButton>)

  // }
  const checkout = () => {
    return (
      // <!--================Checkout Area =================-->
      <section className="checkout_area section_gap">
        <div className="container">
          <div className="billing_details">
            <div className="row">
              <div className="col-lg-6">
                <h3>Billing Details</h3>
                <form
                  className="row contact_form"
                  action="#"
                  method="post"
                  novalidate="novalidate"
                >
                  <div className="col-md-6 form-group p_star">
                    <input
                      className="form-control"
                      onChange={handleChange("billingName")}
                      type="text"
                      placeholder="Billing Name"
                      value={billingName}
                      required={true}
                    />
                  </div>
                  <div className="col-md-6 form-group p_star">
                    <input
                      className="form-control"
                      onChange={handleChange("contact_no")}
                      type="number"
                      placeholder="Contact Number"
                      value={contact_no}
                      required={true}
                      maxLength={10}
                      minLength={10}
                    />
                  </div>
                  <div className="col-md-6 form-group p_star">
                    <input
                      className="form-control"
                      onChange={handleChange("email")}
                      type="email"
                      placeholder="Billing Email"
                      value={email}
                      required={true}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <textarea
                      className="form-control"
                      onChange={handleChange("address")}
                      placeholder="Enter full address"
                      value={address}
                      required={true}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      className="form-control"
                      onChange={handleChange("zip")}
                      type="number"
                      placeholder="Postcode/ZIP"
                      value={zip}
                      required={true}
                    />
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <div className="order_box">
                  <h2>Your Order</h2>
                  <table class="table table-dark ">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((prod, key) => {
                        return (
                          <tr key={key}>
                            <td>{prod.productId.name} </td>
                            <td>{prod.count}</td>
                            <td>${prod.productId.price * prod.count}</td>
                          </tr>
                        );
                      })}
                      <tr className="text-center">
                        <td>Total </td>
                        <td>${amount}</td>
                      </tr>
                    </tbody>
                  </table>

                  
                  
                  
                  <div className="creat_account">
                    <input type="checkbox" id="f-option4" name="selector" />
                    <label for="f-option4">I’ve read and accept the </label>
                    <a href="#">terms & conditions*</a>
                  </div>
                  <a className="primary-btn" href="#">
                    Proceed to Paypal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      //  <!--================End Checkout Area =================-->
    );
  };
  return (
    <Base>
      {/* <!-- Start Banner Area --> */}
      <section className="banner-area organic-breadcrumb">
        <div className="container">
          <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
            <div className="col-first">
              <h1>Checkout</h1>
              <nav className="d-flex align-items-center">
                <a href="index.html">
                  Home<span className="lnr lnr-arrow-right"></span>
                </a>
                <a href="single-product.html">Checkout</a>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Banner Area --> */}

      {checkout()}
    </Base>
  );
}
