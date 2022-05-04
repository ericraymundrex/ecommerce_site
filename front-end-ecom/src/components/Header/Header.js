import style from "./Header.module.css"
import {Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Cart from "../Cart/Cart";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const {CartItem} = useSelector((state) => state);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const fetchdata = async () =>{
    const res = await axios.get("/search")
  }

  useEffect(()=>{
    fetchdata()
  },[])

  const name=localStorage.getItem("name");
  const userType=localStorage.getItem("userType")  

  const OpenModalHandler = (event) =>{
    dispatch({type:"ModalCart",value:true})
  }
  let content;
  if(userType==="merchant"){
    content=<Fragment>
      <span>Sell here</span>
    </Fragment>
  }else if(userType==="customer"){
    content=<Fragment>
      <span>{name.split(' ')[0]}</span>
    </Fragment>
  }else{
    content=<Fragment>
      <a href="/auth/user">Login/Signup</a>
    </Fragment>
  }

  const SubmitHandler = (event) =>{
    console.log(event.target.search.value)
    dispatch({type:"SearchTerm",value:event.target.search.value}  )

  }

  return(
   <Fragment>
     <div>
     <nav className={style.container}>
       {/* <ul className={style.title}><div className={style.container_name}></div> </ul> */}
       <a href="/">Ecom -site</a>
       <ul className={style.input}>
         <form method="POST" action="/search" onSubmit={SubmitHandler} autocomplete="off">
         <input 
          name="search"
          onFocus={()=>dispatch({type:"ModalSearch",value:true})}
          onBlur={()=>dispatch({type:"ModalSearch",value:false})}
          onChange={(event)=>dispatch({type:"SearchTerm",value:event.target.value})} 
          className={style.input_field}
        /> 
        <button className={style.button}>
          Search
        </button></form></ul>

       <ul className={style.login}>
         <button className={style.button_login}>
           {content} 
          </button>
        </ul>
       <ul className={style.login}>
         <button className={style.button_login} 
          onClick={()=>OpenModalHandler()}
          >
          <span>
            {CartItem.length === 0 
            ? 
              <img src="../images/cart.png" alt="This is cart" className={style.cart_icon}/> 
            : 
              <span>{CartItem.length}</span>}
          </span>
        </button>
      </ul>

     </nav>
     </div>
     
   </Fragment>
  )
};


export default Header;