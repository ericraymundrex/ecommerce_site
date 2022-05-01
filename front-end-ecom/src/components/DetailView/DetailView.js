import { Fragment } from "react";
import "./DetailView.css"
import { useState,useEffect } from "react";
import axios from "axios";
import VerticalHeader from "../VerticalHeader/VerticalHeader";
import { useParams } from "react-router-dom";

const DetailView = (props) =>{
    
    let {id}=useParams()
    let buy_now=`/${id}/checkout`
    const [posts,setPosts]=useState({});
    useEffect(()=>{
        fetchPost()
    },[])
    const fetchPost=async()=>{
        const res=await axios.get("/product/"+id);
        console.log("res : "+res.data.data[0] )
        setPosts(res.data.data[0])
    }

    // const renderPosts=Object.values(posts).map((post)=>{
    //     return <div className="Element"
    //                 key={post.id}
    //                 >
    //                  <div className="Card-body">
    //                         <a href={`/${post.id}`}><img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/></a>
    //                         <h5>{post.name.slice(0,15)}...</h5>
    //                         <p>Rs : {post.price} /-</p>
    //                         <input type="button" value="Add to Cart"/>       
    //                 </div>
    //         </div>
    // })


    return (
        <Fragment>
            
        <div className="DetailView">
                <VerticalHeader categories={props.categories}/>
                <div className="DetailView-container">
                    <img src="https://www.tompetty.com/sites/g/files/g2000007521/f/Sample-image10-highres.jpg" alt="This is a img"/>
                    <div className="DetailView-body">
                            <h3>{posts.name}</h3>
                            <p>Description : {posts.description}</p>
                            <p> Qty : {posts.qty}</p>
                            <p>Rs. {posts.price} /-</p>

                            <input type="Submit" value={"Add to cart"} />
                            <a href={buy_now}>Buy now</a> 
                    </div>

                </div>
            </div> 
        </Fragment>
    )
}

export default DetailView;