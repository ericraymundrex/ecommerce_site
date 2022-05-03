import { useState,useEffect } from "react"
import styles from "./Login.module.css"
import axios from 'axios'
import { useParams } from "react-router-dom";
import AuthError from '../AuthError/AuthError'
const Login = () => {
    let {usertype}=useParams()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [merchantAlert,setMerchantAlert]=useState(false)
    const [loginError,setLoginError]=useState(false)
    const loginHandler = async(event) =>{
      event.preventDefault();
      let data=await axios.post(`/${usertype}/login`,{
            email:email,
            password:password
        },{
          headers:{'Content-Type': 'application/json'}
        })

        console.log(data.data)
        if(data.data.token!==undefined){
          localStorage.setItem("token",data.data.token)
          localStorage.setItem("userType",data.data.userType)
          localStorage.setItem("email",data.data.email)
          localStorage.setItem("name",data.data.name)

          setEmail('')
          setPassword('')
        }else{
          setLoginError(true)
        }
    }
    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordChangeHandler = (event) =>{
        setPassword(event.target.value)   
    }
    const removeNotification=(data)=>{
      if(data.userType==="all"){
        setLoginError(false)
      }
      if(data.userType==="merchant"){
        setMerchantAlert(false)
      }
    }

    useEffect(()=>{
      if(usertype==="merchant"){
        setMerchantAlert(true)
      }      
    },[usertype])
    return(

        <div className={styles.background}>
          {loginError?<AuthError removeNotification={removeNotification} style_used={"alert alert-danger mb-0"} message={"Entered email or password is wrong"} userType="all"/>:""}
          {merchantAlert?<AuthError removeNotification={removeNotification} style_used={"alert alert-warning mb-0"} message={"Now you are in merchant login"} userType="merchant"/>:""}

        <form onSubmit={loginHandler} className={styles.login}>
        <h3>Login Page, welcome</h3>
            <div className={styles.container}>    
        <div className="mb-3 mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={`${styles.form_content} form-control`}
            placeholder="Enter Email"
            onChange={emailChangeHandler}
            value={email}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className={`${styles.form_content} form-control`}
            onChange={passwordChangeHandler}
            value={password}
          />
        </div>
        <div className="btn-container">
        <button type="submit" className={`${styles.btn} ${styles.btn_primary} btn btn-primary`}>
          Login
        </button>
        {/* <button type="submit" className="btn btn-primary">
          Register
        </button> */}
        </div>
        
        </div>
      </form> 
      </div>   
      )
}

export default Login;
