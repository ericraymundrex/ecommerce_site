import "./Card.css"
import { useState,useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import DetailView from "../DetailView/DetailView"
import Product from "../Product/Product";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";

// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Card = () =>{
    const [pos,setPos]=useState(1)
    const [modalOpen, setModalOpen] = useState(false);
    const {CartItem} = useSelector((state) => state)

    console.log(pos)
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
    
    const [posts,setPosts]=useState({});

    const fetchPost=async()=>{
        const res=await axios.post("/home",{offset:pos},{headers:{"Content-Type":"application/json"}});
        setPosts(res.data.data)
        
    }
    useEffect(()=>{
        fetchPost()
    },[pos])
    
    const renderTrendingPosts=Object.values(posts).map((post)=>{
        return <Product className="Element" key={post.id} post={post} onAdd={onAdd}/>
                     
            
    })

    const move_left=()=>{
        if(pos>1)
            setPos(pos-1)
    }
    const move_right=()=>setPos(pos+1)

    return(
        
        <div className="Card">
            
            <p>Trending</p>
            <div className="cart-icon">
                <img onClick={() => {
                    setModalOpen(true);
                    }}
                    src="../images/cart.png" alt="cart"/>
                {CartItem.length === 0 ? "" : <p>{CartItem.length}</p>}
            </div>
            <div className="Row">
                <a id="left" type="button" onClick={move_left}><img src="./images/left.png" width="40" height="40"/></a>
                {renderTrendingPosts}
                <a id="right" type="button" onClick={move_right}><img src="./images/right.png" width="40" height="40"/></a>
               

                
                    
            </div>
            <p>Top Brands For You</p>
            <div className="Row">
            <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <a href="/"><img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/></a>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                </div>
            </div>

                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                    </div>
                </div>
                
            </div>
            <p>Top Brands</p>
            <div className="Row">
            <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                            
                    </div>
                </div>
                
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                    </div>
                </div>
                <div className="Element">
                    <div className="Card-body">
                        <p>fasd</p>
                        <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/>
                        <p>Rs : 250 /-</p>
                        <input type="button" value="Add to Cart"/>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                    </div>
                </div>
            </div>

            {modalOpen && <Cart setOpenModal={setModalOpen} />}

        
        </div>

        
    )
}

export default Card;
