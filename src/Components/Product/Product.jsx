import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css'

function Product() {
  // Initialize products with an empty array
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section className={classes.products_container}>
      {/* If products is empty, the map function simply won't render anything */}
      {products.map((singleProduct) => (
        <ProductCard product={singleProduct} key={singleProduct.id} />
      ))}
    </section>
  );
}

export default Product;