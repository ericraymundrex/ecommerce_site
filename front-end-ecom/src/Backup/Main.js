import "./Main.css"
import { Fragment,useState, useEffect } from "react"
import Card from "../Card/Card"
import VerticalHeader from "../VerticalHeader/VerticalHeader";
import axios from "axios";

const config = {
    headers:{
      "token": localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  };

const Main = () =>{
    const [categories,setCategories] = useState([])
    const fetchData=async()=>{
        const res=await axios.get("/category",config);
        setCategories(res.data.data)

    }
    useEffect(()=>{
        fetchData()
    },[])

    // const categories = [{'id':1,'value':'Mobiles, Computers',"name":"Mobile"},
    //                     {'id':2,'value':'Electronics',"name":"Electronics"},
    //                     {'id':3,'value':"Men's Fashion","name":"MenFashion"},
    //                     {'id':4,'value':"Women's Fashion","name":"WomenFashion"},
    //                     {'id':5,'value':'Home, Kitchen, pets',"name":"Home"},
    //                     {'id':6,'value':'Grocery',"name":"Grocery"},
    //                     {'id':7,'value':'Toys',"name":"Toys"}]
    return(

<Fragment>
    <div className="Main">
        <VerticalHeader categories={categories}/>
        <Card/>
    </div>

</Fragment>
);
};

export default Main;