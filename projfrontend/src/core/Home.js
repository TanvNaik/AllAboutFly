import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./card";
import { getAllProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <Base title='' description=''>
      <div className='row text-center'>
        <h1 className='text-white'>Welcome to the Drone store</h1>
        <div className='row'>
          {products.map((product, index) => {
            return (
              <div key={index} className='col-3 mb-4'>
                <Card product={product}></Card>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};
export default Home;
