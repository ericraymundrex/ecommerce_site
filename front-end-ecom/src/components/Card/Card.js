import  styles from "./Card.module.css"
import { useState,useEffect } from "react";
import axios from "axios";
import Product from "../Product/Product";

import Cart from "../Cart/Cart";


// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Card = () =>{
    const [pos,setPos]=useState(1)
    const [modalOpen, setModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [posts,setPosts]=useState({});

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
    
    
    const fetchPost=async()=>{
        const res=await axios.post("/home",{offset:pos},{headers:{"Content-Type":"application/json"}});
        setPosts(res.data.data)
        
    }
    useEffect(()=>{
        fetchPost()
    },[pos])
    
    
    
    const renderTrendingPosts=Object.values(posts).map((post)=>{
        return <Product className={styles.element} key={post.id} post={post} onAdd={onAdd}/>        
    })

    const move_left=()=>{
        if(pos>1)
            setPos(pos-1)
    }
    const move_right=()=>{
      setPos(pos+1
    )}

    return(
        <div className={styles.Card}> 
            <p className={styles.head}>Trending</p>
           
            <div className={styles.Row}>
                
                {renderTrendingPosts}
            
            </div>
            <div className={styles.Row}>
                
            <button id="left" type="button" onClick={move_left}><img src="./images/left.png" width="40" height="40" alt="move left" className={styles.button}/></button>
            <span>{pos}</span>
            <button id="right" type="button" onClick={move_right}><img src="./images/right.png" width="40" height="40" alt="move right" className={styles.button}/></button>     
            
            </div>
            
            {modalOpen && <Cart setOpenModal={setModalOpen} />}
        
        </div>

        
    )
}

export default Card;
