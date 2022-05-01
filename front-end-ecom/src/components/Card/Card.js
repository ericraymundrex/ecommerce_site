import "./Card.css"
import { useState,useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import DetailView from "../DetailView/DetailView"
import Product from "../Product/Product";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Card = () =>{

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
    // const arr= [
    //     {
    //         id:1,
    //         name:"dnndjn",
    //         price:1000
    //     },
    //     {
    //         id:2,
    //         name:"wwknknwkw",
    //         price:2000
    //     }]
    const [posts,setPosts]=useState({});

    const fetchPost=async()=>{
        const res=await axios.get("/home");
        console.log("res : "+res )
        setPosts(res.data.data)
    }
    useEffect(()=>{
        fetchPost()
    },[])
    
    const renderTrendingPosts=Object.values(posts).map((post)=>{
        return <Product className="Element" key={post.id} post={post} onAdd={onAdd}/>
                     
            
    })

    // console.log(cartItems.length)
    return(
        <div className="Card">
            <p>Trending</p>
            <div className="Row">
                {renderTrendingPosts}
                
                    
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
            <Routes>
                <Route path="/dnndjn" element={<DetailView/>} />
            </Routes>

        
        </div>

        
    )
}

export default Card;
