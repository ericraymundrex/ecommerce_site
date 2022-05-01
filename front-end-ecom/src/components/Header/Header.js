import { Fragment, useState } from "react";
import Cart from "../Cart/Cart";
import "./Header.css"
import { useSelector } from "react-redux";

const Header = () => {

  const {CartItem} = useSelector((state) => state)
  const [modalOpen, setModalOpen] = useState(false);
// const params = "";
  const name=localStorage.getItem("name")
  return(
    <Fragment>
    <nav className="navbar nav navbar-expand-lg pl-2">
    <a className="navbar-brand brand" href="/">ECOM SITE</a>
    
   
    <div className="cart-icon">
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search"></input> <button type="submit" class="btn btn-primary">Submit</button>

    {name?name.split(" ")[0]:<a className="navbar-brand" href="/auth/user">LOGIN/SIGNUP</a>}
      <img onClick={() => {
          setModalOpen(true);
        }}
         src="../images/cart.png" alt="cart"/>
      {CartItem.length === 0 ? "" : <p>{CartItem.length}</p>}
    </div>
  {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ">
      <li className="nav-item active">
        <a className="nav-link" href="/merchant">Add New Item </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/merchant/edit">Edit Item</a>
      </li>
    </ul>
  </div> */}

  

  </nav>

  {modalOpen && <Cart setOpenModal={setModalOpen} />}
  </Fragment>
  )
};


export default Header;