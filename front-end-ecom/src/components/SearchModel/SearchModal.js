import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchModal.css"

// const = config

const SearchModal = () =>{
    const [Data,setData] = useState([])
    const {SearchTerm} = useSelector((state)=>state)

    const fetchData = async () =>{
        const res = await axios.get("/search",{"headers":{"Content-Type":"application/json"}})
        setData(res.data.data)
    }
    useEffect(()=>{
        fetchData()
    },[])
    return(

    <div className="Search">
        {Data.filter((val)=>{
            if(val === ""){
                return val
            }
            else if(val.name.toLowerCase().includes(SearchTerm.toLowerCase()) || val.product_category.toLowerCase().includes(SearchTerm.toLowerCase())){
                return val
            }
        }).map((item)=>(
            <div>
                <p key={item.name}>{item.name}</p>
            </div>
        ))}
    </div>
    )
}

export default SearchModal;