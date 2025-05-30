import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyForamt from '../CurrencyFormat/CurrencyFormat'
import classes from './Product.module.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'

function ProductCard({product, flex, renderDesc, renderAdd}) {
    const {image, title, id , rating, price,description} = product;
    const [state,dispatch] = useContext(DataContext)
    
    const addToCart = ()=>{
        dispatch({
            type:Type.ADD_TO_BASKET,
            item:{
                image, title, id, rating, price, description
            }
        })
    }

    return (
    <div className={`${classes.card_container}  ${flex ? classes.product_flexed : ''}`}>
        <Link to={`/products/${id}`} >
            <img src={image} alt="" />
        </Link>
        <div>
            <h3>{title}</h3>
            {renderDesc && <div style={{maxWidth:'700px'}}>{description}</div>}
        <div className={classes.rating}>
        {rating && (
                    <div className={classes.rating}>
                        {/* Use 'value' prop for MUI Rating.
                        'rating.rate || 0' ensures that if 'rating.rate' is undefined/null, it defaults to 0.
                        'readOnly' makes the stars non-interactive.
                        */}
                        <Rating value={rating.rate || 0} precision={0.1} readOnly />

                        {/* 'rating.count || 0' ensures that if 'rating.count' is undefined/null, it defaults to 0.
                        */}
                        <small>{rating.count || 0}</small>
                    </div>
                )}
        </div>
        <div>
            {/*price */}
            <CurrencyForamt amount={price}/>
        </div>
        {renderAdd &&  <button className={classes.button} onClick={addToCart}>
            add to cart 
        </button> }


        </div>

    </div>
    )
}

export default ProductCard