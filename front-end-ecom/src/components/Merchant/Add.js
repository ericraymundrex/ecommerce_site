import { Fragment, useState, useEffect } from "react"
import axios from "axios"
import style from "./ShowList.module.css"
import File from "../File/File"
import AuthError from '../AuthError/AuthError'
const config = {
  headers:{
    "token": localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
};

const AddItem = () =>{

  const [categories,setCategories] = useState([])
  const [message,setMessage]=useState('')
  const fetchCat=async()=>{
      const res=await axios.get("/category",config);
      setCategories(res.data.data)
  }
    
    const [name,setName]=useState('')
    const [quantity,setQty]=useState('')
    const [category,setCat]=useState('')
    const [description,setDes]=useState('')
    const [price,setPrice]=useState('')
    // const [files,setFiles]=useState([])                    
    const nameChangeHandler = (event) =>{
      setName(event.target.value)
    }
    const qtyChangeHandler = (event) =>{
      setQty(event.target.value)
    }
    const priceChangeHandler = (event) =>{
      setPrice(event.target.value)

    }
    const catChangeHandler = (event) =>{
      setCat(event.target.value)

    }
    const desChangeHandler = (event) =>{
      setDes(event.target.value)

    }

    const [data,setData] = useState({})
    const fetchData=async()=>{
      const res=await axios.get("/merchant",config);
      console.log(res.data.data)
      setData(res.data.data)
  }
  useEffect(()=>{

      fetchData()
      fetchCat()
  },[])
  console.log(data)

    
    const submitHandler = async(event)=>{
      event.preventDefault();

        await axios.post("/merchant",{
          id:'',
          name:name,
          qty:quantity,
          cat:category,
          des:description,
          price:price,
          img_id:localStorage.getItem("img_id")
      },config);
    }
    const uploading=()=>{
      setMessage("uploading the files, please don't refresh")
    }
    const success=()=>{
      setMessage("Successfully added")
    }
    const removeNotification=()=>{
      setMessage('')
    }
    return(
      
        <Fragment>
          {message===''?"":message==="Successfully added" ?<AuthError removeNotification={removeNotification} style_used={"alert alert-success mb-0"} message={"Successfully added"} userType="all"/>:<AuthError removeNotification={removeNotification} style_used={"alert alert-warning mb-0"} message={"Loading please wait"} userType="all"/>}
          
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
            onChange={nameChangeHandler}
          />
        </div>

        <div className="mb-3 mt-3">
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
        
        </div>
      </form> }
      
        </Fragment>
    )
}

export default AddItem;