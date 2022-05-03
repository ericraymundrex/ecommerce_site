import style from "./Header.module.css"
import {Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Cart from "../Cart/Cart";
import axios from "axios"

const Header = () => {

  const [openModal, setSearchModal] = useState(false);
  const {CartItem} = useSelector((state) => state);
  const dispatch = useDispatch()
  
  const fetchdata = async () =>{
    const res = await axios.get("/search")
    console.log(res.data.data)
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

  return(
   <Fragment>
     <div>
     <nav className={style.container}>
       {/* <ul className={style.title}><div className={style.container_name}></div> </ul> */}
       <a href="/">Ecom -site</a>
       <ul className={style.input}>
         <input 
          onFocus={()=>setSearchModal(openModal)} 
          className={style.input_field}
        /> 
        <button className={style.button}>
          Search
        </button></ul>

       <ul className={style.login}>
         <button className={style.button_login}>
           {content} 
          </button>
        </ul>
       <ul className={style.login}>
         <button className={style.button_login} 
          onClick={()=>OpenModalHandler(true)}
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