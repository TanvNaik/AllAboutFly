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


	{/* <!-- Start Banner Area --> */}
	<section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1 className="banner-txt">All About Fly</h1>
            <nav className="d-flex align-items-center">
                <a href="" className="slogan"> 			  
				Your Dreams, Our Drones
				 </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End Banner Area --> */}
	
    {/* <!-- Start category Area --> */}
	<section class="category-area">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-8 col-md-12">
					<div class="row">
						<div class="col-lg-8 col-md-8">
							<div class="single-deal">
								<div class="overlay"></div>
								<img class="img-fluid w-100" src="../site-images/img0.jpg" alt=""/>
								<a href="img/category/c1.jpg" class="img-pop-up" target="_blank">
									<div class="deal-details">
										
									</div>
								</a>
							</div>
						</div>
						<div class="col-lg-4 col-md-4">
							<div class="single-deal">
								<div class="overlay"></div>
								<img class="img-fluid w-100" src="../site-images/img1.jpg" alt=""/>
								<a href="img/category/c2.jpg" class="img-pop-up" target="_blank">
									<div class="deal-details">
										<h6 class="deal-title">Sneaker for Sports</h6>
									</div>
								</a>
							</div>
						</div>
						<div class="col-lg-4 col-md-4">
							<div class="single-deal">
								<div class="overlay"></div>
								<img class="img-fluid w-100" src="../site-images/img5.jpg" alt=""/>
								<a href="img/category/c3.jpg" class="img-pop-up" target="_blank">
									<div class="deal-details">
										<h6 class="deal-title">Product for Couple</h6>
									</div>
								</a>
							</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<div class="single-deal">
								<div class="overlay"></div>
								<img class="img-fluid w-100" src="../site-images/img2.jpg" alt=""/>
								<a href="img/category/c4.jpg" class="img-pop-up" target="_blank">
									<div class="deal-details">
										<h6 class="deal-title">Sneaker for Sports</h6>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6">
					<div class="single-deal">
						<div class="overlay"></div>
            <img class="img-fluid w-100" src="../site-images/img3.jpg" alt=""/>
						<a href="img/category/c5.jpg" class="img-pop-up" target="_blank">
							<div class="deal-details">
								<h6 class="deal-title">Sneaker for Sports</h6>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* <!-- End category Area --> */}
  <ul class="instafeed d-flex flex-wrap">
							<li><img src="../images/img0.jpg" alt=""/></li>
							<li><img src="../images/img1.jpg" alt=""/></li>
							<li><img src="../images/img2.jpg" alt=""/></li>
							<li><img src="../images/img3.jpg" alt=""/></li>
							<li><img src="../images/img5.jpg" alt=""/></li>
							
						</ul>

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
					{products.length === 0 && (
						<span className=" m-3 text-center"><i>No products to show</i></span>
					)}
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
