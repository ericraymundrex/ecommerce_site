import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import style from './App.module.css'
import {StickyContainer} from 'react-sticky'

import Header from "./components/Header/Header";
// import AddItem from "./components/Merchant/Add";
import Main from "./components/Main/Main";
import Cart from "./components/Cart/Cart";
import DetailView from "./components/DetailView/DetailView";
import AuthPage from "./components/AuthPage/AuthPage";
import CheckOut from "./components/CheckOut/CheckOut";
// import ShowList from "./components/Merchant/ShowList";
import Result from "./components/Result/Result";
import MerchantUI from "./components/Merchant/MerchantUI";
import Purchase from './components/Purchase/Purchase'
import Search from "./components/Search/Search"
import EditItem from "./components/Merchant/Edit";
import AddItem from "./components/Merchant/Add";
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
    
    <div className={style.max_height}>
      <StickyContainer>
      <Header />
      </StickyContainer>
   
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/item/:id" element={<DetailView categories={categories}/>}/>
        <Route path="/auth/:usertype" element={token? usertype==="merchant"?<MerchantUI />:<Navigate to="/"/> :<AuthPage/>} />
        <Route path="/cart" element={<Cart/>}/>  
        <Route path="/checkout" element={<CheckOut/>}/>      
        <Route path="/:val" element={<Result/>}/>
        <Route path="/purchase" element={<Purchase />}/>
        <Route path="/search/:id" element={<Search/>}/>
        <Route path="/edit/:id" element={<EditItem/>}/>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
