import React from 'react'
import { BrowserRouter as Router,Routes, Route, redirect } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Signup from './Pages/Auth/Signup'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

const stripePromise = loadStripe('pk_test_51RUXcHQ4cDW2HIKsDUQmLD2iW5wKijfMVxR9VkdTrtckQP4Y2mwbxkYvxBR1b6CVoOy7JbIv69uy7gdLCYn4tLc300FW5vvDwB');

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/auth' element={<Signup/>}/>
            <Route path='/payments' element={
              <ProtectedRoute msg={"You must log in to pay"} redirect={"/payments"}>
              <Elements stripe={stripePromise}>
              <Payment/>
              </Elements>

              </ProtectedRoute>

              }/>
            <Route path='/orders' element={
              <ProtectedRoute 
              msg={"You must log in to access your orders"} redirect={"/orders"}>
                <Orders/>
              </ProtectedRoute>
              }/>
            <Route path='/category/:categoryName' element= {<Results/>}/>
            <Route path='/products/:productId' element={<ProductDetail/>}/>
            <Route path='/cart' element ={<Cart/>}/>
        </Routes>
    </Router>
    
  );
}

export default Routing;