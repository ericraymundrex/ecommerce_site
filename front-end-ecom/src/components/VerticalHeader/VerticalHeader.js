import styles from "./VerticalHeader.module.css"
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
    const token=localStorage.getItem("token")
    const signoutHandler=(event)=>{
        event.preventDefault()
        localStorage.removeItem("userType")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("name")
        window.location.reload(false);
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
        <div className={styles.Main_vertical}>
            <div>
            <p>Users</p>
            <div className={styles.vertical_menu}>
                <a href="/" >Profile</a>
                <a href="/">Purchases</a>
               { token?<a onClick={signoutHandler} href="/">Signout</a>:""}
            </div>
            <p>Shop By Department</p>
            <div className={styles.vertical_menu}>
                {categories.map((item,index)=>(
                    <button key={index} onClick={()=>clickHandler(item.name)}>{item.value}</button>
                ))}
            </div>
            <p>Filters</p>
            <div className={styles.vertical_menu}>
                <a href="/">Filter by price</a>
                <a href="/">Filter by Brand</a>
            </div>
            </div>
        </div>
    )
}

export default VerticalHeader;