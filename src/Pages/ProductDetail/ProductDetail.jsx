import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
// import classes from './ProductDetail.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {productUrl} from '../../API/endPoints'
import ProductCard from '../../Components/Product/ProductCard'


function ProductDetail() {
  const {productId} = useParams()
  const [product,setproduct]=useState({})
  useEffect(()=>{
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setproduct(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])


  return (
    <LayOut>
        <ProductCard 
        product={product}
        />


    </LayOut>
    
  )
}

export default ProductDetail