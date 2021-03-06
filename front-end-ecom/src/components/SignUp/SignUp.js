import style from "./SignUp.module.css"
import { Fragment, useState } from "react"
import axios  from "axios"
import { useParams } from "react-router-dom";

const SignUp = () =>{
    let {usertype}=useParams()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')

    const loginHandler = async(event) => {
      event.preventDefault();
      let message=await axios.post(`/${usertype}/signup`,{
            name:name,
            email:email,
            password:password,
            
        },{headers:{'Content-Type': 'application/json'}});
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
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return(
        <Fragment>
        <form onSubmit={loginHandler} className={style.SignUp}>
        <h3>Sign Up, and happy shopping</h3>
            <div className="container">

        <div className="mb-3 mt-3">
          <label htmlFor="name">{capitalizeFirstLetter(usertype)} Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder={`Enter Your ${capitalizeFirstLetter(usertype)} Name`}
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