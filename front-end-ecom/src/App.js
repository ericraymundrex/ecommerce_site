import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from 'react';

import './App.css';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import AddItem from "./components/Merchant/Add";
import Main from "./components/Main/Main";



function App() {
  const localData = localStorage.getItem("token");
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
        <Route path="/merchant" element={<Login />} />
      </Routes>
      
    </Fragment>
  );
}

export default App;
