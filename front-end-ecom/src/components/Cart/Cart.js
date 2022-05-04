import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./Cart.css"

const Cart = () =>{

    const {CartItem, Modal} = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const renderBody = Object.values(CartItem).map((item)=>{
            
        return (            
            <div className="body">
            <p>{item.name}</p>
            <br/>
            </div>
        )
    })
    return(
        <Fragment>

<div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              dispatch({type:"ModalCart",value:false})
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Your Cart</h1>
        </div>
        <div className="body">
          <p>{renderBody}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              dispatch({type:"ModalCart",value:false})
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={()=>{navigate("/checkout")}}>Continue</button>
        </div>
      </div>
    </div>

    

</Fragment>
    )
}

export default Cart;