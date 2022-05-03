import { Fragment,useState } from "react";
import ShowList from "./ShowList";
import AddItem from "./Add";
import styles from './MerchantUI.module.css'
const MerchantUI=()=>{
    const [position,setPosition]=useState(2)
    
    return(
        <Fragment>
            <div className={styles.container}>
            <button className={styles.button} onClick={()=>setPosition(1)}>Add New Item</button> <button className={styles.button} onClick={()=>{setPosition(2)}}>Show Item</button>
            </div>
            {position===1?<AddItem />:""}
            {position===2?<ShowList />:""}
            
        </Fragment>
    )
}

export default MerchantUI;