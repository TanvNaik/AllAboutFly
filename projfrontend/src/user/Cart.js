import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { cartUpdate, getUserCart } from "./helper/userapicalls";
import { Link,  useNavigate } from "react-router-dom";
import { loadCart } from "../core/helper/cartHelper";

const Cart = () => {
  const { user } = isAuthenticated();
  const [products, setProducts] = useState();
const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  // Load Cart Products
  const preload = () => {
  const prods = loadCart()

  let sum = 0;
  prods.map((prod) => {
    sum += (prod.count * prod.price);
  }) 
  setPrice(sum)
    // setPrice(prods.map((res, prod) =>  {
    //   console.log(res.price)
    //   return res.price + (prod.count * prod.price)}))
    setProducts(prods);
  

 
    

    // getUserCart(user._id).then((data) => {
    //   if (data.error) {
    //     return setError(data.error);
    //   }
    //   setProducts(data.cart);
    //   setPrice(data.price);
    //   setCartId(data._id)
    // });
  };
  // Remove product from cart
  // Proceed to Place Order

  useEffect(() => {
    preload();  
    
   

  }, []);

  const handleChange = (id) => (event) => {
    console.log(event.target.value);
    let newproducts = [];

    products.map((prod) => {
      if (prod._id == id && event.target.value !== 0) {
        prod.count = event.target.value;
      }
      newproducts.push(prod);
    });
    setProducts(newproducts);
  };

  const updateCart = () => {
    let newCart = [];
    let price = 0;
    console.log(products);
    products.map((prod) => {
      newCart.push({
        count: prod.count,
        productId:prod.productId._id,
        _id: prod._id
      })
      price += prod.productId.price * prod.count;
    });
    console.log(products);

    // setPrice(price); 
    // cartUpdate(cartId, {newProducts: newCart}, price )
    // .then(data => {
    //   if (data.error){
    //     return setError(data.error)
    //   }
    //   alert("Successfully Updated the cart");

    //   preload()
    // })


  };
  
  const cartArea = () => {
    return (
      <section className="cart_area">
    
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
      
              {products && products.length == 0 && (
                <div className=" d-flex h-75 align-items-center " style={{minHeight: "50vh"}}>
<h4 className="text-center w-100 bg-warning text-danger p-2 rounded mt-3">
                  There are no products in your cart! Start Shopping
                </h4>
                </div>
                
              )}
              {products && products.length > 0 && (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="w-25">Product</th>
                        <th className="w-25">Price</th>
                        <th className="w-25 text-center">Quantity</th>
                        <th className="w-25">Total</th>
                      </tr>
                    </thead>
                    <tbody>

                      {products && products.length > 0 &&
                        products.map((prod, key) => {
                          return (
                            <tr key={key}>
                              <td>
                                <div className="media">
                                  <div className="d-flex">
                                    <img src="img/cart.jpg" alt="" />
                                  </div>
                                  <div className="media-body">
                                    <p>{prod.name}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <h5>&#x20B9;{prod.price}</h5>
                              </td>
                              <td className=" d-flex justify-content-center ">
                                <div className="product_count w-25">
                                  <input
                                    type="number"
                                    name="qty"
                                    id={prod._id}
                                    max={prod.stock}
                                    value={prod.count}
                                    onChange={handleChange(prod._id)}
                                    className=" form-control text-center "
                                  />
                                </div>
                              </td>
                              <td>
                                <h5>
                                  &#x20B9;{prod.price * prod.count}
                                </h5>
                              </td>
                            </tr>
                          );
                        })}
                      <tr className="bottom_button">
                        <td>
                          <a
                            className="btn btn-info"
                            href="#"
                            onClick={updateCart}
                          >
                            Update Cart
                          </a>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <h5>Subtotal</h5>
                        </td>
                        <td>
                          <h5>&#x20B9;{price}</h5>
                        </td>
                      </tr>
                      {/* <tr className="shipping_area">
                    <td></td>
                    <td></td>
                    <td>
                      <h5>Shipping</h5>
                    </td>
                    <td>
                      <div className="shipping_box">
                        
                        <h6>
                          Calculate Shipping{" "}
                          <i
                            className="fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </h6>
                        <select className="shipping_select form-select">
                          <option value="1">India</option>
                          <option value="2">India</option>
                          <option value="4">Pakistan</option>
                        </select>
                        <select className="shipping_select form-select">
                          <option value="1">Select a State</option>
                          <option value="2">Select a State</option>
                          <option value="4">Select a State</option>
                        </select>
                        <input type="text" placeholder="Postcode/Zipcode" className="form-control" />
                        <a className="gray_btn" href="#">
                          Update Details
                        </a>
                      </div>
                    </td>
                  </tr> */}
                    </tbody>
                  </table>

                  <div className="w-100 text-end">
                    <div className="checkout_btn_inner d-flex align-items-center">
                      <Link to="/">
                        {" "}
                        <a className="gray_btn btn btn-info m-2" href="#">
                          Continue Shopping
                        </a>{" "}
                      </Link>

                      <button className="primary-btn btn btn-success" onClick={() => {
                        localStorage.setItem("products", JSON.stringify({products}));
                        localStorage.setItem("price", price)
                        return navigate("/checkout");
                      }}>
Proceed to checkout
                      </button>
                      
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <Base>
    {/* <!-- Start Banner Area --> */}
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1>Shopping Cart</h1>
            <nav className="d-flex align-items-center">
              <a href="index.html">
                Home<span className="lnr lnr-arrow-right"></span>
              </a>
              <a href="single-product.html">Cart</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End Banner Area --> */}
    {products && products.length > 0 && cartArea() }
    {!products && (
      <div className=" d-flex h-75 align-items-center " style={{minHeight: "50vh"}}>
      <h4 className="text-center w-100 bg-warning text-danger p-2 rounded mt-3">
                        There are no products in your cart! Start Shopping
                      </h4>
                      </div>
    )}
      
    </Base>
  );
};
export default Cart;
