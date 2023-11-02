import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import { getOrder } from './helper/adminapicall';

export default function UpdateOrder() {
    const [order, setOrder] = useState();
    const [error, setError] = useState(false);
    
    const preload = (orderId) => {
        getOrder(orderId).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setOrder(data.order);
          }
        });
      };
      useEffect(() => {
        preload(match.params.categoryId);
      }, []);
      
      const handleChange = (event) => {
        setError("");
        // setName(event.target.value);
      };

    const updateOrderForm = () => {
        return (
            <form>
        <div className='form-group'>
          <p className='lead'>Update the category : {name}</p>
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
            Update Order
          </button>
        </div>
      </form>
        )
    }

  return (
    <Base>
    {/* <!-- Start Banner Area --> */}
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1>Update Order</h1>
            <nav className="d-flex align-items-center">
              <a href="index.html">
                Home<span className="lnr lnr-arrow-right"></span>
              </a>
              <a href="single-product.html">Dashboard<span className="lnr lnr-arrow-right"></span> </a>
              <a href="single-product.html">Orders<span className="lnr lnr-arrow-right"></span> </a>
              <a href="single-product.html">Update Order</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End Banner Area --> */}

    {updateOrderForm()}
    </Base>
  )
}
