import "./Card.css"
import { useState,useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import DetailView from "../DetailView/DetailView"
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Card = () =>{
    const arr= [
        {
            id:1,
            name:"dnndjn",
            price:1000
        },
        {
            id:2,
            name:"wwknknwkw",
            price:2000
        }]
    const [posts,setPosts]=useState({});

    const fetchPost=async()=>{
        const res=await axios.get("/home");
        console.log("res : "+res )
        setPosts(res.data.data)
    }
    useEffect(()=>{
        fetchPost()
    },[])

    const renderPosts=Object.values(posts).map(post=>{
        return <div className="Element"
                    key={post.id}
                    >
                     <div className="Card-body">
                            <h5>{post.name}</h5>
                            <a href={`/${post.name}`}><img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/></a>
                            <p>Rs : {post.price} /-</p>
                            <input type="button" value="Add to Cart"/>
                            
                    </div>
                    
            </div>
    })


    return(
        <div className="Card">
            <p>Trending</p>
            <div className="Row">
                {renderPosts}
                    
            </div>
            <p>Top Brands For You</p>
            <div className="Row">
            <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <a href="#"><img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/></a>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                </div>
            </div>

                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
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
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                            
                    </div>
                </div>
                
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
                            <p>Rs : 250 /-</p>
                            <input type="button" value="Add to Cart"/>
                    </div>
                </div>
                <div className="Element">
                    <div className="Card-body">
                        <p>fasd</p>
                        <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
                        <p>Rs : 250 /-</p>
                        <input type="button" value="Add to Cart"/>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
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