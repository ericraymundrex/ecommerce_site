import "./Product.css"
import { useDispatch } from "react-redux"

const Product = (props) =>{
    const dispatch = useDispatch()
    const {post,onAdd} = props
    const CartClickHandler = (post) =>{
        onAdd(post)
        dispatch({ type: "CartItem", value: post });
    }

    return (
        <div className="Card-body">
            <a href={`/${post.id}`}><img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" alt="This is a img"/></a>
            {(post.name.length > 15) ? <h5>{post.name.slice(0,15)}...</h5> : <h5>{post.name}</h5>}
            <p>Rs : {post.price} /-</p>
            <input type="button" value="Add to Cart" onClick={() => CartClickHandler(post)}/>       
        </div>
    )
}

export default Product;