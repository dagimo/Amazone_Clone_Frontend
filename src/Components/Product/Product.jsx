import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css'
import Loader from '../Loader/Loader';

function Product() {
  // Initialize products with an empty array
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setisLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false)
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
    {
      isLoading? (<Loader/>):(    <section className={classes.products_container}>
        {/* If products is empty, the map function simply won't render anything */}
        {products.map((singleProduct) => (
          
          <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
        ))}
      </section>)
    }
    
    </>

  );
}

export default Product;