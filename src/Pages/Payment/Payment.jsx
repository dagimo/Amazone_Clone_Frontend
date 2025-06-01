import React, { useContext, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from './Payment.module.css'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyForamt from '../../Components/CurrencyFormat/CurrencyFormat'

function Payment() {
  const [{user,basket}] = useContext(DataContext);
  
  const totalItem = basket?.reduce ((amount, item)=>{
    return item.amount + amount;
},0);

const total = basket.reduce((amount, item)=>{
  return item.price * item.amount + amount
},0)


  const [cardError, setCardError] = useState(null)
  const stripe = useStripe();
  const element = useElements();

  const handleChange = (e)=>{
    e?.error?.message? setCardError (e?.error?.message): setCardError()
  }

  return (
    <LayOut>
      {/*header*/}
        <div className={classes.payment_header}>
            Checkout({totalItem})items
        </div>
        {/*Payment method*/}
        <section className={classes.Payment}>
          {/*address*/}

          <div className={classes.flex}>
            <h3>Delivery Address</h3>
              <div>
                <div>{user?.email}</div>
                <div>123 Addis</div>
                <div>A.A</div>
              </div>
            
          </div>
          <hr />
          {/*product*/}
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div>
              {
                basket?.map((item)=><ProductCard product={item} flex={true}/>)
              }
            </div>
          </div>
          <hr />
          {/*card form*/}
          <div className={classes.flex}>
            <h3>Payment Methods</h3>
            <div className={classes.payment_card_container}>
              <div className={classes.Payment_details}>
                <form action="">
                  {cardError && <small style={{color:"red"}}>{cardError}</small>}
                  <CardElement onChange={handleChange}/>
                  {/*price*/}
                  <div className={classes.payment_price}>
                    <div>
                      <span style={{display:"flex", gap:"10px"}}>
                        Total Order | <CurrencyForamt amount={total}></CurrencyForamt>
                      </span>
                    </div>
                    <button>
                      Pay Now
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </section>

    </LayOut>
    
  )
}

export default Payment