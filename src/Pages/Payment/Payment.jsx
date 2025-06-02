import React, { useContext, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from './Payment.module.css'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../API/axios'
import { CircleLoader } from 'react-spinners'
import {db} from "../../Utility/firebase.jsx"
import { collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type.jsx'
// console.log("db object:", db); // Can remove these console.logs now
// console.log("Is db.collection a function?", typeof db.collection);

function Payment() {
  const [{user,basket},dispatch] = useContext(DataContext);
  console.log(user); // Keep this for user debugging

  const totalItem = basket?.reduce ((amount, item)=>{
    return item.amount + amount;
  },0);

  const total = basket.reduce((amount, item)=>{
    return item.price * item.amount + amount
  },0)

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    e?.error?.message? setCardError (e?.error?.message): setCardError()
  }

  const handlePayment =async(e)=> {
    e.preventDefault();
    try {
      setProcessing(true)

      // 1. Backend || functions ---> contact to get the client secret
      const response = await axiosInstance({
        method:"post",
        url: `/payment/create?total=${total}` // Ensure this sends total*100 if your backend expects cents directly
      });
      console.log("Backend response data:", response.data); // Log backend response
      const clientSecret = response.data?.clientSecret;

      // 2. Client side (React side) confirmation
      const paymentIntentConfirmation = await stripe.confirmCardPayment(
        clientSecret, {
          payment_method:{
            card: element.getElement(CardElement),
          }
        });

      // --- Log the correct variable ---
      console.log("Stripe confirmCardPayment result:", paymentIntentConfirmation);

      // 3. After the confirmation ---> order firestore database save, clear the basket
      if (paymentIntentConfirmation && paymentIntentConfirmation.paymentIntent) {
        const confirmedPaymentIntent = paymentIntentConfirmation.paymentIntent;

        // --- FIX 2: Use confirmedPaymentIntent for Firestore properties ---
        const userOrderRef = collection (db,"users", user.uid, "orders");
        await setDoc(doc(userOrderRef, confirmedPaymentIntent.id),{ // Use confirmedPaymentIntent.id
          basket: basket,
          amount: confirmedPaymentIntent.amount, // Use confirmedPaymentIntent.amount
          created: confirmedPaymentIntent.created, // Use confirmedPaymentIntent.created
        });

        console.log("Order saved to Firestore:", confirmedPaymentIntent); // Log the confirmed object
        // You would typically dispatch EMPTY_BASKET and navigate here
        dispatch({ type: Type.EMPTY_BASKET});//Dispatch action to clear the basket
        navigate( '/orders', {state: {msg:"You have placed a new order"}});

      } else if (paymentIntentConfirmation && paymentIntentConfirmation.error) {
        // Handle error from Stripe confirmation
        console.error("Stripe confirmation error:", paymentIntentConfirmation.error);
        setCardError(paymentIntentConfirmation.error.message || "Payment confirmation failed.");
      } else {
        // Generic error if paymentIntentConfirmation is null or unexpected
        console.error("Unexpected Stripe confirmation result:", paymentIntentConfirmation);
        setCardError("Payment process could not be completed.");
      }

      setProcessing(false); // Stop loader on success or after handling confirmation result

    } catch (error) {
      console.log("Caught error in handlePayment:", error); // More descriptive log
      setProcessing(false);

      // Display card error message if it's a Stripe-related error
      if (error.type === 'StripeInvalidRequestError' || error.type === 'card_error') {
        setCardError(error.message);
      } else {
        setCardError("An unexpected error occurred during payment.");
      }
    }
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
                <div>123 Addis Ababa</div>
                <div>A.A</div>
              </div>

          </div>
          <hr />
          {/*product*/}
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div>
              {
                basket?.map((item,i)=><ProductCard key={item.id || i} product={item} flex={true}/>)
              }
            </div>
          </div>
          <hr />
          {/*card form*/}
          <div className={classes.flex}>
            <h3>Payment Methods</h3>
            <div className={classes.payment_card_container}>
              <div className={classes.Payment_details}>
                <form onSubmit={handlePayment}>
                  {cardError && <small style={{color:"red"}}>{cardError}</small>}
                  <CardElement onChange={handleChange}/>
                  {/*price*/}
                  <div className={classes.payment_price}>
                    <div>
                      <span style={{display:"flex", gap:"10px"}}>
                        Total Order | <CurrencyFormat amount={total}></CurrencyFormat>
                      </span>
                    </div>
                    <button type='submit'>
                      {
                        processing?(
                          <div className={classes.loading}>
                            <CircleLoader color="#000" size = {15} />
                            <p>Please Wait ...</p>
                          </div>
                        ):"Pay Now"
                      }
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

export default Payment;