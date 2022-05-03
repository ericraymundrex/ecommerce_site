import style from "./Header.module.css"
import {Fragment} from 'react'
import { useSelector } from "react-redux";
import { useState } from "react";
import Cart from "../Cart/Cart";
const Header = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const {CartItem} = useSelector((state) => state);
  
  const name=localStorage.getItem("name");
  const userType=localStorage.getItem("userType")  

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
     <nav className={style.container}>
       <ul className={style.title}><div className={style.container_name}><a href="/">Ecom -site</a></div> </ul>
       <ul className={style.input}><input className={style.input_field}/> <button className={style.button}>Search</button></ul>
       <ul className={style.login}><button className={style.button_login}>{content} </button></ul>
       <ul className={style.login}><button className={style.button_login} onClick={()=>{setModalOpen(true)}}><span>{CartItem.length === 0 ? <img src="../images/cart.png" alt="This is cart" className={style.cart_icon}></img> : <span>{CartItem.length}</span>}</span></button></ul>
     </nav>
     {modalOpen && <Cart setOpenModal={setModalOpen} />}
   </Fragment>
  )
};


export default Header;