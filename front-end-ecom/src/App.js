import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { Fragment } from 'react';


function App() {
  return (
    <Fragment>
      <Login/>
      <SignUp/>
    </Fragment>
  );
}

export default App;
