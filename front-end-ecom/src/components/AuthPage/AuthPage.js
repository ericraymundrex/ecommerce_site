import Login from '../Login/Login'
import Singup from '../SignUp/SignUp'
import { useState } from 'react'
import { Fragment } from 'react'

import styles from "./AuthPage.module.css"
const AuthPage=()=>{
    const [pagestate,setPageState]=useState('login')
    const clickHandler=(event)=>{
        event.preventDefault()
        if(pagestate==="login"){
            setPageState("signup")
        }
        if(pagestate==="signup"){
            setPageState("login")
        }
    }
    return(
        <Fragment>
            
        {pagestate==="login"?<Login />:<Singup />}
        <div className={styles.container}>
        <button onClick={clickHandler} className={styles.button}>{pagestate==="login"?"Don't have a account! click here to signup":"Go back to Login"}</button>
        </div>
        </Fragment>

    )
}


export default AuthPage;