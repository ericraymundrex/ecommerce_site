import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Fragment} from 'react';

import './App.css';
import Header from "./components/Header/Header";
import AddItem from "./components/Merchant/Add";
import Main from "./components/Main/Main";
import Cart from "./components/Cart/Cart";
import DetailView from "./components/DetailView/DetailView";
import AuthPage from "./components/AuthPage/AuthPage";
import CheckOut from "./components/CheckOut/CheckOut";
import ShowList from "./components/Merchant/ShowList";

function App() {


  //to be conmeted
  const categories = [{'id':1,'value':'Electronics'},
                        {'id':2,'value':'Men Fashion'},
                        {'id':3,'value':'Women Fashion'},
                        {'id':4,'value':'Mobile Phone'},
                        {'id':5,'value':'Sports Item'},
                        {'id':6,'value':'Men Footware'},
                        {'id':7,'value':'Women Footware'}]

                        //to be comented everything in between just for testing
  const token = localStorage.getItem("token");
  const usertype=localStorage.getItem("userType")

  return (
    
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/<int:id>" element={<DetailView categories={categories}/>}/>
        <Route path="/:val" element={<Main/>}/>
        <Route path="/auth/:usertype" element={token? usertype==="merchant"?<div><AddItem /><ShowList/></div>:<Navigate to="/"/> :<AuthPage/>} />
        <Route path="/cart" element={<Cart/>}/>  
        <Route path="/checkout" element={<CheckOut/>}/>      
      </Routes>
      {/* <Footer /> */}
    </Fragment>
  );
}

export default App;
