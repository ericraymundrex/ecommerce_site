import "./Card.css"
import { useState,useEffect } from "react";
import axios from "axios";
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
                     <div className="card-body">
                            <h3>{post.name}</h3>
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
                    <p>fasf</p>
                </div>

                <div className="Element">
                    <p>fasf</p>
                </div>
                <div className="Element">
                    <p>fasf</p>
                </div>
                <div className="Element">
                    <p>fasf</p>
                </div>
                <div className="Element">
                    <p>fasf</p>
                </div>
            </div>
            <p>Top Brands</p>
            <div className="Row">
                <div className="Element">
                    <p>fasf</p>
                </div>
                
                <div className="Element">
                    <p>fasf</p>
                </div>
                <div className="Element">
                    <p>fasf</p>
                </div>
                <div className="Element">
                    <p>fasf</p>
                </div>
                <div className="Element">
                    <p>fasf</p>
                </div>
            </div>
        </div>
    )
}

export default Card;