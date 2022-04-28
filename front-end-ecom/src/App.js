import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import AddItem from "./components/Merchant/Add";
import { Fragment } from 'react';
import Main from "./components/Main/Main";
import Header from "./components/Header/Header"


function App() {
  const localData = localStorage.getItem("token");
  return (
    <Fragment>
      {/* {localData ? <AddItem /> : <div><Login/> <SignUp/></div>} */}
      <div className="App">
      <Main/>
      {/* <Login/> */}
      </div>
      
    </Fragment>
  );
}

export default App;
