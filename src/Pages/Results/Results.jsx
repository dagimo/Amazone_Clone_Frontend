import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/endPoints'
import classes from './Results.module.css'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

function Results() {
  const [isLoading, setisLoading] = useState(true)
  const[Results, setResults]=useState([]);
  const {categoryName} = useParams()
  // console.log (categoryName)
  useEffect(()=>{
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
      // console.log(res)
      setResults(res.data);
      setisLoading(false)
    }).catch((err)=>{
      console.log(err)
      setisLoading(false)
    })

  }, [])

  return (
    <LayOut>
      <section>
        <h1 style={{padding:'30px'}}>Results</h1>
        <p style={{padding: '30px'}}>Category/{categoryName}</p>
        <hr />
        {isLoading?(<Loader/>): (<div className={classes.products_container }>
            {Results?.map((product) => (
              <ProductCard
              key={product.id}
              product = {product}/>
            ))}
        
          </div>)}



      </section>


    </LayOut>
    
  )
}

export default Results