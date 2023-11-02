import React, { useEffect, useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { useNavigate } from "react-router-dom";
// import { addItemToCart, removeItemfromCart } from "../user/helper/userapicalls";

import { isAuthenticated } from "../auth/helper";
import { addItemToCart } from "./helper/cartHelper";
import { removeItemfromCart } from "../user/helper/userapicalls";


const Card = ({ product, addtoCart = true, removeFromCart = false }) => {

  const {user} = isAuthenticated();
  const navigate = useNavigate();
  
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      
      localStorage.getItem("cart").slice(1,-1).split(",").map((el) => {

        if( el.slice(1,-1) == product._id){
          removeFromCart = true
          addtoCart = false
        }
      })
    
    }
  }

  const addToCart = () => {
    // addItemToCart(user._id,product._id, product.price)
    addItemToCart(product, () => navigate("/cart"));

  };

  const removefromCart = () => {
    removeItemfromCart(user._id,product._id)
    return navigate("/cart");

  }
 
  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <a href="" className="social-info"          
        >
										<span onClick={addToCart}  className="ti-bag"></span>
										<p className="hover-text">add to bag</p>
									</a>
       
      )
    );
    
  };
  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <a href="" className="social-info"                   
        >
										<span onClick={removefromCart} className="ti-bag"></span>
										<p  
 className="hover-text">add to bag</p>
									</a>
        
      )
    );
  };
  return (
						<div className="single-product">
           {console.log(product)}
           {product.photo && (
                        <img
                          width={"300px"}
                          height={"300px"}
                          src={`http://localhost:8000/image/${product.photo}`}
                        />
                      )}
							<div className="product-details">
								<h6>{product.name}</h6>
								<div className="price">
									<h6>&#x20B9;{product.price}</h6>
									<h6 className="l-through">$210.00</h6>
								</div>
								<div className="prd-bottom">
                 {showAddToCart(addtoCart)}
                {showRemoveFromCart(removeFromCart)}
									
									
									<a href="" className="social-info">
										<span className="lnr lnr-move"></span>
										<p className="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>

    // <div href="#" className="card card-product-grid align-items-center">
    //   <a href="#" className="img-wrap">
    //     <ImageHelper product={product}></ImageHelper>{" "}
    //   </a>
    //   <figcaption className="info-wrap">
    //     <b>
    //       <span href="#" className="title">
    //         {product.name}
    //       </span>
    //     </b>
    //     <b>
    //       <div className="price mt-1 "> &#x20B9;{product.price}</div>{" "}
    //     </b>
    //   </figcaption>
    //   {showAddToCart(addtoCart)}
    //   {showRemoveFromCart(removeFromCart)}
    // </div>
  );
};

export default Card;
{
  /*
         
    <div className='card text-white bg-dark border border-info '>
      <div className='card-header lead'>{cardTitle}</div>
      <div className='card-body'>
        <ImageHelper product={product}></ImageHelper>
        <p className='lead bg-success font-weight-normal text-wrap'>
          {cardDescription}
        </p>
        <p className='btn btn-success rounded  btn-sm px-4'>$ {cardPrice}</p>
        <div className='row'>
          <div className='col-12'>{showAddToCart()}</div>
          <div className='col-12'>{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>*/
}
