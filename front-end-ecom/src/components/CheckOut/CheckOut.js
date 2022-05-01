import { Fragment } from "react";
import { useSelector } from "react-redux";

const CheckOut = () =>{
    const { CartItem } = useSelector((state)=>state)
    console.log(CartItem)
    return (
        <Fragment>
            <h1>Checkout Page</h1>
        </Fragment>
    )
}

export default CheckOut;