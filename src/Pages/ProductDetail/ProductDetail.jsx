import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
// import classes from './ProductDetail.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {productUrl} from '../../API/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'


function ProductDetail() {
  const [isLoading, setIsLoading] = useState(true)
  const {productId} = useParams()
  const [product,setproduct]=useState({})
  useEffect(()=>{
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setproduct(res.data);
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  }, [])


  return (
    <LayOut>
    {isLoading?(<Loader/>):(<ProductCard 
        product={product}
        flex={true}
        renderDesc ={true}
        />)}
    </LayOut>
    
  )
}

export default ProductDetail