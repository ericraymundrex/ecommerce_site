import { Fragment, useState, useEffect } from "react"
import axios from "axios"
import style from "./ShowList.module.css"
import File from "../File/File"
import uuid from 'react-uuid'
const config = {
  headers:{
    "token": localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
};

const AddItem = () =>{
  const [img_id,]=useState(uuid())
  const [categories,setCategories] = useState([])
  
  const fetchCat=async()=>{
      const res=await axios.get("/category",config);
      setCategories(res.data.data)
  }
    // const categories = [{'id':0,'value':''},
    //                     {'id':1,'value':'Electronics'},
    //                     {'id':2,'value':'Men Fashion'},
    //                     {'id':3,'value':'Women Fashion'},
    //                     {'id':4,'value':'Mobile Phone'},
    //                     {'id':5,'value':'Sports Item'},
    //                     {'id':6,'value':'Men Footware'},
    //                     {'id':7,'value':'Women Footware'}]
    
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
          img_id:img_id
      },config);

// console.log(files[0])
    
    }


    // const imgChangeHandler=(event)=>{
    //     setFiles(event.target.files)
    // }
    // console.log(files)
    return(
      
        <Fragment>
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
            type="text"
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
            type="text"
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
          {categories.map((item)=>(
              <option key={item.id} value={item.value}>{item.value}</option>
          ))}
            
          </select>

        </div>
                  {/* <p>{{categories}}</p> */}

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
        {/* <div className="mb-3 mt-3">
          <label htmlFor="des">Image</label>
          <input
            type="file"
            name="des"
            id="des"
            className="form-control"
            placeholder="Enter Description"
            onChange={imgChangeHandler}
          />
        </div>  */}
        <File img_id={img_id}/>
        <div className="btn-container">
        
        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
        </div>
        
        </div>
      </form> }
      
        </Fragment>
    )
}

export default AddItem;