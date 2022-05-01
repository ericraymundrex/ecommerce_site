import { Fragment, useState } from "react"
import "./Login.css"
import axios from 'axios'
import { useParams } from "react-router-dom";

const Login = () => {
    let {usertype}=useParams()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const loginHandler = async(event) =>{
      event.preventDefault();
      let token=await axios.post(`/${usertype}/login`,{
            email:email,
            password:password
        },{
          headers:{'Content-Type': 'application/json'}
        });

        console.log(token.data.token)
        localStorage.setItem("token",token.data.token)
        localStorage.setItem("userType",token.data.userType)
        localStorage.setItem("email",token.data.email)
        localStorage.setItem("name",token.data.name)
        
        setEmail('')
        setPassword('')
    }
    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordChangeHandler = (event) =>{
        setPassword(event.target.value)   
    }

    return(

        <Fragment>
        <form onSubmit={loginHandler} className="Login">
        <h3>Login Page, welcome</h3>
            <div className="container">
            
        <div className="mb-3 mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
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
            className="form-control"
            onChange={passwordChangeHandler}
            value={password}
          />
        </div>
        <div className="btn-container">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {/* <button type="submit" className="btn btn-primary">
          Register
        </button> */}
        </div>
        
        </div>
      </form> 
      </Fragment>   
      )
}

export default Login;
