import React from 'react'
import classes from './Header.module.css'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from './LowerHeader';
function Header() {
  return (
    <>
    <section className=''>
        
        <div className={classes.header_container}>
            <div className={classes.logo_container}>
            {/*logo section*/}
            <a href="">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
            </a>
            {/*delivery*/}
            <div className={classes.delivery}>
                <span>
                {/*icon*/}
                <SlLocationPin />
                </span>
                <div>
                    <p>Delivered to</p>
                

                    <span>Ethiopia</span>
                </div>
            

            </div>

            </div>
            <div className={classes.search}>
            {/*search*/}
            
            <select name="" id="">
                <option value="">All</option>
            </select>
            <input type="text" name='' id='' placeholder='search product' />
            {/*icon */}
            <BsSearch size={25}/>
        </div>

        

        {/*right side link*/}
        <div className={classes.order_container}>
            <a href="" className={classes.language}>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="" />
            <select name='' id=''>
                <option value="">EN</option>
            </select>

            </a>

                {/*three components*/}
            <a href = ''>
            <p>Sign In</p>
            <span>Account & Lists</span>
             </a>
    {/*orders*/}
            <a href="">
            <p>returns</p>
            <span>& Orders</span>
            </a>
    {/*cart*/}
            <a href='' className={classes.cart}>
            <BiCart />
    {/*icon*/}
            <span>0</span>
            </a>

        </div>
    </div>

        
        
    </section>
    <LowerHeader/>


    </>

    
  )
}

export default Header