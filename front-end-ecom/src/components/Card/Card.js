import "./Card.css"
import { useState,useEffect } from "react";
import axios from "axios";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Card = () =>{
    const [posts,setPosts]=useState({});

    const fetchPost=async()=>{
        const res=await axios.get("http://localhost:5000/home");
        console.log("res : "+res )
        setPosts(res.data.data)
    }
    useEffect(()=>{
        fetchPost()
    },[])

    const renderPosts=Object.values(posts).map(post=>{
        console.log(post)
        return <div className="Element"
                    style={{width:'30%',marginBottom:'20px'}}
                    key={post.id}
                    >
                     <div className="Card-body">
                            <h4>{post.name}</h4>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
                            <p>Rs : {post.price} /-</p>
                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
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
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>

                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>

                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>

                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>

                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>

                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>
            </div>
            <p>Top Brands</p>
            <div className="Row">
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
                            <p>Rs : 200 /-</p>
                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>
                
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>

                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>

                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>

                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>
                <div className="Element">
                <div className="Card-body">
                            <p>fasd</p>
                            <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>

                            <div className="button-container">
                                <input type="button" value="Add to Cart"/>
                                <input type="button" value="Buy"/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;