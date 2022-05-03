import styles from "./Product.module.css"
import { useDispatch } from "react-redux"

const Product = (props) =>{
    const dispatch = useDispatch()
    const {post,onAdd} = props
    const CartClickHandler = (post) =>{
        onAdd(post)
        dispatch({ type: "CartItem", value: post });
    }
    return (
        <div className={styles.container}>
        <div className={styles.card}>
            <a href={`/${post.id}`}><img src={post.img} alt="This is a img" className={styles.image}/></a>
            {(post.name.length > 15) ? <h5>{post.name.slice(0,15)}...</h5> : <h5>{post.name}</h5>}
            <p>Rs : {post.price} /-</p>
            <input type="button" value="Add to Cart" onClick={() => CartClickHandler(post)}/>       
        </div>
        </div>

    )
}

export default Product;