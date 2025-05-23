import React from 'react'
import Rating from '@mui/material/Rating'
import CurrencyForamt from '../CurrencyFormat/CurrencyFormat'
import classes from './Product.module.css'

function productCard({product}) {
    const {image, title, id , rating, price} = product;
  return (
    <div className={`${classes.card_container}`}>
        <a href="">
            <img src={image} alt="" />
        </a>
        <div>
            <h3>{title}</h3>
        <div className={classes.rating}>
            {/*rating*/}
            <Rating values={rating.rate} precision={0.1}/>
            {/*count*/}
            <small>{rating.count}</small>
        </div>
        <div>
            {/*price */}
            <CurrencyForamt amount={price}/>
        </div>
        <button className={classes.button}>add to cart </button>

        </div>

    </div>
  )
}

export default productCard