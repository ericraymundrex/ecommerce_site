import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Add from './components/Add'
import { Fragment } from 'react';


function App() {
  const localData = localStorage.getItem("token");
  return (
    <Fragment>
      {localData ? <Add /> : <div><Login/> <SignUp/></div>}
      
    </Fragment>
  );
}

export default App;
