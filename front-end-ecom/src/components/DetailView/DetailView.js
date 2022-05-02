import { Fragment } from "react";
import "./DetailView.css"
import { useState,useEffect } from "react";
import axios from "axios";
import VerticalHeader from "../VerticalHeader/VerticalHeader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";


const DetailView = (props) =>{
    const [newDes,setnewDes] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let {id}=useParams()
    let buy_now=`/${id}/checkout`
    const [posts,setPosts]=useState({});
    useEffect(()=>{
        fetchPost()
    },[])
    const fetchPost=async()=>{
        const res=await axios.get("/product/"+id);
        console.log(res.data.data[0])
        setPosts(res.data.data[0])
        setnewDes(res.data.data[0].description.split('|'))
    }

    const n = posts.product_available_qty
    
    const buyHandler = (posts) =>{
        dispatch({type:"CartItem", value: posts})
        navigate('/checkout')
    }

    function createElement(n){
        var elements = []
        for(var i=1;i<n+1;i++){
            elements.push(<option value={i}>{i}</option>)
        }
        return elements
    }

    const [review,setReview]=useState(0)
    const submitReview=async(event)=>{
    
        event.preventDefault();
        let message=await axios.post("/user/review",{
            id:id,
            rate:review
        },{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")
            }
        })
        console.log(message)
    }

    const onReviewChangeHandler=(event)=>{
        setReview(event.target.value)
    }
    return (
        <Fragment>
            
        <div className="DetailView">
                <VerticalHeader categories={props.categories}/>
                <div className="DetailView-container">
                    <img src="https://www.tompetty.com/sites/g/files/g2000007521/f/Sample-image10-highres.jpg" alt="This is a img"/>
                    <div className="DetailView-body">
                            <h3>{posts.name}</h3>
                            <p><span>Description : </span></p>
                            {newDes.map((des)=> <li className="description-body">{des}</li>)}
                            <span>Quantity : </span>
                            {posts.product_available_qty > 5 ?
                            <select>{createElement(5)}</select> 
                                : 
                            <select>{createElement(n)}</select>}
                            <br/>
                            <p><span>Rs : </span>{posts.price} /-</p>
                            <div className="button-container">
                                <input type="Submit" value={"Add to cart"} />
                                <input type="Submit" value={"Buy"} onClick={()=>buyHandler(posts)}/>
                            </div>
                            {posts.product_available_qty > 5 ? "" : 
                            <p className="warning"> * Only <span>{n}</span> left in stock</p>}
                            {/* product rating: {product_rating} */}
                            <span>Rating :</span><input type="number" max={5} min={1} onChange={onReviewChangeHandler}></input>
                             <button onClick={submitReview}>Submit</button>
                    </div>
                    
                               
                </div>
            </div> 
        </Fragment>
    )
}

export default DetailView;