import { Fragment, useState, useEffect } from "react"
// import "./ShowList.css"
import axios from "axios"

const config = {
    headers:{
      "token": localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  };

const ShowList = () =>{
    const [data,setData] = useState([])
    const fetchData=async()=>{
      const res=await axios.get("/merchant",config);
      console.log(res.data.data)
      setData(res.data.data)
  }
  useEffect(()=>{
      fetchData()
  },[])
  console.log(data)
  
    return(
        <Fragment>
            <table className="table table-striped ShowList">
                <thead>
                    <td>Sr No.</td>
                    <td>Product Name</td>
                    <td>Product Price</td>
                    <td>Quantity Available</td>
                    <td>Product Rating</td>
                    <td>Action</td>
                </thead>
                <tbody>
                    {data.map((item,count)=>(
                        <tr key={item.product_id}>
                            <td>{count+1}</td>
                            <td>{item.product_name}</td>
                            <td>{item.product_price}</td>
                            <td>{item.product_available_qty}</td>
                            <td>{item.product_rating} / 5</td>
                            <td>
                                <a href="/{item.product_id}">Delete</a>
                                <a href="/edit/{item.product_id}">Edit</a>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </Fragment>
    )
}
// onLoad={()=> setCount(count+1)}

export default ShowList;