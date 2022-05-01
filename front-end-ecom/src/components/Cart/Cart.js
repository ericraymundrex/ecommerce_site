import { Fragment } from "react";
import { useSelector } from "react-redux";
import "./Cart.css"

const Cart = ({setOpenModal}) =>{
    const {CartItem} = useSelector((state) => state)
    console.log(CartItem)

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
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Your Cart</h1>
        </div>
        
            {renderBody}
          {/* {CartItem.maps((item)=>(
              <p>{item</p>
          ))} */}
        
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
        </Fragment>
    )
}

export default Cart;