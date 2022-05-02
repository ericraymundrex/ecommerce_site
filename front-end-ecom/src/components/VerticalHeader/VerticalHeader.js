import "./VerticalHeader.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
const config = {
    headers:{
      "token": localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  };

const VerticalHeader  = (props) => {
    const categories = props.categories
    const navigate = useNavigate()
    const [category,setCategory] = useState("")
    
    const signoutHandler=(event)=>{
        event.preventDefault()
        localStorage.removeItem("userType")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("name")
    }

    const fetchData=async()=>{
        const res=await axios.get(`/${category}`,config);
        console.log(res.data.data)
    }
    useEffect(()=>{
        fetchData()
    },[category])

    const clickHandler = (name) =>{
        setCategory(name)
        navigate(`/${name}`)
    }

    return(
        <div className="Main-vertical">
            <p>Users</p>
            <div className="vertical-menu">
                <a href="/" >Profile</a>
                <a href="/">Purchases</a>
                <a onClick={signoutHandler} href>Signout</a>
            </div>
            <p>Shop By Department</p>
            <div className="vertical-menu">
                {categories.map((item)=>(
                    <a key={item.id} onClick={()=>clickHandler(item.name)}>{item.value}</a>
                ))}
            </div>
            <p>Filters</p>
            <div className="vertical-menu">
                <a href="/">Filter by price</a>
                <a href="/">Filter by Brand</a>
            </div>
        </div>
    )
}

export default VerticalHeader;