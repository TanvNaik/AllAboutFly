import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./card";
import { getAllProducts } from "./helper/coreapicalls";
import {
  getAllCategories} from "../admin/helper/adminapicall";

const Home = () => {
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const changeSection = (name) => (event) => {
    event.preventDefault();
    Array.from(document.getElementsByClassName("category")).map((el, i) =>
      el.classList.toggle("active")
    );
    event.target.classList.toggle("active");
    let prods = []
      allProducts.map((prod) => {
        if (prod.category._id === event.target.id) {
          prods.push(prod)
        }
      })
      setProducts(prods)
  };

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        return setError(data.error);
      } else {
        setCategories(data);
      }
    });
    getAllProducts().then((data) => {
      if (data.error) {
        return setError(data.error);
      } else {
        setAllProducts(data);
        setProducts(data)
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);
  return (
    <Base title="" description="">

	{/* <!-- start banner Area --> */}
	<section className="banner-area">
		<div className="container">
			<div className="row fullscreen align-items-center justify-content-start">
				<div className="col-lg-12">
					<div className="active-banner-slider owl-carousel">
						{/* <!-- single-slide --> */}
						<div className="row single-slide align-items-center d-flex">
							<div className="col-lg-5 col-md-6">
								<div className="banner-content">
									<h1>Nike New <br/>Collection!</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
										dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
									<div className="add-bag d-flex align-items-center">
										<a className="add-btn" href=""><span className="lnr lnr-cross"></span></a>
										<span className="add-text text-uppercase">Add to Bag</span>
									</div>
								</div>
							</div>
							<div className="col-lg-7">
								<div className="banner-img">
									<img className="img-fluid" src="img/banner/banner-img.png" alt=""/>
								</div>
							</div>
						</div>
						{/* <!-- single-slide --> */}
						<div className="row single-slide">
							<div className="col-lg-5">
								<div className="banner-content">
									<h1>Nike New <br/>Collection!</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
										dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
									<div className="add-bag d-flex align-items-center">
										<a className="add-btn" href=""><span className="lnr lnr-cross"></span></a>
										<span className="add-text text-uppercase">Add to Bag</span>
									</div>
								</div>
							</div>
							<div className="col-lg-7">
								<div className="banner-img">
									<img className="img-fluid" src="img/banner/banner-img.png" alt=""/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* <!-- End banner Area --> */}

	
	
	{/* <!-- end features Area --> */}


	{/* <!-- start product Area --> */}
	<section className=" ">
		{/* <!-- single product slide --> */}
		<div className="single-product-slider">
			 <div className="container text-dark">
				<div className="row justify-content-center">
					<div className="col-lg-6 text-center">
					<ul className="nav nav-tabs justify-content-center " >
            {categories &&
              categories.map((category, index) => {
                return (
                  <li
                    onClick={changeSection()}
                    className="category nav-item m-2 "
                    key={index}
                    role="presentation"
                    id={category._id}
                  >
                    <button className=" nav-link " id={category._id}>
                      {category.name}
                    </button>
                  </li>
                );
              })}
          </ul>
					</div>
				</div>
				<div className="row">
					{console.log(products)}
					{/* <!-- single product --> */}
					{products.length !== 0 &&
              products.map((product, index) => {
                return (
					<div key={index} className="col-lg-3 col-md-6">
						
                    <Card product={product}></Card>
                  </div>
                );
              })}
            
			
				</div>
			</div>
		</div>
		
		
	</section>
	{/* <!-- end product Area --> */}

	
	
	
    </Base>
  );
};
export default Home;
