import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Fragment, useState, useEffect } from 'react';
import axios from "axios";

import './App.css';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import AddItem from "./components/Merchant/Add";
import Main from "./components/Main/Main";
import Cart from "./components/Cart/Cart";
import DetailView from "./components/DetailView/DetailView";



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
  const localData = localStorage.getItem("token");
  const [posts,setPosts]=useState({});

    const fetchPost=async()=>{
        const res=await axios.get("http://localhost:5000/home");
        console.log("res : "+res )
        setPosts(res.data.data)
    }
    useEffect(()=>{
        fetchPost()
    },[])
  return (
    <Fragment>
      {/* {localData ? <AddItem /> : <div><Login/> <SignUp/></div>} */}
      {/* <div className="App"> */}
      {/* <Main/> */}
      {/* <Login/> */}
      {/* </div> */}
      {/* <Routes>
        <Route path="/" element={<Main />} />
      </Routes> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/merchant" element={localData?<AddItem/>:<div><Login /> <SignUp/></div>} />
        <Route path="/cart" element={<Cart/>}/>
        
        <Route path="/:id" element={<DetailView category={categories} content={posts}/>}/>

        
      </Routes>
      
    </Fragment>
  );
}

export default App;
