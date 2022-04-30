import { Fragment } from "react";
import "./DetailView.css"
import VerticalHeader from "../VerticalHeader/VerticalHeader";
import { useParams } from "react-router-dom";

const DetailView = (props) =>{
    const post = props.content[0]
    const categories=props.category
    console.log(post)

    // let [searchParams, setSearchParams] = useParams();
    let {id}=useParams()
    console.log(useParams())
    return (
        <Fragment>
            id:-{id}
            <div className="DetailView">
                <VerticalHeader categories={categories}/>
                <div className="DetailView-container">
                    <img src="https://www.tompetty.com/sites/g/files/g2000007521/f/Sample-image10-highres.jpg"/>
                    <div className="DetailView-body">
                            <h3>{post.name}</h3>
                            <p>Description : {post.description}</p>
                            <p> Qty : {post.qty}</p>
                            <p>Rs. {post.price} /-</p>

                            <input type="Submit" value={"Submit"}/>
                        
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default DetailView;