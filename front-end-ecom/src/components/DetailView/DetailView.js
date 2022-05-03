import { Fragment } from "react";
import style from "./DetailView.module.css"
import { useState,useEffect } from "react";
import axios from "axios";
import VerticalHeader from "../VerticalHeader/VerticalHeader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Cart from "../Cart/Cart";

const DetailView = (props) =>{
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
          setCartItems(
            cartItems.map((x) => (
              x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
            ))
          );
        } else {
          setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
      };


    const [quantityEntered,setQuantityEnetered]=useState(0)
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

    // function createElement(n){
    //     var elements = []
    //     for(var i=1;i<n+1;i++){
    //         elements.push(<option value={i}>{i}</option>)
    //     }
    //     return elements
    // }

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
    const AddQuantity=()=>{
        if(quantityEntered <=posts.product_available_qty){
            setQuantityEnetered(quantityEntered+1)
        }
    }
    const SubtractQuantity=()=>{
        if(quantityEntered>0){
            setQuantityEnetered(quantityEntered-1) 
        }
    }

    const onAddToCart=()=>{
        onAdd(posts)
        dispatch({ type: "CartItem", value: posts });
    }

    return (
        <Fragment>
            
        <div className={style.DetailView}>
                <VerticalHeader categories={props.categories}/>
                <div className={style.DetailView_container}>
                    <div className={style.img_container}>
                    <img src={`/static/${posts.img}.png`} alt="This is a img" className={style.p_img}/>
                    </div>
                    
                    <div className="DetailView-body">
                            <h3>{posts.name}</h3>
                            <p><span>Description : </span></p>
                            {newDes.map((des)=> <li className={style.description_body}>{des}</li>)}
                            <span>Quantity : {posts.product_available_qty}</span>
                            {/* {posts.product_available_qty > 5 ?
                            <select>{createElement(5)}</select> 
                                : 
                            <select>{createElement(n)}</select>} */}
                            <div className={style.qty_container}>
                                <button onClick={AddQuantity} className={style.button}>+</button>
                                <span className={style.q_text}>{quantityEntered}</span>
                                <button onClick={SubtractQuantity} className={style.button}>-</button>
                            </div>
                            <br/>
                            <p><span>Rs : </span>{posts.price} /-</p>
                            <div className={style.button_container}>
                                <input type="Submit" value={"Add to cart"} onClick={onAddToCart}/>
                                <input type="Submit" value={"Buy"} onClick={()=>buyHandler(posts)}/>
                            </div>
                            {posts.product_available_qty > 5 ? "" : 
                            <p className={style.warning}> * Only <span>{n}</span> left in stock</p>}
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