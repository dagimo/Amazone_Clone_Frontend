import React from 'react'
import Carousel from '../../Components/Carousel/Carousel'
import Product from '../../Components/Product/Product'
import LayOut from '../../Components/LayOut/LayOut'
import CategoryInfo from '../../Components/Category/CategoryInfo'

function Landing() {
  return (
    <LayOut>

        <Carousel/>

        <CategoryInfo/>

        <Product/>

    </LayOut>
  );
}

export default Landing;
