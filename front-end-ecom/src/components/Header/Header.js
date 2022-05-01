// import { useState } from "react";
// import Cart from "../Cart/Cart";
import "./Header.css"

const Header = () => {
  // const params = "";


  return(
    <nav className="navbar nav navbar-expand-lg pl-2">
    
    <a className="navbar-brand brand" href="/">ECOM SITE</a>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search"></input>
    <button type="submit" class="btn btn-primary">search</button>

    <a className="navbar-brand cart" href="/">Cart</a>
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
  )
};

export default Header;