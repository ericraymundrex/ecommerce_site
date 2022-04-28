import "./SignUp.css"
import { Fragment, useState } from "react"
import axios  from "axios"
const SignUp = () =>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')

    const loginHandler = async(event) => {
      event.preventDefault();
      let message=await axios.post("http://localhost:5000/merchant/signup",{
            name:name,
            email:email,
            password:password,
            
        });
      console.log(message)
      setEmail('')
      setPassword('')
      setName('')
    }
    const emailChangeHandler = (event) => {
      setEmail(event.target.value)
      console.log(email)
    }
    const passwordChangeHandler = (event) =>{
        setPassword(event.target.value)
        console.log(password)
    }
    const nameChangeHandler = (event) =>{
        setName(event.target.value)
        console.log(name)
    }
    return(
        <Fragment>
        <form onSubmit={loginHandler}>
        <h3>Sign Up Page</h3>
            <div className="container">

        <div className="mb-3 mt-3">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter Your Company Name"
            onChange={nameChangeHandler}
          />
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={emailChangeHandler}
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
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="form-control"
            // onChange={passwordChangeHandler}
          />
        </div>
        <div className="btn-container">
        
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        </div>
        
        </div>
      </form> 
      </Fragment>   
    )
}

export default SignUp;