import { Fragment, useState } from "react"
import axios from "axios"

const config = {
  headers:{
    "token": localStorage.getItem('token')
  }
};

const AddItem = () =>{
    const categories = [{'id':0,'value':''},
                        {'id':1,'value':'Electronics'},
                        {'id':2,'value':'Men Fashion'},
                        {'id':3,'value':'Women Fashion'},
                        {'id':4,'value':'Mobile Phone'},
                        {'id':5,'value':'Sports Item'},
                        {'id':6,'value':'Men Footware'},
                        {'id':7,'value':'Women Footware'}]
    
    const [name,setName]=useState('')
    const [quantity,setQty]=useState('')
    const [category,setCat]=useState('')
    const [description,setDes]=useState('')
    const [price,setPrice]=useState('')
                        
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
    
    const submitHandler = async(event)=>{
      event.preventDefault();
        let message=await axios.post("http://localhost:5000/merchant",{
          id:'',
          name:name,
          qty:quantity,
          cat:category,
          des:description,
          price:price,
          
      },config);
      console.log(message)
    }
    return(
        <Fragment>
            <form onSubmit={submitHandler} >
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
        
        <div className="btn-container">
        
        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
        </div>
        
        </div>
      </form> 
      
        </Fragment>
    )
}

export default AddItem;