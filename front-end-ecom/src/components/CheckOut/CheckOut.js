import axios from "axios";
import { Fragment,useEffect,useState } from "react";
import styles from './CheckOut.module.css'
import AuthError from "../AuthError/AuthError";
const CheckOut = () =>{
    const [cartData,setCartData]=useState([])
    const [sum,setSum]=useState(0);
    const [success,setSuccess]=useState(false)

    const purchaseHandler=async(event)=>{
        event.preventDefault();
        console.log(cartData)
        let datas=[]
        for(let i=0;i<cartData.length; i++){
            datas.push({"id":cartData[i].id})
        }
        console.log(datas)
        await axios.post("/user/purchase",{
            "data":datas
        },{"headers":{"token":localStorage.getItem("token")}}).then(res=>{
            setSuccess(true)
            localStorage.removeItem("CartItem")
        });
    }

    useEffect(()=>{
        const CartItem = JSON.parse(localStorage.getItem("CartItem"))
        setCartData(()=>(CartItem));
        console.log(CartItem)
        let sum=0;
        for (let i=0;i<CartItem.length;i++){
            sum=sum+CartItem[i].price;
        }
        setSum(sum)
        // let sum=CartItem.reduce((item1,item2)=>item1.price+item2.price)     
    },[])

    const removeNotification=()=>{
        setSuccess(false)
    }
    return (
        <Fragment>
            {success?<AuthError removeNotification={removeNotification} style_used={"alert alert-success mb-0"} message={"Order successfully placed"} userType="all"/>:""}
            <div className={styles.item}>
            {cartData.map((item,index)=>{
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