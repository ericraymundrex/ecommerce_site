import { useSelector } from "react-redux";
import  styles from "../Card/Card.module.css"
import { useState,useEffect, Fragment } from "react";
import axios from "axios";
import Product from "../Product/Product";
import VerticalHeader from "../VerticalHeader/VerticalHeader";


const Search = () => {
    const {SearchTerm} = useSelector(State=>State)
    console.log(SearchTerm)
    const [pos,setPos]=useState(1)
    const [modalOpen, setModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [posts,setPosts]=useState({});
    const [categories,setCategories] = useState([])

    

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
        const res=await axios.post("/search",{offset:pos},{headers:{"Content-Type":"application/json"}});
        setPosts(res.data.data)
        console.log(res.data.data)
        
    }
    const fetchData=async()=>{
        const res=await axios.get("/category",{headers:{"Content-Type":"application/json"}});
        setCategories(res.data.data)

    }
    useEffect(()=>{
        fetchPost()
        // setModalOpen(Modal)

    },[pos])
    useEffect(()=>{
        fetchData()
    },[])
    
    
    
    const renderTrendingPosts=Object.values(posts).filter((val)=>{
        if(val.name.toLowerCase().includes(SearchTerm.toLowerCase())){
            return val
        }
        else if(val.product_category.toLowerCase().includes(SearchTerm.toLowerCase())){
            return val
        }
        else if(val.description.toLowerCase().includes(SearchTerm.toLowerCase())){
            return val
        }

    }).map((post)=>{
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
        <div>
            {/* <VerticalHeader categories={categories}/> */}
        <div className={styles.Card}> 
            <p className={styles.head}>You Searched For : {SearchTerm}</p>
            
            <div className={styles.Row}>
                
                {renderTrendingPosts}
            
            </div>
            <div className={styles.Row}>
                
            <button id="left" type="button" onClick={move_left}><img src="../images/left.png" width="40" height="40" alt="move left" className={styles.button}/></button>
            <span>{pos}</span>
            <button id="right" type="button" onClick={move_right}><img src="../images/right.png" width="40" height="40" alt="move right" className={styles.button}/></button>     
            
            </div>
                    
        </div>
        </div>
    )
}

export default Search;