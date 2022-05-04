import axios from "axios";
import { Fragment } from "react";
import { useEffect,useState } from "react";
import styles from './Purchase.module.css'
const Purchase=()=>{
    const [data,setData]=useState([])
    const fetchData=async()=>{
        let res=await axios.get("/user/purchase",{"headers":{"token":localStorage.getItem("token")}})
        setData(res.data.data)
        console.log(data)
    }
    useEffect(()=>{
        fetchData()
    },[])
    return(
        <Fragment>
            <div className={styles.item}>
            {data.map((item,index)=>{
               return <div key={index} >
                   <span className={styles.text}>{item.product_name}</span>
                   <span className={styles.price}>{item.product_price}</span>
                   
                </div>
           })} 
          
            </div>
        </Fragment>
    )
}

export default Purchase;