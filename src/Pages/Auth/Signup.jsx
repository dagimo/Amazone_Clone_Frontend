import React, { useState, useContext } from 'react'
import { Link, useNavigate, useNavigation, useLocation } from 'react-router-dom'
import classes from './Signup.module.css'
import LayOut from '../../Components/LayOut/LayOut.jsx'
import {auth} from '../../Utility/firebase.jsx'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import { DataContext } from '../../Components/DataProvider/DataProvider.jsx'
import { Type } from '../../Utility/action.type.jsx'
import {CircleLoader } from 'react-spinners'


function Signup() {
  const [email, setEmail]=useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    signIn: false,
    signUP: false
  })
  const [{user}, dispatch]=useContext(DataContext)
  const navigate = useNavigate();
  const naveStateData = useLocation();
  console.log(naveStateData);
  //the below function is used to configure the sign up/ on
  const authHandler = (e) => {
    e.preventDefault()
    console.log(e.target.name);
    if(e.target.name == "signin"){
      //firebase authentication
      setLoading ({...loading, signIn:true})
      signInWithEmailAndPassword(auth, email, password)
      .then((userInfo)=>{
        console.log(user);
        dispatch({
          type:Type.SET_USER,
          user: userInfo.user
        });
        setLoading({...loading, signIn:false})
        navigate(naveStateData?.state?.redirect || '/');
      }).catch((err)=>{
        setError(err.message)
        setLoading({...loading, signIn:false})
      })
    }else{
      setLoading ({...loading, signUp: true})
      createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
        
        dispatch({
          type:Type.SET_USER,
          user: userInfo.user
        });
        setLoading ({...loading, signUp: false})
        navigate(naveStateData?.state?.redirect || '/')
      }).catch((err)=>{
        setError(err.message);
        setLoading ({...loading, signUp: false})
      });

    }

  };


  return (
    
    <section className={classes.login}>
    <Link to={'/'}>
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" />
    </Link>

    {/*form*/}
    <div className={classes.login_container}>
      <h1>Sign In</h1>
      {naveStateData?.state?.msg && (
        <small 
        style={{
          padding:'5px',
          textAlign:"center",
          color: "red",
          fontWeight:"bold",
        }}>
          {naveStateData?.state?.msg}
        </small>
      )}
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          {/*control input */}
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email' />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password' />
        </div>
        <button type='submit' name='signin' onClick={authHandler} className={classes.login_signInButton}>
          {
            loading.signIn?(<CircleLoader color="#000" size = {15} ></CircleLoader >): ("Sign In")
          }
          
        </button>
          {/*agreement*/}
            <p>By signing-in you agree to the AMAZONE CLONE conditions of use and sale. Please see our privacy notice, our cookies notice and out interest based ADS no</p>
            {/*creat account btn */}
          <button type='submit' name='signup' onClick={authHandler} className={classes.login_registerButton}>
          {
            loading.signUP?(<CircleLoader color="#000" size = {15} ></CircleLoader >): ("Creat your Amazon Account")
          }
            
          </button>

          {error && <small style={{paddingTop: "5px", color: "red"}}>{error}</small>}


      </form>

    </div>


    </section>
   

    
  );
}

export default Signup