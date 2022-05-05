import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./ShowList.module.css"
import File from "../File/File";

const config = {
    headers:{
      "token": localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  };

const EditItem = () =>{
    const {id} = useParams()
    const [name,setName] = useState("")
    const [qty,setQty] = useState(0)
    const [cat,setCat] = useState("")
    const [des,setDes] = useState("")
    const [price,setPrice] = useState(0)

    const fetchData = async()=>{
        const res = await axios.get(`/merchant/edit/${id}`,config)
        setName(res.data.name)
        setQty(res.data.qty)
        setCat(res.data.category)
        setDes(res.data.description)
        setPrice(res.data.price)
    }
    useEffect(()=>{
        fetchData()
    })
    console.log(name)
    const submitHandler = (event) =>{
        console.log(event.target.name.value)
    }
    const nameChangeHandler = (event) =>{
        console.log(event.target.value)
    }
    const [message,setMessage]=useState('')

    const uploading=()=>{
        setMessage("uploading the files, please don't refresh")
      }
      const success=()=>{
        setMessage("Successfully added")
      }
      const removeNotification=()=>{
        setMessage('')
      }
    return (
        <Fragment>
          {/* {message===''?"":message==="Successfully added" ?<AuthError removeNotification={removeNotification} style_used={"alert alert-success mb-0"} message={"Successfully added"} userType="all"/>:<AuthError removeNotification={removeNotification} style_used={"alert alert-warning mb-0"} message={"Loading please wait"} userType="all"/>} */}
          
           { <form onSubmit={submitHandler} className={style.AddItem} >
        <h3>Add New Item Page</h3>
            <div className="container">

        <div className="mb-3 mt-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter Your Name"
            value={name}
          />
        </div>

        {/* <div className="mb-3 mt-3">
          <label htmlFor="qty">Quantity</label>
          <input
            type="number"
            name="qty"
            id="qty"
            className="form-control"
            placeholder="Enter Quantity"
            onChange={qtyChangeHandler}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            className="form-control"
            placeholder="Enter Price"
            onChange={priceChangeHandler}
          />
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="cat">Category : </label>
          <select name='cat' 
            onChange={catChangeHandler}
          >
          <option  value="Men Fashion">Men Fashion</option>     
          <option  value="Women Fashion">Women Fashion</option>
          <option  value="Electronics">Electronics</option>
          <option  value="Mobile">Mobile</option>
          <option  value="Sport Item">Sport Item</option> 
          <option  value="Home">Home</option>
          <option  value="Toys">Toys</option>
          <option  value="Men Footware">Men Footware</option>
          <option  value="Women Footware">Women Footware</option>
          
          </select>
        </div>
        
        <div className="mb-3 mt-3">
          <label htmlFor="des">Description</label>
          <input
            type="text"
            name="des"
            id="des"
            className="form-control"
            placeholder="Enter Description"
            onChange={desChangeHandler}
          />
        </div>
        
        <File uploading={uploading} success={success}/>
        <div className="btn-container">
        
        </div>
         */}
         <File uploading={uploading} success={success}/>
        <div className="btn-container">
        
        </div>
         
        </div>
      </form> }
      
        </Fragment>
    )
}

export default EditItem;