import axios from "axios";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import styles from './CheckOut.module.css'
const CheckOut = () =>{
    const { CartItem } = useSelector((state)=>state)
    console.log(CartItem)

    let sum=CartItem.reduce((item1,item2)=>item1.price+item2.price)
    let tableContent=CartItem.map((item)=>(
        <tr>
            <td>{item.name}</td>
            <td>{item.price}</td>
        </tr>
    ))


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
            <div className={styles.containter}>
                <h1 className={styles.heading}>Your in the final step</h1>
                <table class="table">
  <thead>
    <tr>

      <th scope="col">Item Total</th>
      <th scope="col">₹{sum}</th>
    </tr>
  </thead>
  <tbody>
{tableContent}
<tr>
<th scope="col">Item Total</th>
      <th scope="col">₹{sum}</th> 
</tr>
<button onClick={purchaseHandler}>Check-out</button>
  </tbody>
</table>
            </div>
        </Fragment>
    )
}

export default CheckOut;