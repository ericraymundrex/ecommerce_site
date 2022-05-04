import axios from "axios";
import { Fragment } from "react";
import styles from './CheckOut.module.css'
const CheckOut = () =>{
    const CartItem = JSON.parse(localStorage.getItem("CartItem"))
    console.log(CartItem)

    let sum=CartItem.reduce((item1,item2)=>item1.price+item2.price)


    const purchaseHandler=async(event)=>{
        event.preventDefault();
        console.log(CartItem)
        let datas=[]
        for (let data in CartItem){
            datas.push({"id":data.id})
        }
        await axios.post("/user/purchase",{
            "data":datas
        },{"headers":{"token":localStorage.getItem("token")}});
    }
    return (
        <Fragment>
            <div className={styles.item}>
            {CartItem.map((item,index)=>{
               return <div key={index} >
                   <span className={styles.text}>{item.name}</span>
                   <span className={styles.price}>{item.price}</span>
                </div>
           })} 
           <div className={styles.price}>-----</div>
           <br />
           <div className={styles.price}>{sum}</div>
            </div>
           <button onClick={purchaseHandler}>Checkout</button>
        </Fragment>
    )
}

export default CheckOut;