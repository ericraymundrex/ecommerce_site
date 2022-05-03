import axios from "axios";
import { Fragment } from "react";
import styles from './CheckOut.module.css'
const CheckOut = () =>{
    const CartItem = JSON.parse(localStorage.getItem("CartItem"))
    console.log(CartItem)

    let sum=CartItem.reduce((item1,item2)=>item1.price+item2.price)


    const purchaseHandler=async(event)=>{
        event.preventDefault();
        let token=localStorage.getItem("token")

        await axios.post("/user/purchase",{
            "data":CartItem
        },{
            headers:{"Content-Type":"application/json","token":token}
        })
    }
    return (
        <Fragment>
            
        </Fragment>
    )
}

export default CheckOut;