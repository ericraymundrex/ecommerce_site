import { Fragment } from "react"
import styles from './AuthError.module.css'
const AuthError=props=>{

    return(
        <Fragment>
            <div className={`${props.style_used}`} >{props.message} <button className={styles.cross_button} onClick={()=>{props.removeNotification({"userType":props.userType})}}>X</button>
            </div>
        </Fragment>
    )
}
export default AuthError;