import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import StripeCheckoutButton from "react-stripe-checkout";
import PaymentButton from "./PaymentButton";
import { isAuthenticated } from "../auth/helper";
import { createOrder } from "./helper/orderapicalls";

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
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")).products);

  const [productIds, setProductids] = useState([])
  useEffect(()=>{
    

    let prods = products.map((prod) => 
    {
      return {
      _id : prod._id,
      stock: prod.stock,
      count: prod.count
    }
  })
    setProductids([...prods])

    localStorage.removeItem("orderDetails")



  }, [])
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
  const [details, setDetails] = useState()

  const {user, token} = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
    //add productCart id
    let details = {
      billingName: billingName,
      amount: amount,
      address: address,
      email:email,
      user: user._id,
      products: productIds,
      productCart: JSON.parse(localStorage.getItem("ProductCartId")),
      contact_no: contact_no
    };
    setDetails(details)
    // localStorage.setItem("orderDetails", JSON.stringify(details));
    if(
      billingName &&
      address &&
      email &&
      contact_no 
      ){
        document.getElementById("toggle").style.display = "block"; 
      }
  };

  const createOrderCOD = () => {
    createOrder(user._id, {order: details}, token).then(data => {
      if(data.error){
        return alert(data.error)
      }
      return alert("Order placed successfully!")
    })
  }
  
  const checkout = () => {
    return (
      // <!--================Checkout Area =================-->

      <section className="checkout_area section_gap">

        <div className="container ">
          <div className="billing_details ">
            <div className="row ">
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
              <div className="col-lg-6 ">
                <div className="order_box ">
                  <h2>Your Order</h2>
                  <table className="table table-secondary ">
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
                            <td>{prod.name} </td>
                            <td>{prod.count}</td>
                            <td>${prod.price * prod.count}</td>
                          </tr>
                        );
                      })}
                      <tr className="text-center">
                        <td>Total </td>
                        <td></td>
                        <td>${amount}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div id="toggle" style={{display: "none"}}>
                  <div>
                    Only COD available
            <button className="primary-btn rounded"onClick={createOrderCOD}>PLace Order</button>
        </div>
        {/* TODO: Payment */}
                  {/* <PaymentButton/> */}

                  </div>
                  
                  
                  
                  
                    
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
