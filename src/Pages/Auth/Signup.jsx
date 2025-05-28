import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Signup.module.css'
import LayOut from '../../Components/LayOut/LayOut.jsx'

function Signup() {
  return (
    <LayOut>
    <section className={classes.login}>
    <Link>
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" />
    </Link>

    {/*form*/}
    <div className={classes.login_container}>
      <h1>Sign In</h1>
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' />
        </div>
        <button className={classes.login_signInButton}>
          Sign In
        </button>
          {/*agreement*/}
            <p>By signing-in you agree to the AMAZONE CLONE conditions of use and sale. Please see our privacy notice, our cookies notice and out interest based ADS no</p>
          <button className={classes.login_registerButton}>
            Creat your Amazon Account
          </button>


      </form>

    </div>


    </section>
    </LayOut>

    
  );
}

export default Signup